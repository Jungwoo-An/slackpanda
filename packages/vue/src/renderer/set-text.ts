import { IText } from '@spd/shared';

import { scheduler } from '../scheduler';

function setText(node: IText, text: string) {
  if (node.text) {
    scheduler.schedule(node.root);
  }

  node.text = text;
}

export default setText;
