import { Node } from '@slackpanda/shared';

function nextSibling(node: Node): Node | null {
  const { parentNode } = node;
  if (!parentNode) {
    return null;
  }

  return parentNode.children[parentNode.children.indexOf(node) + 1] || null;
}

export default nextSibling;
