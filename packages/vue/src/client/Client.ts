import { Component } from 'vue';
import { NodeTypes, FixMe } from '@spd/shared';
import { BaseClient } from '@spd/core';

import serialize from '@spd/serializer';

import { createApp } from '../renderer';

class Client extends BaseClient {
  constructor({ apiToken }: { apiToken: string }) {
    super({
      apiToken,
    });
  }

  private render(component: Component) {
    const root: FixMe = {
      type: NodeTypes.ELEMENT,
      children: [],
      tag: 'root',
      parentNode: null,
    };

    const app = createApp(component);

    app.mount(root);

    return root.children;
  }

  public sendMessage(textOrComponent: string | Component, channel: string) {
    if (typeof textOrComponent === 'string') {
      this._instance.chat.postMessage({
        text: textOrComponent,
        channel,
      });
      return;
    }

    const output = this.render(textOrComponent);
    const blocks = serialize(output);

    try {
      this._instance.chat.postMessage({
        text: '',
        blocks,
        channel,
      });
    } catch (e) {
      this.emit('error', e);
    }
  }
}

export default Client;
