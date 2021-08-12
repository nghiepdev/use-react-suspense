# use-react-suspense

[![NPM version](https://img.shields.io/npm/v/use-react-suspense.svg)](https://www.npmjs.com/package/use-react-suspense)
[![NPM monthly download](https://img.shields.io/npm/dm/use-react-suspense.svg)](https://www.npmjs.com/package/use-react-suspense)

> React hooks that can make any data suspensible.  
> Forked from [react-promise-suspense](https://github.com/vigzmv/react-promise-suspense)

## Installation

To install the stable version:

```sh
$ yarn add use-react-suspense
```

## Usage

**Example**

https://codesandbox.io/s/use-react-suspense-example-mcxou

```tsx
import {useSuspense} from 'use-react-suspense';

const PostListing = () => {
  const [data] = useSuspense(
    async (url, method) => {
      const response = await fetch(url, {
        method,
      }).then(res => res.json());

      return response;
    },
    ['https://api.domain.com/posts', 'GET'] as const
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

Type: `Function<Promise>`  
Required: `true`  
The function takes inputs arguments

```ts
const [data] = useSuspense(
  (arg1, arg2) => {
    console.log(arg1, arg2);
  },
  [input1, input2]
);
```

### Input[]

Type: `Array<any>`  
Default: `[]`  
An array of dependencies, using deep comparison to cache data. And as arguments on to `AsyncFunction`

### Options

Type: `Object`  
Required: `false`

#### Options.cacheTime

Type: `Number`  
Default: `Infinity`  
The time in milliseconds after data is considered stale

#### Options.cacheError

Type: `Boolean`  
Default: `false`  
If set to `true`, the error will be cache

### SuspenseResult

An array of your data and utility

```ts
const [data, {remove}] = useSuspense(...)
```

#### First

Type: `Promise<any>`

The data has resolved from `AsyncFunction`

#### Second

Type: `Object`

And object list of utility:

- `remove: () => void`  
  Remove cache manually. This is helpful when to want clear cache on unmount the component.

## License

MIT
