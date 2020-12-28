import { IElement } from '@spd/shared';

function plainTextInput(node: IElement) {
  return {
    type: 'plain_text_input',
    action_id: node.props.actionId,
    multiline: node.props.multiline || false,
    ...(node.props.minlength && {
      min_length: String(node.props.minlength),
    }),
    ...(node.props.maxlength && {
      max_length: String(node.props.maxlength),
    }),
    ...(node.props.placeholder && {
      placeholder: {
        type: 'plain_text',
        text: node.props.placeholder,
      },
    }),
    ...(node.props.initialValue && {
      initial_value: node.props.initialValue,
    }),
  };
}

export default plainTextInput;
