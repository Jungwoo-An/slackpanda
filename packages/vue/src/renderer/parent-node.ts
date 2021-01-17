import { IElement, Node } from '@slackpanda/shared';

function parentNode(node: Node): IElement | null {
  return node.parentNode;
}

export default parentNode;
