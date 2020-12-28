import { IElement } from '@spd/shared';

function datePicker(node: IElement) {
  return {
    type: 'datepicker',
    action_id: node.props.actionId,
    ...(node.props.placeholder && {
      placeholder: {
        type: 'plain_text',
        text: node.props.placeholder,
      },
    }),
    ...(node.props.initialDate && {
      initial_date: node.props.initialDate,
    }),
  };
}

export default datePicker;
