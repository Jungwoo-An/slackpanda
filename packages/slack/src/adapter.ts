import { WebClient } from '@slack/web-api';
import { createMessageAdapter } from '@slack/interactive-messages';
import {
  ActionType,
  findModal,
  FixMe,
  IClientAdapter,
  IClientAdapterPayload,
  IElement,
  omitModal,
  NotEnoughParameterError,
} from '@slackpanda/shared';

import { serialize } from './serializer';

type HandlerType = (...args: any[]) => any;

export class SlackAdapter implements IClientAdapter {
  private _listeners = new Map<string, HandlerType[]>();

  private _instance: WebClient;

  private _adapter?: ReturnType<typeof createMessageAdapter>;

  private _conversations: WeakMap<
    IElement,
    {
      channel: string;
      ts: string;
    }
  > = new WeakMap();

  constructor({
    apiToken,
    signingSecret,
    port = 8080,
  }: {
    apiToken: string;
    port?: number;
    signingSecret?: string;
  }) {
    this._instance = new WebClient(apiToken);

    if (signingSecret) {
      this._adapter = this.initAdapter(signingSecret);
      this._adapter.start(port);
    }
  }

  private handleSubmission = async (payload: FixMe) => {
    const actionId = payload.view.callback_id;
    const handlers = this._listeners.get(actionId) ?? [];

    await Promise.all(handlers.map((handler) => handler(payload)));
  };

  private handleViewClosed = (payload: FixMe) => {
    const actionId = payload.view.callback_id;
    const handlers = this._listeners.get(actionId);
    handlers?.forEach((handler) => handler(payload));
  };

  private handleAction = (payload: FixMe) => {
    const [action] = (payload?.actions ?? []) as ActionType[];
    if (!action) {
      return;
    }

    const handlers = this._listeners.get(action.action_id);
    handlers?.forEach((handler) => handler(payload, action));
  };

  private initAdapter(signingSecret: string) {
    const adapter = createMessageAdapter(signingSecret);

    adapter.viewSubmission(/.*/, this.handleSubmission);

    adapter.viewClosed(/.*/, this.handleViewClosed);

    adapter.action(/.*/, this.handleAction);

    return adapter;
  }

  public async sendMessage({ text, node, channelId }: IClientAdapterPayload) {
    if (!node && !text) {
      throw new NotEnoughParameterError(
        'Required paramter text or node was null or undefined'
      );
    }

    if (text) {
      return this._instance.chat.postMessage({
        channel: channelId,
        text,
      });
    }

    const blocks = serialize({
      ...node!,
      children: omitModal(node!.children),
    });

    const response = (await this._instance.chat.postMessage({
      text: '',
      channel: channelId,
      blocks,
    })) as FixMe;

    this._conversations.set(node!, {
      channel: response.channel,
      ts: response.ts,
    });

    return response;
  }

  public async updateMessage(node: IElement) {
    if (!node) {
      throw new NotEnoughParameterError(
        'Required paramter node was null or undefined'
      );
    }

    const conversation = this._conversations.get(node!);
    if (!conversation) {
      throw new NotEnoughParameterError(
        'sendMessage must be called before updateMessage'
      );
    }

    const blocks = serialize({
      ...node!,
      children: omitModal(node!.children),
    });

    const modal = findModal(node!.children);
    if (modal && modal.props.open) {
      this._instance.views.open({
        trigger_id: modal.props.triggerId,
        view: {
          notify_on_close: true,
          ...serialize(modal),
        },
      });
    }

    return this._instance.chat.update({
      text: '',
      channel: conversation.channel,
      ts: conversation.ts,
      blocks,
    });
  }

  public addEventListener(actionId: string, listener: HandlerType) {
    if (!this._listeners.has(actionId)) {
      this._listeners.set(actionId, []);
    }

    this._listeners.get(actionId)!.push(listener);
  }

  public removeEventListener(actionId: string, listener: HandlerType) {
    if (!this._listeners.has(actionId)) {
      return;
    }

    const index = this._listeners.get(actionId)!.indexOf(listener);
    if (index === -1) {
      return;
    }

    this._listeners.get(actionId)!.splice(index, 1);
  }
}
