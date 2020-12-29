import { IElement, ACTION_HANDLER_REGEX, findRoot } from '@spd/shared';

import { camelCase } from 'change-case';

import { emitter } from '../emitter';
import { scheduler } from '../scheduler';

function patchProp(el: IElement, key: string, prevValue: any, nextValue: any) {
  const camelizedKey = camelCase(key);

  if (typeof el.props[camelizedKey] !== 'undefined') {
    scheduler.schedule(findRoot(el));
  }

  if (ACTION_HANDLER_REGEX.test(camelizedKey) && el.props.actionId) {
    const { actionId } = el.props;

    emitter.emit('SET_LISTENER', actionId, nextValue, prevValue);

    el.props.actionId = actionId;
    el.props.value = actionId;
  } else {
    el.props[camelizedKey] = nextValue;
  }
}

export default patchProp;
