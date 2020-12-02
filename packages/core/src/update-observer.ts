import { FixMe } from '@spd/shared';

import { Observer } from './observer';

type Listener = (app: FixMe) => void;

export class UpdateObserver extends Observer<Listener> {
  notify(app: FixMe) {
    this._listeners.forEach((listener) => listener(app));
  }
}
