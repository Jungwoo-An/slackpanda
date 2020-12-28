import { IElement, NodeTypes } from '@spd/shared';

import { serialize } from '.';

function option(node: IElement) {
  const text = node.children.find((child) => child.type === NodeTypes.TEXT);
  if (!text) {
    return null;
  }

  return {
    text: {
      type: 'plain_text',
      text: serialize(text),
    },
    value: node.props.value,
    ...(node.props.description && {
      description: node.props.description,
    }),
    ...(node.props.url && {
      url: node.props.url,
    }),
  };
}

export default option;
