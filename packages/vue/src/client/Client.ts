import { EventEmitter } from 'events';

import { Component } from 'vue';
import {
  NodeTypes,
  FixMe,
  TagTypes,
  IElement,
  IClientAdapter,
} from '@spd/shared';

import { createApp } from '../renderer';

export class Client {
  private _adapter: IClientAdapter;

  constructor({ adapter }: { adapter: IClientAdapter }) {
    this._adapter = adapter;
  }

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

  public addEventListener(event: string, handler: (...args: any[]) => any) {
    this._adapter.addEventListener(event, handler);
  }

  public removeEventListener(event: string, handler: (...args: any[]) => any) {
    this._adapter.removeEventListener(event, handler);
  }

  public async sendMessage(
    textOrComponent: string | Component,
    channel: string
  ) {
    if (typeof textOrComponent === 'string') {
      return this._adapter.sendMessage({
        text: textOrComponent,
        channelId: channel,
      });
    }

    const app = this.render(textOrComponent);

    try {
      const response = await this._adapter.sendMessage({
        text: '',
        node: app,
        channelId: channel,
      });

      (app as FixMe).initialized = true;

      return response;
    } catch (e) {
      throw new Error(`Error sending message: ${e.message}`);
    }
  }

  public updateMessage(app: IElement) {
    return this._adapter.updateMessage(app);
  }
}
