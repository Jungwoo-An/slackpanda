import { IElement, NodeTypes } from '@spd/shared';

import { scheduler } from '../scheduler';

function setElementText(el: IElement, text: string) {
  if (!text) {
    // empty text
    return;
  }

  if (el.children?.length > 0) {
    scheduler.schedule(el.root);
  }

  el.children = [
    {
      type: NodeTypes.TEXT,
      parentNode: el,
      root: el.root,
      text,
    },
  ];
}

export default setElementText;
