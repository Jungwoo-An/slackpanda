import { IElement, NodeTypes } from '@spd/shared';

import { serialize } from '.';

function formItem(node: IElement) {
  const element = node.children.find(
    (child) => child.type === NodeTypes.ELEMENT
  );

  if (!element) {
    return null;
  }

  return {
    type: 'input',
    dispatch_action: false,
    element: serialize(element),
    block_id: node.props.name,
    optional: !node.props.required,
    label: {
      type: 'plain_text',
      text: node.props.label,
    },
    ...(node.props.hint && {
      hint: {
        type: 'plain_text',
        text: node.props.hint,
      },
    }),
  };
}

export default formItem;
