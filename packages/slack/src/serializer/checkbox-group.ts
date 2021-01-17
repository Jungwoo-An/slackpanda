import { IElement, NodeTypes, TagTypes } from '@slackpanda/shared';

import { serialize } from '.';

function checkboxGroup(node: IElement) {
  const options = node.children.filter(
    (child) => child.type === NodeTypes.ELEMENT && child.tag === TagTypes.OPTION
  );

  const initialOptions = options.filter(
    (option) =>
      option.type === NodeTypes.ELEMENT &&
      node.props.initialValues?.includes(option.props.value)
  );

  return {
    type: 'checkboxes',
    options: node.children.map(serialize),
    action_id: node.props.actionId,
    ...(initialOptions?.length > 0 && {
      initial_options: initialOptions.map(serialize),
    }),
  };
}

export default checkboxGroup;
