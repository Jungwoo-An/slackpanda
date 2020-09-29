import { IElement, Node } from '@spd/shared';

function parentNode(node: Node): IElement | null {
  return node.parentNode;
}

export default parentNode;
