import { EventEmitter } from 'events';

type Params<T> = T extends (...args: infer P) => any ? P : never;

interface IEventEmitter<T> {
  on: <E extends keyof T>(eventName: E, listener: T[E]) => void;
  off: <E extends keyof T>(eventName: E, listener: T[E]) => void;
  emit: <E extends keyof T>(eventName: E, ...args: Params<T[E]>) => void;
}

export const emitter = new EventEmitter() as IEventEmitter<{
  SET_LISTENER: (
    event: string,
    newListener: (...args: any[]) => void,
    oldListener?: (...args: any[]) => void
  ) => void;
}>;
