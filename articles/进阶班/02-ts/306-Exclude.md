# Exclude

自己实现ts高级类型Exclude

## 测试

```ts
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>, Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>, Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>];
```

## 课题

```ts
type MyExclude<T, U> = T extends U ? never : T;
```
