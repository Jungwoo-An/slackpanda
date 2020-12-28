import { WebClient } from '@slack/web-api';
import { createMessageAdapter } from '@slack/interactive-messages';
import {
  ActionType,
  findModal,
  FixMe,
  IClientAdapter,
  IClientAdapterPayload,
  omitModal,
} from '@spd/shared';

import { serialize } from './serializer';

type HandlerType = (...args: any[]) => any;

export interface ISlackAdapterPayloadType extends IClientAdapterPayload {
  text?: string;
  ts?: string;
  channel: string;
}

export class SlackAdapter implements IClientAdapter<ISlackAdapterPayloadType> {
  private _listeners = new Map<string, HandlerType[]>();

  protected _instance: WebClient;

  private _adapter?: ReturnType<typeof createMessageAdapter>;

  constructor({
    apiToken,
    signingSecret,
  }: {
    apiToken: string;
    signingSecret?: string;
  }) {
    this._instance = new WebClient(apiToken);

    if (signingSecret) {
      this._adapter = this.initAdapter(signingSecret);
    }
  }

  private handleSubmission = (payload: FixMe) => {
    const actionId = payload.view.callback_id;
    const handlers = this._listeners.get(actionId);

    return (
      handlers?.map(async (handler) => handler(payload)) ?? Promise.resolve()
    );
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

  public async sendMessage({ channel, node, text }: ISlackAdapterPayloadType) {
    if (!node && !text) {
      // TODO :: Create error class
      throw new Error('Required paramter text or node was null or undefined');
    }

    if (text) {
      return this._instance.chat.postMessage({
        text,
        channel,
      });
    }

    const blocks = serialize({
      ...node!,
      children: omitModal(node!.children),
    });

    return this._instance.chat.postMessage({
      text: '',
      blocks,
      channel,
    });
  }

  public async updateMessage({
    channel,
    node,
    text,
    ts,
  }: ISlackAdapterPayloadType) {
    if (!node && !text) {
      // TODO :: Create error class
      throw new Error('Required paramter text or node was null or undefined');
    }

    if (!ts) {
      throw new Error('Required paramter ts was null or undefined');
    }

    if (text) {
      return this._instance.chat.postMessage({
        text,
        channel,
      });
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
      channel,
      ts,
      blocks,
    });
  }

  public addEventHandler(actionId: string, handler: HandlerType) {
    if (!this._listeners.has(actionId)) {
      this._listeners.set(actionId, []);
    }

    this._listeners.get(actionId)!.push(handler);
  }

  public removeEventHandler(actionId: string, handler: HandlerType) {
    if (!this._listeners.has(actionId)) {
      return;
    }

    const index = this._listeners.get(actionId)!.indexOf(handler);
    if (index === -1) {
      return;
    }

    this._listeners.get(actionId)!.splice(index, 1);
  }
}
