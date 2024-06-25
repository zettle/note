# Includes

类似数组的includes，返回boolean型

## 测试

```ts
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];
```

## 解题

```ts

```

思路是这样：

1、首先取出数组的第0个元素，在ts 通过 

```ts
type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Reset] ? First : never;
```

其中 `T extends [infer First, ...infer Reset] ? First : never;` 便是取出 `T[]` 的第0个元素

2、取出 `第0个元素` 之后，我们要用来判断和 `U` 是否相同，因此变成下面的

```ts
// 标准 Equal 判断逻辑，具体原因看 Equal判断 章节
type MyEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = 
    T extends [infer First, ...infer Reset] ? 
        (MyEqual<First, U> extends true ? true : false) : 
    never;
```

3、如果 `第0个元素`不相同，我们应该继续取剩余数组的第0个元素继续比较，一直到数组没有，因此这是一个递归类型

```ts
type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Reset
]
  ? (MyEqual<First, U> extends true
    ? true
    : Includes<Reset, U>)
  : false;
```



