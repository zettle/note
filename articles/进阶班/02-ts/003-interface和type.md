# interface 和 type

interface 和 type 都可以用来定义类型，但是2者之间还是有一些差异

## 差异

### 1. 定义范围不同

interface 只能定义对象类型或接口当名字的函数类型

type 可以定义任何类型，包括基础类型，联合类型，交叉类型，元组

```ts
type a = string | number;
```

### 2. 重复定义的差异

interface允许重复定义，使用的时候会自动将几个合并起来

```ts
interface Person { cname: string; }
interface Person { age: number}
// 使用时要满足上面2个interface
const p: Person = { 
    cname: 'xiaoming',
    age:23 
};
```

而type则不允许重复定义

```ts
type Person = { cname: string };
type Person = { age: number }; // error 重复定义
```

### 3. 继承上的差异

interface可以通过 extends继承多个其他的interface

而type没有继承的概念

```ts
interface Aaa { cname: string; }
interface Bbb { age: number; }
interface Ccc extends Aaa, Bbb { sex: string; }
const p: Ccc = {
  cname: "",
  age: 0,
  sex: "",
};
```

 ### 4. 交叉类型

type可以有交叉类型，而interface没有

```ts
type A = { cname: string };
type B = { age: number };
type C = A & B; // A和B的交叉类型
const c: C = { cname: "c", age: 18 };
```

## 使用场景

一般情况下，可以优先用interface

