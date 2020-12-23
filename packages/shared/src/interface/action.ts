/* eslint-disable camelcase */

export interface IAction {
  block_id: string;
  action_id: string;
  action_ts: string;
}

export interface IDatePickerAction extends IAction {
  type: 'datepicker';
  selected_date: string;
}

export interface IButtonAction extends IAction {
  type: 'button';
}

export interface IPlainTextInputAction extends IAction {
  value: string;
}

export type ActionType =
  | IDatePickerAction
  | IButtonAction
  | IPlainTextInputAction;
