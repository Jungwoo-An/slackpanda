import { TagTypes } from '@spd/shared';
import Joi from 'joi';

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

const schema: Record<TagTypes, Joi.ObjectSchema> = {
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
};

export default schema;
