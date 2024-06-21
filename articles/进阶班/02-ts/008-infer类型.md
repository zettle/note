# 深入infer

infer是做什么的：infer表示在extends条件语句中以占位符出现，等到使用时才推断出来的数据类型

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
