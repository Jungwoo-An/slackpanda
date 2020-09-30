import { IElement, NodeTypes } from '@spd/shared';

import serialize from '.';

function button(node: IElement) {
  const text = node.children.find((child) => child.type === NodeTypes.TEXT);
  if (!text) {
    return null;
  }

  return {
    type: 'button',
    action_id: node.props.actionId,
    value: node.props.value,
    text: {
      type: 'plain_text',
      text: serialize(text),
    },
    ...(node.props.url && {
      url: node.props.url,
    }),
    ...(node.props.style && {
      style: node.props.style,
    }),
  };
}

export default button;
