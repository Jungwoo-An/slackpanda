import { IElement } from '@slackpanda/shared';

import { serialize } from '.';

function blocks(node: IElement) {
  return node.children.map(serialize);
}

export default blocks;
