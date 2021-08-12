export type Response<Data> = [Data, {remove: () => void}];

export interface PromiseCache<Data, Inputs> {
  promise: Promise<void>;
  inputs: Inputs;
  error?: any;
  response?: Response<Data>;
}

export interface UseSuspenseOptions {
  /**
   * The time in milliseconds after data is considered stale
   * If set to `Infinity`, the data will never be considered stale
   * @default Infinity
   */
  cacheTime?: number;
  /**
   * If set to `true`, the error will be cache
   * @default false
   */
  cacheError?: boolean;
}
