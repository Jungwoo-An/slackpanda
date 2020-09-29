import { Node, IElement, NodeTypes } from '@spd/shared';

function insert(child: Node, parent: IElement, anchor?: Node) {
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

  child.parentNode = parent;
}

export default insert;
