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

## 类型兼容

记住小类能赋值给大类（大类需要的方法小类都有，所以可以赋值），大类不能反过来赋值给小类（小类需要的方法大类没有，所以不行）

```ts
// 动物 大类
interface Animal {
	name: string;
}

// 狗 小类，继承了大类
interface Dog extends Animal {
	bark(): void;
}

let animal: Animal;
let dog: Dog;

animal = dog; // Dog类型兼容Animal类型，因为Dog包含了Animal的所有属性
dog = animal; // // 但Animal类型不兼容Dog类型，因为Animal缺少bark方法，这行会报错
```

