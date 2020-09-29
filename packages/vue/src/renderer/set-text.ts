import { IText } from '@spd/shared';

function setText(node: IText, text: string) {
  node.text = text;
}

export default setText;
