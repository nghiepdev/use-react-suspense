export interface PromiseCache<Data = unknown> {
  promise?: Promise<void>;
  inputs: any[];
  error?: any;
  response: [Data, {remove: () => void}];
}

export interface UseSuspenseOptions {
  /**
   * The time in milliseconds after data is considered stale
   * If set to `Infinity`, the data will never be considered stale
   * @default Infinity
   */
  staleTime?: number;
  /**
   * If set to `true`, the error will be cache
   * @default false
   */
  cacheError?: boolean;
}
