import { FixMe } from '../types';
import { IElement } from './node';

export interface IClientAdapterPayload {
  channelId: string;
  text?: string;
  node?: IElement;
}

export interface IClientAdapter {
  sendMessage: (payload: IClientAdapterPayload) => Promise<FixMe>;

  updateMessage: (node: IElement) => Promise<FixMe>;

  addEventListener: (event: string, listener: (...args: any[]) => any) => void;

  removeEventListener: (
    event: string,
    listener: (...args: any[]) => any
  ) => void;
}
