import { NodeTypes, TagTypes } from './enum';
import { IElement, Node } from './interface';

export function generateNonce() {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString(16);
}

export function findRoot(node: Node): Node {
  if (node.parentNode) {
    return findRoot(node.parentNode);
  }

  return node;
}

export function omitModal(nodes: Node[]) {
  return nodes.filter(
    (node) => node.type !== NodeTypes.ELEMENT || node.tag !== TagTypes.MODAL
  );
}

export function findModal(nodes: Node[]): IElement | undefined {
  return nodes.find(
    (node) => node.type === NodeTypes.ELEMENT && node.tag === TagTypes.MODAL
  ) as IElement;
}
