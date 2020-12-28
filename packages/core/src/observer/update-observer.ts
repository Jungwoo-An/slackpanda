import { IElement } from '@spd/shared';

import { BaseObserver } from './base';

type Listener = (app: IElement) => void;

export class UpdateObserver extends BaseObserver<Listener> {}
