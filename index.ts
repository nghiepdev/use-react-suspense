import deepEqual from 'fast-deep-equal/react';

type Response<Data> = [Data, {remove: () => void}];

interface PromiseCache<Data, Inputs> {
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
  staleTime?: number;
  /**
   * If set to `false`, the error will never cache
   * @default true
   */
  cacheError?: boolean;
}

const promiseCaches: PromiseCache<any, any>[] = [];

export const useSuspense = <
  Data = any,
  Inputs extends ReadonlyArray<any> = ReadonlyArray<any>
>(
  promise: (...inputs: Inputs) => Promise<Data>,
  inputs: Inputs,
  options?: UseSuspenseOptions
) => {
  const staleTime = options?.staleTime ?? Infinity;
  const cacheError = options?.cacheError ?? true;

  for (const promiseCache of promiseCaches) {
    if (deepEqual(inputs, promiseCache.inputs)) {
      if (Object.prototype.hasOwnProperty.call(promiseCache, 'error')) {
        throw promiseCache.error;
      }

      if (Object.prototype.hasOwnProperty.call(promiseCache, 'response')) {
        return promiseCache.response as Response<Data>;
      }

      throw promiseCache.promise;
    }
  }

  const promiseCache: PromiseCache<Data, Inputs> = {
    promise: promise(...inputs)
      .then((data: Data) => {
        const remove = () => {
          const index = promiseCaches.indexOf(promiseCache);
          if (index !== -1) {
            promiseCaches.splice(index, 1);
          }
        };

        if (staleTime !== Infinity) {
          setTimeout(remove, staleTime);
        }

        promiseCache.response = [data, {remove}];
      })
      .catch((error: any) => {
        promiseCache.error = error;

        if (!cacheError) {
          setTimeout(() => {
            const index = promiseCaches.indexOf(promiseCache);
            if (index !== -1) {
              promiseCaches.splice(index, 1);
            }
          }, 0);
        }
      }),
    inputs,
  };

  promiseCaches.push(promiseCache);
  throw promiseCache.promise;
};
