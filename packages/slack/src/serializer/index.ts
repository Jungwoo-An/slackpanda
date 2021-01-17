import { IElement, Node, NodeTypes, TagTypes } from '@slackpanda/shared';

import actions from './actions';
import button from './button';
import context from './context';
import datePicker from './date-picker';
import divider from './divider';
import header from './header';
import image from './image';
import sectionAccessory from './section-accessory';
import sectionFields from './section-fields';
import section from './section';
import selectMenu from './select-menu';
import text from './text';
import option from './option';
import plainTextInput from './plain-text-input';
import radioGroup from './radio-group';
import checkboxGroup from './checkbox-group';
import formItem from './form-item';
import blocks from './blocks';
import modal from './modal';

const serializers: Record<TagTypes, (node: IElement) => any> = {
  [TagTypes.ACTIONS]: actions,
  [TagTypes.BUTTON]: button,
  [TagTypes.CONTEXT]: context,
  [TagTypes.DATE_PICKER]: datePicker,
  [TagTypes.DIVIDER]: divider,
  [TagTypes.HEADER]: header,
  [TagTypes.IMAGE]: image,
  [TagTypes.SECTION_ACCESSORY]: sectionAccessory,
  [TagTypes.SECTION_FIELDS]: sectionFields,
  [TagTypes.SECTION]: section,
  [TagTypes.SELECT_MENU]: selectMenu,
  [TagTypes.TEXT]: text,
  [TagTypes.OPTION]: option,
  [TagTypes.TEXT_INPUT]: plainTextInput,
  [TagTypes.RADIO_GROUP]: radioGroup,
  [TagTypes.CHECKBOX_GROUP]: checkboxGroup,
  [TagTypes.FORM_ITEM]: formItem,
  [TagTypes.MODAL]: modal,
  [TagTypes.BLOCKS]: blocks,
};

export function normalizeChildren(node: IElement) {
  return {
    ...node,
    children: node.children.filter((child) => {
      switch (child.type) {
        case NodeTypes.TEXT: {
          return !!child.text;
        }

        case NodeTypes.COMMENT: {
          return false;
        }

        default: {
          return true;
        }
      }
    }),
  };
}

export function serialize(node: Node) {
  if (node.type === NodeTypes.COMMENT) {
    // not supported
    return null;
  }

  if (node.type === NodeTypes.TEXT) {
    return node.text ?? null;
  }

  return serializers[node.tag](normalizeChildren(node));
}
