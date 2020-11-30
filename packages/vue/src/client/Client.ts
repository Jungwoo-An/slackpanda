import { Component } from 'vue';
import { NodeTypes, FixMe } from '@spd/shared';
import { BaseClient, UpdateObserver } from '@spd/core';

import { serialize } from '@spd/serializer';

import { createApp } from '../renderer';

export class Client extends BaseClient {
  private _observer: UpdateObserver;

  private _threads: Record<
    FixMe,
    {
      channel: string;
      ts: string;
    }
  > = {};

  constructor({
    apiToken,
    observer,
  }: {
    apiToken: string;
    observer: UpdateObserver;
  }) {
    super({
      apiToken,
    });

    this._observer = observer;
    this._observer.subscribe(this.handleUpdate);
  }

  private handleUpdate = (app: FixMe) => {
    const thread = this._threads[app];
    if (!thread) {
      return;
    }

    const block = serialize(app);

    this._instance.chat.update({
      channel: thread.channel,
      ts: thread.ts,
      text: '',
      blocks: [block],
    });
  };

  private render(component: Component) {
    const root: FixMe = {
      type: NodeTypes.ELEMENT,
      children: [],
      tag: 'root',
      parentNode: null,
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
    const blocks = app.children.map(serialize);

    try {
      const {
        ts,
        channel: normalizedChannel,
      } = (await this._instance.chat.postMessage({
        text: '',
        blocks,
        channel,
      })) as FixMe;

      this._threads[app] = {
        channel: normalizedChannel,
        ts,
      };
    } catch (e) {
      this.emit('error', e);
    }
  }
}
