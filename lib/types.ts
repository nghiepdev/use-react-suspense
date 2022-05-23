export type Response<Data> = [Data, {clear: () => void}];

export interface PromiseCache<Data, Inputs> {
  promise: Promise<void>;
  inputs: Inputs;
  error?: any;
  response?: Response<Data>;
}

export interface UseSuspenseOptions {
  /**
   * The time in milliseconds after data will be clean
   * It defaults to `Infinity` (keep-alive forever).
   * @default Infinity
   */
  cacheTime?: number;

  /**
   * If set to `true`, the error will be cache
   * @default false
   */
  cacheError?: boolean;
}
