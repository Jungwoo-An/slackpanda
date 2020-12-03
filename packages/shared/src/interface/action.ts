/* eslint-disable camelcase */
import { TagTypes } from '../enum';

export interface IAction {
  block_id: string;
  action_id: string;
  action_ts: string;
}

export interface IDatePickerAction extends IAction {
  type: TagTypes.DATE_PICKER;
  selected_date: string;
}

export interface IButtonAction extends IAction {
  type: TagTypes.BUTTON;
}

export type ActionType = IDatePickerAction | IButtonAction;
