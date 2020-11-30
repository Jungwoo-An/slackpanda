import { IElement, NodeTypes } from '@spd/shared';

function setElementText(el: IElement, text: string) {
  if (!text) {
    // empty text
    return;
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
