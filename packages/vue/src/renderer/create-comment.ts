import { NodeTypes, IComment } from '@spd/shared';

function createComment(text: string): IComment {
  return {
    type: NodeTypes.COMMENT,
    parentNode: null,
    comment: text,
  };
}

export default createComment;
