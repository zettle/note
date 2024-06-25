# Parameters

也是ts高级类型Parameters的实现原理

## 测试

```ts
import type { Equal, Expect } from "@type-challenges/utils";

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: "A" }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];
```

## 解题

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer T
) => any
  ? T
  : never;
```

