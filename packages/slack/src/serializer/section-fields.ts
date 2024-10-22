import { IElement } from '@slackpanda/shared';

import { serialize } from '.';

function sectionFields(node: IElement) {
  return node.children.map(serialize);
}

export default sectionFields;
