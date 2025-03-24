# Pick

也是ts高级类型Pick的实现原理

## 测试

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}
```

在测试用例中，有这样一段代码`// @ts-expect-error`，表示希望这里抛出ts错误的意思

## 解题

```ts
type MyPick<T, K extends keyof T> = {
  [O in K]: T[O];
};
```

