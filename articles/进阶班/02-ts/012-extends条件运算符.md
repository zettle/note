# 条件类型

在ts中条件类型主要依赖 `A extends B ? C : D`，就有点类型 js 中的三元运算符，可以根据当前类型是否符合某种条件，返回不同的类型

```ts
T extends U ? X : Y
```

上面式子中的 `extends` 用来判断，类型 `T` 是否可以满足类型 `U`，即 `T` 是否为 `U` 的子类型，这里的 `T` 和 `U` 可以是任意类型。如果 `T` 能够赋值给类型 `U`，表达式则返回类型`X`，否则返回类型`Y`。

```ts
type T = 1 extends number ? true : false; // true
```

上面示例中，1是number的子类型，所以返回 true

下面是另外一个例子。

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type T1 = Dog extends Animal ? number : string; // number
type T2 = RegExp extends Animal ? number : string; // string
```

条件运算符还可以嵌套使用。

```
type LiteralTypeName<T> =
  T extends undefined ? "undefined" :
  T extends null ? "null" :
  T extends boolean ? "boolean" :
  T extends number ? "number" :
  T extends bigint ? "bigint" :
  T extends string ? "string" :
  never;
```

上面示例是一个多重判断，返回一个字符串的值类型，对应当前类型。下面是它的用法。

```ts
type Result1 = LiteralTypeName<123n>;           // "bigint"
type Result2 = LiteralTypeName<true | 1 | 'a'>; // "string" | "number" | "boolean"
```

## 普通条件类型和泛型条件类型

在ts中的条件判断如下

```ts
type A = string extends string | number ? boolean : never; // A = boolean
```

上面的含义：`string` 是 `string | number` 中的一种，就返回 `boolean` ，因此 `A = boolean`

但条件类型和联合类型判断的时候

```ts
type A = string | number extends string | number | boolean ? boolean : never; // A = boolean
```

上面的含义：`string | number` 这个联合类型属于 `string | number | boolean` 内的时候，就返回 `boolean` ，因此 `A = boolean`

因此可以推断下面代码：

```ts
type A = string | number | boolean extends string | number ? boolean : never; // A = never
```

上面的含义：`string | number | boolean`这个联合类型属于 `string | number` 范围内的，明显不属于，所以返回了`never`



**如果使用泛型**，还是上面的例子，这里使用泛型

```ts
type Cust<A> = A extends string | number ? A : never;
type Test = Cust<string | number | boolean>; // Test = string | number
```

使用了泛型之后完全和普通的条件判断不一样了，因为ts中是这么处理的：

对 `Cust<string | number | boolean>` ts会挨个拿出类型出来去做判断，即拿出 `string` 传过去判断，接着拿 `number`，接着拿 `boolean`，符合的就返回

而在普通的条件判断 `string | boolean` 就直接当做一个整体去判断。

如果我们想要在让其表现的和普通条件判断一样，可以在 `extends` 两侧的操作数都放在方括号里面

```ts
type Cust<A> = [A] extends [string | number] ? A : never;
type Test = Cust<string | number | boolean>; // Test = never
```



## 使用场景

在项目中怎么使用，比如现在有下面的代码：

```ts
// 参数a、b都是string数组
function myfun<T extends Array<string>, U extends Array<string>>(a: T, b: U) {
  console.log(a);
}
```

某一天我们需要扩展参数a、b的类型，除了数组外还可以是object，那么就需要改2个地方

而利用泛型条件判断，我们可以将这个过程封装起来

```typescript
type CorsType<A> = A extends Array<string> ? A : never;
function myfun<T, U>(a: CorsType<T>, b: CorsType<U>) {
  console.log(a.join);
}
```

这样只需要改泛型的 `CorsType` 里面即可