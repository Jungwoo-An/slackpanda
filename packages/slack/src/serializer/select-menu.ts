import { IElement, NodeTypes, TagTypes } from '@slackpanda/shared';

import { serialize } from '.';

function selectMenu(node: IElement) {
  const options = node.children.filter(
    (child) => child.type === NodeTypes.ELEMENT && child.tag === TagTypes.OPTION
  );

  const initialOption = options.find(
    (option) =>
      option.type === NodeTypes.ELEMENT &&
      option.props.value === node.props.initialValue
  );

  return {
    type: `${node.props.type ?? 'static'}_select`,
    action_id: node.props.actionId,
    ...(node.props.placeholder && {
      placeholder: {
        type: 'plain_text',
        text: node.props.placeholder,
      },
    }),
    ...(options.length > 0 && {
      options: options.map(serialize),
    }),
    ...(initialOption && {
      initial_option: serialize(initialOption),
    }),
  };
}

export default selectMenu;
