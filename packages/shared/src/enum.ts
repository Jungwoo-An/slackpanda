/* eslint-disable no-shadow */

export const enum NodeTypes {
  TEXT = 'TEXT',
  ELEMENT = 'ELEMENT',
  COMMENT = 'COMMENT',
}

export const enum TagTypes {
  BLOCKS = 'blocks',

  // Blocks
  ACTIONS = 'actions',
  CONTEXT = 'context',
  DIVIDER = 'divider',
  HEADER = 'header',
  IMAGE = 'image',
  SECTION = 'section',
  SECTION_ACCESSORY = 'section-accessory',
  SECTION_FIELDS = 'section-fields',

  // Block Elements
  BUTTON = 'button',
  DATE_PICKER = 'date-picker',
  SELECT_MENU = 'select-menu',

  // Composition Objects
  TEXT = 'text',
  OPTION = 'option',
}
