import { UpdateObserver } from '@spd/core';

import { scheduler } from '../scheduler';

import { Client } from './client';

export function createClient({ apiToken }: { apiToken: string }) {
  const observer = new UpdateObserver();

  scheduler.oncommit = (app) => observer.notify(app);

  return new Client({
    apiToken,
    observer,
  });
}
