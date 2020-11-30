import { IElement, EVENT_PREFIX } from '@spd/shared';

import { camelCase } from 'change-case';

import { scheduler } from '../scheduler';

function patchProp(el: IElement, key: string, _prevValue: any, nextValue: any) {
  const camelizedKey = camelCase(key);

  if (typeof el.props[camelizedKey] !== 'undefined') {
    scheduler.schedule(el.root);
  }

  if (EVENT_PREFIX.test(camelizedKey)) {
    const eventName = camelizedKey.replace(EVENT_PREFIX, '').toLowerCase();
    (el.listeners[eventName] || (el.listeners[eventName] = [])).push(nextValue);
  } else {
    el.props[camelizedKey] = nextValue;
  }
}

export default patchProp;
