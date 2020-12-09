import { findRoot, IText } from '@spd/shared';

import { scheduler } from '../scheduler';

function setText(node: IText, text: string) {
  if (node.text) {
    scheduler.schedule(findRoot(node));
  }

  node.text = text;
}

export default setText;
