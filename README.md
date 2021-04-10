# use-react-suspense

React hooks that can make any data suspensible.
Inspired by [react-promise-suspense](https://github.com/vigzmv/react-promise-suspense) flexable and strongly-typed.

[![NPM version](https://img.shields.io/npm/v/use-react-suspense.svg)](https://www.npmjs.com/package/use-react-suspense)
[![NPM monthly download](https://img.shields.io/npm/dm/use-react-suspense.svg)](https://www.npmjs.com/package/use-react-suspense)

## Example

https://codesandbox.io/s/use-react-suspense-example-mcxou

## Installation

To install the stable version you can use:

```sh
$ yarn add use-react-suspense
```

## Usage

```tsx
import {useSuspense} from 'use-react-suspense';

const DelayedComponent = () => {
  const [data, {remove}] = useSuspense(
    (input1: string, input2: string) => {
      return Promise.resolve([
        {
          username: input1,
          role: 'admin',
          age: 18,
        },
        {
          username: input2,
          role: 'mod',
          age: 20,
        },
      ]);
    },
    ['john doe', 'jane']
  );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default function App() {
  return (
    <Suspense fallback='Loading...'>
      <DelayedComponent />
    </Suspense>
  );
}
```

## API

```ts
useSuspense(AsyncFunction, Input[], Options)
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

## License

MIT
