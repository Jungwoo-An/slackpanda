import { IText, NodeTypes } from '@spd/shared';

function createText(text: string): IText {
  return {
    type: NodeTypes.TEXT,
    parentNode: null,
    root: null,
    text,
  };
}

export default createText;
