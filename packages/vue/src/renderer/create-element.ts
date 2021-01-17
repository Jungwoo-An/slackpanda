import { TagTypes, NodeTypes, IElement } from '@slackpanda/shared';

function createElement(tag: TagTypes): IElement {
  return {
    type: NodeTypes.ELEMENT,
    children: [],
    props: {},
    parentNode: null,
    tag,
  };
}

export default createElement;
