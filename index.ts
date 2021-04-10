import deepEqual from 'fast-deep-equal/react';

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
   * If set to `false`, the error will never cache
   * @default true
   */
  cacheWithError?: boolean;
}

const promiseCaches: PromiseCache[] = [];

export const useSuspense = <Data = any>(
  promise: (...inputs: any) => Promise<Data>,
  inputs: any[] = [],
  options?: UseSuspenseOptions
) => {
  const staleTime = options?.staleTime ?? Infinity;
  const cacheWithError = options?.cacheWithError ?? true;

  for (const promiseCache of promiseCaches) {
    if (deepEqual(inputs, promiseCache.inputs)) {
      // If an error occurred,
      if (Object.prototype.hasOwnProperty.call(promiseCache, 'error')) {
        throw promiseCache.error;
      }

      // If a response was successful,
      if (Object.prototype.hasOwnProperty.call(promiseCache, 'response')) {
        return promiseCache.response as PromiseCache<Data>['response'];
      }

      throw promiseCache.promise;
    }
  }

  // The request is new or has changed.
  const promiseCache: PromiseCache<Data> = {
    promise:
      // Make the promise request.
      promise(...inputs)
        .then((response: Data) => {
          const remove = () => {
            const index = promiseCaches.indexOf(promiseCache);
            if (-1 !== index) {
              promiseCaches.splice(index, 1);
            }
          };

          if (staleTime !== Infinity) {
            setTimeout(remove, staleTime);
          }

          promiseCache.response = [response, {remove}];
        })
        .catch((error: any) => {
          promiseCache.error = error;

          // Remove cache of error
          if (!cacheWithError) {
            setTimeout(() => {
              const index = promiseCaches.indexOf(promiseCache);
              if (-1 !== index) {
                promiseCaches.splice(index, 1);
              }
            }, 0);
          }
        }),
    inputs,
    response: undefined!,
  };

  promiseCaches.push(promiseCache);
  throw promiseCache.promise;
};
