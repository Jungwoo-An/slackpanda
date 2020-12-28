import { IClientAdapter } from '@spd/shared';

import { updateObserver, eventObserver } from '../observers';
import { scheduler } from '../scheduler';

import { Client } from './client';

export function createClient({ adapter }: { adapter: IClientAdapter }) {
  const client = new Client({
    adapter,
    updateObserver,
  });

  scheduler.oncommit = (app) => updateObserver.notify(app);

  eventObserver.subscribe((event, nextHandler, prevHandler) => {
    if (prevHandler) {
      client.removeEventListener(event, prevHandler);
    }

    client.addEventListener(event, nextHandler);
  });

  return client;
}
