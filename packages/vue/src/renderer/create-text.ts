import { IText, NodeTypes } from '@slackpanda/shared';

function createText(text: string): IText {
  return {
    type: NodeTypes.TEXT,
    parentNode: null,
    text,
  };
}

export default createText;
