import { Node } from '@slackpanda/shared';

function remove(child: Node) {
  const { parentNode } = child;
  if (!parentNode) {
    return;
  }

  parentNode.children.splice(parentNode.children.indexOf(child), 1);

  child.parentNode = null;
}

export default remove;
