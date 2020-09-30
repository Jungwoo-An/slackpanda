import { IElement, NodeTypes } from '@spd/shared';

import serialize from '.';

function header(node: IElement) {
  const text = node.children.find((child) => child.type === NodeTypes.TEXT);
  if (!text) {
    return null;
  }

  return {
    type: 'header',
    text: {
      type: 'plain_text',
      text: serialize(text),
    },
  };
}

export default header;
