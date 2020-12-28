import { BaseObserver } from './base';

type Listener = (...args: any[]) => void;

export class EventObserver extends BaseObserver<Listener> {}
