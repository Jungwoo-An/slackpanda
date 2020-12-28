import { BaseObserver } from './base';

type HandlerType = (...args: any[]) => any;

type ListenerType = (
  event: string,
  nextHandler: HandlerType,
  prevHandler?: HandlerType
) => void;

export class EventObserver extends BaseObserver<ListenerType> {}
