import { TagTypes, NodeTypes, IElement } from '@spd/shared';

function createElement(tag: TagTypes): IElement {
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
