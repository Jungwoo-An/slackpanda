import { IElement } from '@spd/shared';

import serialize from '.';

function context(node: IElement) {
  return {
    type: 'context',
    elements: node.children.map(serialize),
  };
}

export default context;
