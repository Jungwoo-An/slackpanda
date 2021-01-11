import { Component, App } from 'vue';
import {
  NodeTypes,
  FixMe,
  TagTypes,
  IElement,
  IClientAdapter,
} from '@spd/shared';

import { createApp } from '../renderer';

export class Client {
  private _apps: Map<App<IElement>, IElement> = new Map();

  private _adapter: IClientAdapter;

  private _concurrentLimit: number;

  constructor({
    adapter,
    concurrentLimit = 10,
  }: {
    adapter: IClientAdapter;
    concurrentLimit?: number;
  }) {
    this._adapter = adapter;

    this._concurrentLimit = concurrentLimit;
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

    this._apps.set(app, root);

    if (this._apps.size > this._concurrentLimit) {
      const staleApp = this._apps.keys().next();

      staleApp.value.unmount(this._apps.get(staleApp.value));

      this._apps.delete(staleApp.value);
    }

    return root;
  }

  public addEventListener(event: string, handler: (...args: any[]) => any) {
    this._adapter.addEventListener(event, handler);
  }

  public removeEventListener(event: string, handler: (...args: any[]) => any) {
    this._adapter.removeEventListener(event, handler);
  }

  public sendMessage(text: string, channel: string): Promise<void>;

  public sendMessage(component: Component, channel: string): Promise<void>;

  public async sendMessage(
    textOrComponent: string | Component,
    channel: string
  ): Promise<void> {
    if (typeof textOrComponent === 'string') {
      await this._adapter.sendMessage({
        text: textOrComponent,
        channelId: channel,
      });

      return;
    }

    const app = this.render(textOrComponent);

    try {
      await this._adapter.sendMessage({
        text: '',
        node: app,
        channelId: channel,
      });

      (app as FixMe).initialized = true;
    } catch (e) {
      throw new Error(`Error sending message: ${e.message}`);
    }
  }

  public updateMessage(app: IElement) {
    return this._adapter.updateMessage(app);
  }
}
