# use-react-suspense

[![NPM version](https://img.shields.io/npm/v/use-react-suspense.svg)](https://www.npmjs.com/package/use-react-suspense)
[![NPM monthly download](https://img.shields.io/npm/dm/use-react-suspense.svg)](https://www.npmjs.com/package/use-react-suspense)

> React hooks that can make any data suspensible.  
> Inspired by [react-promise-suspense](https://github.com/vigzmv/react-promise-suspense) flexible and strongly-typed.

## Installation

To install the stable version you can use:

```sh
$ yarn add use-react-suspense
```

## Usage

**Example**

https://codesandbox.io/s/use-react-suspense-example-mcxou

```tsx
import {useSuspense} from 'use-react-suspense';

const PostListing = () => {
  const [data, {remove}] = useSuspense(
    async (url: string, method: 'GET' | 'POST') => {
      const response = await fetch(url, {
        method,
      }).then(res => res.json());

      return response;
    },
    ['https://api.domain.com/posts', 'GET']
  );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default function App() {
  return (
    <Suspense fallback='Loading...'>
      <PostListing />
    </Suspense>
  );
}
```

## API

```ts
useSuspense(AsyncFunction, Input[], Options): SuspenseResult
```

### AsyncFunction

Type: Promise `Function`  
Required: `true`  
Async function resolve your data

### Input[]

Type: `Array`  
Default: `[]`  
An array of dependencies, using deep comparison to cache data, will be pass as arguments to `AsyncFunction`.

### Options

Type: `UseSuspenseOptions`  
Required: `false`

#### Options.staleTime

Type: `Number`  
Default: `Infinity`  
The time in milliseconds after data is considered stale

#### Options.cacheWithError

Type: `Boolean`  
Default: `true`
If set to `false`, the error will never cache

### SuspenseResult

An array of your data and helpers

```ts
const [data, {remove}] = useSuspense(...);
```

#### First

The data of `AsyncFunction`

#### Second

And object list of helpers:

- `remove: () => void`: Remove cache manually

## License

MIT
