import { IElement, NodeTypes } from '@slackpanda/shared';

import { serialize } from '.';

function text(node: IElement) {
  const textNode = node.children.find((child) => child.type === NodeTypes.TEXT);
  if (!textNode) {
    return null;
  }

  return {
    type: node.props.type ?? 'plain_text',
    text: serialize(textNode),
    ...(node.props.verbatim && {
      verbatim: node.props.verbatim,
    }),
  };
}

export default text;
