import { IElement, NodeTypes, TagTypes } from '@spd/shared';

import serialize from '.';

function section(node: IElement) {
  const accessory = node.children.find(
    (child) =>
      child.type === NodeTypes.ELEMENT &&
      child.tag === TagTypes.SECTION_ACCESSORY
  );

  const fields = node.children.find(
    (child) =>
      child.type === NodeTypes.ELEMENT && child.tag === TagTypes.SECTION_FIELDS
  );

  return {
    type: 'section',
    text: {
      type: 'plain_text',
      text: node.props.text,
    },
    ...(accessory && {
      accessory: serialize(accessory),
    }),
    ...(fields && {
      fields: serialize(fields),
    }),
  };
}

export default section;
