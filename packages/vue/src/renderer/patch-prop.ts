import { IElement, EVENT_PREFIX } from '@spd/shared';

function patchProp(el: IElement, key: string, _prevValue: any, nextValue: any) {
  if (EVENT_PREFIX.test(key)) {
    const eventName = key.replace(EVENT_PREFIX, '').toLowerCase();
    (el.listeners[eventName] || (el.listeners[eventName] = [])).push(nextValue);
  } else {
    el.props[key] = nextValue;
  }
}

export default patchProp;
