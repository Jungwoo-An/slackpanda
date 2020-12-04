import { EventEmitter } from 'events';

import { WebClient } from '@slack/web-api';
import { createMessageAdapter } from '@slack/interactive-messages';
import { FixMe } from '@spd/shared';

// TODO :: Change class name to SlackClient
export abstract class BaseClient extends EventEmitter {
  protected _instance: WebClient;

  protected _signingSecret?: string;

  protected _adapter?: ReturnType<typeof createMessageAdapter>;

  constructor({
    apiToken,
    signingSecret,
  }: {
    apiToken: string;
    signingSecret?: string;
  }) {
    super();

    this._instance = new WebClient(apiToken);

    if (signingSecret) {
      this._adapter = this.initAdapter(signingSecret);
    }
  }

  protected abstract handleAction(payload: FixMe): void | Promise<void>;

  private initAdapter(signingSecret: string) {
    const adapter = createMessageAdapter(signingSecret);

    adapter.action(/.*/, this.handleAction.bind(this));

    return adapter;
  }

  public start(port: number) {
    if (!this._adapter) {
      // TODO :: Custom error class
      throw new Error('Slack message adapter is not initialize');
    }

    return this._adapter.start(port);
  }

  public getRequestHandler() {
    if (!this._adapter) {
      // TODO :: Custom Error Class
      throw new Error('Slack message adapter is not initialize');
    }

    return this._adapter;
  }
}
