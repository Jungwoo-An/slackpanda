import { IElement } from '@slackpanda/shared';

import { serialize } from '.';

function modal(node: IElement) {
  return {
    type: 'modal',
    callback_id: node.props.actionId,
    title: {
      type: 'plain_text',
      text: node.props.title,
    },
    ...(node.props.submit && {
      submit: {
        type: 'plain_text',
        text: node.props.submit,
      },
    }),
    ...(node.props.close && {
      submit: {
        type: 'plain_text',
        text: node.props.submit,
      },
    }),
    blocks: node.children.map(serialize),
  };
}

export default modal;
