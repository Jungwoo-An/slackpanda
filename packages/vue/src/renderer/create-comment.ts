import { NodeTypes, IComment } from '@slackpanda/shared';

function createComment(text: string): IComment {
  return {
    type: NodeTypes.COMMENT,
    parentNode: null,
    comment: text,
  };
}

export default createComment;
