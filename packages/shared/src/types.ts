export type FixMe = any;

export type PromiseReturnType<T> = T extends (...args: any) => Promise<infer R>
  ? R
  : any;
