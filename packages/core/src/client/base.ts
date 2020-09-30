import { EventEmitter } from 'events';

import { WebClient } from '@slack/web-api';

class BaseClient extends EventEmitter {
  protected _instance: WebClient;

  constructor({ apiToken }: { apiToken: string }) {
    super();

    this._instance = new WebClient(apiToken);
  }
}

export default BaseClient;
