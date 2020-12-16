import { Component } from 'vue';
import {
  NodeTypes,
  FixMe,
  TagTypes,
  IElement,
  ActionType,
  omitModal,
  findModal,
} from '@spd/shared';
import { BaseClient, UpdateObserver } from '@spd/core';
import { serialize } from '@spd/serializer';

import { createApp } from '../renderer';
import { ACTION_HANDLER_STORAGE } from '../storage';

export class Client extends BaseClient {
  private _observer: UpdateObserver;

  private _threads: Map<
    FixMe,
    {
      channel: string;
      ts: string;
    }
  > = new Map();

  constructor({
    apiToken,
    observer,
    signingSecret,
  }: {
    apiToken: string;
    observer: UpdateObserver;
    signingSecret?: string;
  }) {
    super({
      apiToken,
      signingSecret,
    });

    this._observer = observer;
    this._observer.subscribe(this.handleUpdate);
  }

  protected handleSubmission(payload: FixMe) {
    const actionId = payload.view.callback_id;
    const handler = ACTION_HANDLER_STORAGE.get(actionId);
    return handler?.(payload);
  }

  protected handleViewClosed(payload: FixMe) {
    const actionId = payload.view.callback_id;
    const handler = ACTION_HANDLER_STORAGE.get(actionId);
    handler?.(payload);
  }

  protected handleAction(payload: FixMe) {
    const [action] = (payload?.actions ?? []) as ActionType[];
    if (!action) {
      return;
    }

    const handler = ACTION_HANDLER_STORAGE.get(action.action_id);
    handler?.(payload);
  }

  private handleUpdate = (app: FixMe) => {
    const thread = this._threads.get(app);
    if (!thread) {
      return;
    }

    const modal = findModal(app.children);

    const blocks = serialize({
      ...app,
      children: omitModal(app.children),
    });

    this._instance.chat.update({
      channel: thread.channel,
      ts: thread.ts,
      text: '',
      blocks,
    });

    if (modal && modal.props.open) {
      this._instance.views.open({
        trigger_id: modal.props.triggerId,
        view: {
          notify_on_close: true,
          ...serialize(modal),
        },
      });
    }
  };

  private render(component: Component) {
    const root: IElement = {
      type: NodeTypes.ELEMENT,
      children: [],
      tag: TagTypes.BLOCKS,
      parentNode: null,
      props: {},
    };

    const app = createApp(component);

    app.mount(root);

    return root;
  }

  public async sendMessage(
    textOrComponent: string | Component,
    channel: string
  ) {
    if (typeof textOrComponent === 'string') {
      this._instance.chat.postMessage({
        text: textOrComponent,
        channel,
      });
      return;
    }

    const app = this.render(textOrComponent);

    const blocks = serialize({
      ...app,
      children: omitModal(app.children),
    });

    try {
      const {
        ts,
        channel: normalizedChannel,
      } = (await this._instance.chat.postMessage({
        text: '',
        blocks,
        channel,
      })) as FixMe;

      (app as FixMe).initialized = true;
      this._threads.set(app, {
        channel: normalizedChannel,
        ts,
      });
    } catch (e) {
      this.emit('error', e);
    }
  }
}
