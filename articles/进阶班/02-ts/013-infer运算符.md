# infer运算符

infer是做什么的：infer 表示在 extends 条件语句中以占位符出现，等到使用时才推断出来的数据类型

比如下面定义一个函数

```ts
type CusnFun = (params: { cname: string; cage: number }) => string;
```

现在我想拿到这个函数的参数的类型 `{ cname: string; cage: number }`

以往我们会将参数抽离一个单独的类型。

但在这里，使用infer提取

```ts
type CusnParams = CusnFun extends (params: infer A) => string ? A : never;
```

得到的`CusnParams = { cname: string; cage: number }`

同理，如果想要获取函数的返回值类型：

```ts
type CusnReturn = CusnFun extends (params: any) => infer R ? R : never;
```



举个例子：

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

上面示例中，`infer Item` 表示 `Item` 这个参数是 TypeScript 自己推断出来的，不用显式传入，而 `Flatten<Type> `则表示 `Type` 这个类型参数是外部传入的。`Type extends Array<infer Item>` 则表示，如果参数 `Type` 是一个数组，那么就将该数组的成员类型推断为 `Item`，即 `Item` 是从 `Type` 推断出来的。

一旦使用 `Infer Item` 定义了 `Item`，后面的代码就可以直接调用 `Item` 了。下面是上例的泛型 `Flatten<Type>` 的用法

```ts
type Str = Flatten<string[]>; // string
type Num = Flatten<number>;   // number
```



再举个例子：

```ts
type ReturnPromise<T> =
  T extends (...args: infer A) => infer R 
  ? (...args: A) => Promise<R> 
  : T;
```

上面示例中，如果 `T` 是函数，就返回这个函数的 Promise 版本，否则原样返回。`infer A` 表示该函数的参数类型为 `A`，`infer R `表示该函数的返回值类型为 `R`。



再举个例子，提取对象指定属性的例子：

```ts
type MyType<T> = T extends {
  a: infer M,
  b: infer N
} ? [M, N] : never;

type Result = MyType<{ a: string; b: number }>; // [string, number]
```

上面示例中，`infer` 提取了参数对象的属性 `a` 和属性 `b` 的类型



再举个例子：

```ts
type Str = 'foo-bar';

type Bar = Str extends `foo-${infer rest}` ? rest : never // 'bar'
```

上面示例中，`rest` 是从模板字符串提取的类型参数。



## 和泛型一起使用

上面的代码中

```ts
type CusnFun = (params: { cname: string; cage: number }) => string; // 定义了一个函数类型
type CusnParams = CusnFun extends (params: infer A) => string ? A : never;
type CusnReturn = CusnFun extends (params: any) => infer R ? R : never;
```

获取函数的入参类型和返回类型都是写死的，那么有没有办法写得通用一点呢？

这个时候就可以使用上泛型了

```ts
type CusnFun = (params: { cname: string; cage: number }) => string; // 定义了一个函数类型

type FunParams<F> = F extends (params: infer P) => any ? P : never;
type FunReturn<F> = F extends (params: any) => infer R ? R : never;

type CusnParams2 = FunParams<CusnFun>;
type CusnReturn2 = FunReturn<CusnFun>;
```

> vue3中的例子，比如vue3源码中有下面的代码
>
> ```ts
> export function unref<T>(ref: T): T extends Ref<infer V> ? V : T {}
> ```
>
> 上面代码中：
>
> 如果用户调用的是 `unref(4)` 则没有命中`T extends Ref<>`返回的是 `T`，即`number`类型。
>
> 如果用户调用的是 `unref(ref(4))`，传入的是一个 ref 对象，那会命中 `T extends Ref<infer V>`，那么 `infer V`就指向了number，所以返回的是number类型
