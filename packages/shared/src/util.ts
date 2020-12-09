import { Node } from './interface';

export function generateNonce() {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString(16);
}

export function findRoot(node: Node): Node {
  if (node.parentNode) {
    return findRoot(node.parentNode);
  }

  return node;
}
