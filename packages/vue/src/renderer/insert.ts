import { Node, IElement, NodeTypes, findRoot } from '@spd/shared';
import { scheduler } from '../scheduler';

function insert(child: Node, parent: IElement, anchor?: Node) {
  child.parentNode = parent;

  if (
    (child.type === NodeTypes.TEXT && !child.text?.trim()) ||
    child.type === NodeTypes.COMMENT
  ) {
    // purge empty text and comment
    return;
  }

  const anchorIndex = anchor ? parent.children.indexOf(anchor) : -1;
  parent.children.splice(
    anchorIndex === -1 ? parent.children.length : anchorIndex,
    0,
    child
  );

  scheduler.schedule(findRoot(child));
}

export default insert;
