import { IElement, NodeTypes, TagTypes } from '@spd/shared';

import { serialize } from '.';

function checkboxGroup(node: IElement) {
  const options = node.children.filter(
    (child) => child.type === NodeTypes.ELEMENT && child.tag === TagTypes.OPTION
  );

  const initialOption = options.filter(
    (option) =>
      option.type === NodeTypes.ELEMENT &&
      node.props.initialValue.includes(option.props.value)
  );

  return {
    type: 'checkboxes',
    options: node.children.map(serialize),
    action_id: node.props.actionId,
    ...(initialOption?.length > 0 && {
      initial_options: initialOption.map(serialize),
    }),
  };
}

export default checkboxGroup;
