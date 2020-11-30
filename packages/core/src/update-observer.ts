import { FixMe } from '@spd/shared';

export type Listener = (app: FixMe) => void;

export class UpdateObserver {
  private _listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this._listeners.push(listener);

    return () => {
      this.unsubscribe(listener);
    };
  }

  unsubscribe(listener: Listener) {
    const index = this._listeners.indexOf(listener);
    if (index === -1) {
      return;
    }

    this._listeners.splice(index, 1);
  }

  notify(app: FixMe) {
    this._listeners.forEach((listener) => listener(app));
  }
}
