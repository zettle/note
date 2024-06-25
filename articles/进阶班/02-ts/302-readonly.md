# Readonly

自己实现ts高级类型readonly

## 测试

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
```

## 解题

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

