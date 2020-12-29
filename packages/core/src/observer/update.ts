import { IElement } from '@spd/shared';

import { BaseObserver } from './base';

type ListenerType = (app: IElement) => void;

export class UpdateObserver extends BaseObserver<ListenerType> {}
