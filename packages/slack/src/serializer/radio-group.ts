import { IElement, NodeTypes, TagTypes } from '@slackpanda/shared';

import { serialize } from '.';

function radioGroup(node: IElement) {
  const options = node.children.filter(
    (child) => child.type === NodeTypes.ELEMENT && child.tag === TagTypes.OPTION
  );

  const initialOption = options.find(
    (option) =>
      option.type === NodeTypes.ELEMENT &&
      option.props.value === node.props.initialValue
  );

  return {
    type: 'radio_buttons',
    options: node.children.map(serialize),
    action_id: node.props.actionId,
    ...(initialOption && {
      initial_option: serialize(initialOption),
    }),
  };
}

export default radioGroup;
