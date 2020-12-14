import { IElement, ACTION_HANDLER_REGEX, findRoot } from '@spd/shared';

import { camelCase } from 'change-case';

import { ACTION_HANDLER_STORAGE } from '../storage';
import { scheduler } from '../scheduler';

function patchProp(el: IElement, key: string, _prevValue: any, nextValue: any) {
  const camelizedKey = camelCase(key);

  if (typeof el.props[camelizedKey] !== 'undefined') {
    scheduler.schedule(findRoot(el));
  }

  if (ACTION_HANDLER_REGEX.test(camelizedKey) && el.props.actionId) {
    const { actionId } = el.props;

    // Delete previous handler
    ACTION_HANDLER_STORAGE.delete(key);

    // Add new handler
    ACTION_HANDLER_STORAGE.set(actionId, nextValue);

    el.props.actionId = actionId;
    el.props.value = actionId;
  } else {
    el.props[camelizedKey] = nextValue;
  }
}

export default patchProp;
