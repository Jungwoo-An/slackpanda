import { IElement, EVENT_PREFIX } from '@spd/shared';

import { scheduler } from '../scheduler';

function patchProp(el: IElement, key: string, _prevValue: any, nextValue: any) {
  if (typeof el.props[key] !== 'undefined') {
    scheduler.schedule(el.root);
  }

  if (EVENT_PREFIX.test(key)) {
    const eventName = key.replace(EVENT_PREFIX, '').toLowerCase();
    (el.listeners[eventName] || (el.listeners[eventName] = [])).push(nextValue);
  } else {
    el.props[key] = nextValue;
  }
}

export default patchProp;
