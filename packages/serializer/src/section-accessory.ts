import { IElement } from '@spd/shared';

import { serialize } from '.';

function sectionAccessory(node: IElement) {
  return serialize(node.children[0]);
}

export default sectionAccessory;
