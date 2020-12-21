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
    label: {
      type: 'plain_text',
      text: node.props.label,
    },
  };
}

export default formItem;
