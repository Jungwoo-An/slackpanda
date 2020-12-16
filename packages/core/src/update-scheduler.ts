import { FixMe } from '@spd/shared';

export type CommitCallback = (app: FixMe) => void;

export class UpdateScheduler {
  // eslint-disable-next-line no-undef
  private _timeoutId: NodeJS.Timeout | undefined;

  private _interval: number;

  private _queue: FixMe[] = [];

  private _commitCallback?: CommitCallback;

  constructor({
    interval = 10,
    onCommit,
  }: {
    interval?: number;
    onCommit?: CommitCallback;
  } = {}) {
    this._interval = interval;

    this._commitCallback = onCommit;
  }

  set oncommit(callback: CommitCallback) {
    this._commitCallback = callback;
  }

  schedule(app: FixMe) {
    if (!app) {
      return;
    }

    if (this._queue.includes(app)) {
      return;
    }

    this._queue.push(app);

    this.performUntilEmptyQueue();
  }

  performUntilEmptyQueue() {
    if (this._timeoutId) {
      // concurrent
      return;
    }

    this._timeoutId = global.setTimeout(() => {
      const app = this._queue.shift();

      this._commitCallback?.(app);

      this._timeoutId = undefined;

      if (this._queue.length === 0) {
        return;
      }

      this.performUntilEmptyQueue();
    }, this._interval);
  }
}
