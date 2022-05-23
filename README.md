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
      const response = await fetch(url, {method});

      return response.json();
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

```tsx
const [data] = useSuspense(Function, Input[], Options): SuspenseResult
```

### Function

Type: `Function<Promise>`  
Required: `true`  
The function takes inputs arguments and returns a thenable (async function or a promise)

```tsx
const [data] = useSuspense(
  async (arg1, arg2) => {
    console.log(arg1, arg2);
  },
  [input1, input2]
);
```

### Input[]

Type: `Array<any>`  
Default: `[]`  
An array of dependencies, using deep comparison to cache data. And as arguments on to `Function`

### Options

Type: `Object`  
Required: `false`

#### Options.cacheTime

Type: `Number`  
Default: `Infinity`  
The time in milliseconds after data will be clean, it defaults to `Infinity` (keep-alive forever)

#### Options.cacheError

Type: `Boolean`  
Default: `false`  
If set to `true`, the error will be cache

### SuspenseResult

An array of your data and utility

```tsx
const [data, {clear}] = useSuspense(...)
```

#### The 1st

Type: `any`

The data has resolved from `Function`

#### The 2nd

Type: `Object`

And object list of utility:

- `clear: () => void`  
  Clear cache manually. This is helpful when to want clear cache on unmount the component.

## License

MIT
