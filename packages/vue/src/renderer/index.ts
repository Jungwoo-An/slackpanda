import { createRenderer } from '@vue/runtime-core';
import { Node, IElement } from '@spd/shared';

import createElement from './create-element';
import createText from './create-text';
import createComment from './create-comment';
import insert from './insert';
import nextSibling from './next-sibling';
import parentNode from './parent-node';
import remove from './remove';
import patchProp from './patch-prop';
import setElementText from './set-element-text';
import setText from './set-text';

const { render, createApp } = createRenderer<Node, IElement>({
  createElement,
  createText,
  createComment,
  insert,
  nextSibling,
  parentNode,
  patchProp,
  remove,
  setElementText,
  setText,
});

export { render, createApp };
