import { NodeTypes, TagTypes } from '../enum';

export interface IElement {
  type: NodeTypes.ELEMENT;
  tag: TagTypes;
  parentNode: IElement | null;
  // eslint-disable-next-line no-use-before-define
  children: Node[];
  props: Record<string, any>;
}

export interface IText {
  type: NodeTypes.TEXT;
  text: string;
  parentNode: IElement | null;
}

export interface IComment {
  type: NodeTypes.COMMENT;
  comment: string;
  parentNode: IElement | null;
}

export type Node = IElement | IText | IComment;
