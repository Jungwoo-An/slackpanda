import { FixMe } from '../types';
import { IElement } from './node';

export interface IClientAdapterPayload {
  node?: IElement;
  [key: string]: any;
}

export interface IClientAdapter<T extends IClientAdapterPayload> {
  sendMessage: (payload: T) => Promise<FixMe>;

  updateMessage: (payload: T) => Promise<FixMe>;

  addEventHandler: (event: string, handler: (...args: any[]) => any) => void;

  removeEventHandler: (event: string, handler: (...args: any[]) => any) => void;
}
