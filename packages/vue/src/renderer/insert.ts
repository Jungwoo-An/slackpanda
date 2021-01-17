import {
  Node,
  IElement,
  findRoot,
  NodeTypes,
  TagTypes,
} from '@slackpanda/shared';

import { scheduler } from '../scheduler';

import remove from './remove';

function insert(child: Node, parent: IElement, anchor?: Node) {
  remove(child);

  const anchorIndex = anchor ? parent.children.indexOf(anchor) : -1;
  parent.children.splice(
    anchorIndex === -1 ? parent.children.length : anchorIndex,
    0,
    child
  );

  child.parentNode = parent;

  const root = findRoot(child);
  if (root.type === NodeTypes.ELEMENT && root.tag === TagTypes.BLOCKS) {
    scheduler.schedule(findRoot(child));
  }
}

export default insert;
