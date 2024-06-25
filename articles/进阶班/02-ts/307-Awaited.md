# Awaited

获取一个Promise中的resolve类型

## 测试

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]
```

## 解题

```ts
type MyAwaited<T> = T extends
  | Promise<infer R>
  | { then: (onfullfilled: (arg: infer R) => any) => any }
  ? MyAwaited<R>
  : T;
```

## 知识点

1. 递归解决嵌套问题
2. `A extends Promise<infer R>`，匹配推断类型