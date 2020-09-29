import { TagTypes, NodeTypes } from '@spd/shared';

function createElement(tag: TagTypes) {
  return {
    type: NodeTypes.ELEMENT,
    children: [],
    listeners: {},
    props: {},
    parentNode: null,
    tag,
  };
}

export default createElement;
