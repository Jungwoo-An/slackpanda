import { IElement, NodeTypes } from '@spd/shared';

import serialize from '.';

function text(node: IElement) {
  const text = node.children.find((child) => child.type === NodeTypes.TEXT);
  if (!text) {
    return null;
  }

  return {
    type: node.props.type ?? 'plain_text',
    text: serialize(text),
    ...(node.props.verbatim && {
      verbatim: node.props.verbatim,
    }),
  };
}

export default text;
