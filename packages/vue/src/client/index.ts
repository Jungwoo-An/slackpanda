import { updateObserver } from '../observers';
import { scheduler } from '../scheduler';

import { Client } from './client';

// TODO :: Parameters typing
export function createClient({
  apiToken,
  signingSecret,
}: {
  apiToken: string;
  signingSecret?: string;
}) {
  scheduler.oncommit = (app) => updateObserver.notify(app);

  return new Client({
    observer: updateObserver,
    apiToken,
    signingSecret,
  });
}
