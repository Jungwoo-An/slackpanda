import { IClientAdapter } from '@spd/shared';

import { emitter } from '../emitter';
import { scheduler } from '../scheduler';

import { Client } from './client';

export function createClient({ adapter }: { adapter: IClientAdapter }) {
  const client = new Client({
    adapter,
  });

  scheduler.oncommit = (app) => client.updateMessage(app);

  emitter.on('SET_LISTENER', (event, nextHandler, prevHandler) => {
    if (prevHandler) {
      client.removeEventListener(event, prevHandler);
    }

    client.addEventListener(event, nextHandler);
  });

  return client;
}
