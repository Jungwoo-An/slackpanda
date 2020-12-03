import { TagTypes, NodeTypes, IElement } from '@spd/shared';

function createElement(tag: TagTypes): IElement {
  return {
    type: NodeTypes.ELEMENT,
    children: [],
    props: {},
    parentNode: null,
    root: null,
    tag,
  };
}

export default createElement;
