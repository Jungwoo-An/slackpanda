import { IElement } from '@slackpanda/shared';

import { serialize } from '.';

function actions(node: IElement) {
  return {
    type: 'actions',
    elements: node.children.map(serialize),
  };
}

export default actions;
