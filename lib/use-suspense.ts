import deepEqual from 'fast-deep-equal/react';

import {PromiseCache, Response, UseSuspenseOptions} from './types';

const promiseCaches: PromiseCache<any, any>[] = [];

export const useSuspense = <
  Data = any,
  Inputs extends ReadonlyArray<any> = ReadonlyArray<any>
>(
  promise: (...inputs: Inputs) => Promise<Data>,
  inputs: Inputs,
  options?: UseSuspenseOptions
) => {
  const cacheTime = options?.cacheTime ?? Infinity;
  const cacheError = options?.cacheError ?? false;

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

        if (cacheTime !== Infinity) {
          setTimeout(remove, cacheTime);
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
