# 了解keyof

通过 `keyof` 可以获取到对象上对应的key组合的联合类型。

需要注意一下的是，如果key是Symbol类型、number类型、boolean类型的时候，能赋值的值有类型要求

```ts
const symbolId = Symbol("id");
interface Person {
  cname: string;
  100: number;
  [symbolId]: string;
  true: boolean;
}

type A = keyof Person;
const aa: A = symbolId; // 只能是key中的symbol，不能其他symbol
const bb: A = 'true';   // 只能是一个字符串的true，而不是boolean型的true
const cc: A = 100;      // 只能是一个number类型的100，而不能是string类型的'100'
```

在使用keyof中，例如下面代码：

```ts
const symbolId = Symbol("id");
interface Person {
  cname: string;
  100: number;
  [symbolId]: string;
  true: boolean;
}
type A = keyof Person;
```

鼠标移动上去的时候，只看到了

![keyof](./img/key-mouse.png)

对我们开发不够直观，如果更加直观的看出来呢？我们可以封装一个泛型

```ts
type AllKeys<T> = T extends any ? T : never;

// 将上面的类型A传入泛型中
type Pkeys = AllKeys<A>;
```

再用鼠标看，就能看出具体有哪几种值了

![key-mouse-2.png](./img/key-mouse-2.png)

keyof 无法获取类上的静态属性和静态方法

```ts
class Order {
  orderId: number = 1;
  ordreName: string = "Mobile";
  static count: number = 0;
  printOrder() {}
  static getCount() {}
}

type OrderKeys = keyof Order; // "orderId" | "ordreName" | "printOrder"
```

## 类型递归

`in keyof` 用来做类型递归，类似 `for..in..`

```ts
interface Person {
  name: string;
  age: number;
  mobile: number;
}

type PersonValType = {
  [P in keyof Person]: Person[P];
};
```

我们知道 `keyof Person` 得到的是key的联合类型，等效于 `keyof Persion = name | age | mobile`

因此上面等于

```ts
type PersonValType = {
  [P in 'name' | 'age' | 'mobile']: Person[P];
};
// 
// 即等于下面
type PersonValType = {
    'name': Person['name'],
    'age' Person['age'],
    'mobile': Person['mobile']
}
```

`P in 'name' | 'age' | 'mobile'` 在ts中，会逐个遍历递归得到 `name/age/mobile`，并赋值给P

## 数组类型递归

`in keyof` 也可以用在数组上，既可以遍历数组下标，也可以遍历数组元素

```ts
const arr = ["a", "b", "c"] as const;
type Arr = typeof arr;

type NewArr = {
  [K in keyof Arr]: string;
};
```

鼠标引入 `NewArr` 可以看出，`NewArr` 的下标就是 `数组arr` 的下标 `0/1/2`

如果我们想要拿到数组元素的，可以使用 `数组[number]`

```ts
const arr = ["a", "b", "c"] as const;
type Arr = typeof arr;

type NewArr = {
  [K in keyof Arr[number]]: string;
};
```




