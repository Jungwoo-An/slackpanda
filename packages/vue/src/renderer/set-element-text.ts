import { findRoot, IElement, NodeTypes } from '@slackpanda/shared';

import { scheduler } from '../scheduler';

function setElementText(el: IElement, text: string) {
  if (!text) {
    // empty text
    return;
  }

  if (el.children?.length > 0) {
    scheduler.schedule(findRoot(el));
  }

  el.children = [
    {
      type: NodeTypes.TEXT,
      parentNode: el,
      text,
    },
  ];
}

export default setElementText;
