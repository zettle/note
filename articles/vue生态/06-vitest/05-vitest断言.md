## vitest断言

在单测中 `expect()` 用来进行断言，常规的有下面几种场景：

## 不同类型的断言

### 数字的断言

* `toBeGreaterThan()`：断言要大于指定的
* `toBeGreaterThanOrEqual()`：断言要大于或等于指定的
* `toBeLessThan()`：断言要小于指定的
* `toBeLessThanOrEqual`：断言要小于或等于指定的

```ts
expect(1 + 2).toBeGreaterThan(2); // 1+2要大于2
expect(0.2 + 0.1).toBe(0.3, 5); // 
```

* `toBeCloseTo()`：浮点数的比较，可以传递第2个参数限制比较小数点的位数



### 字符串的断言

* `toContain()`：断言字符串中是否含有某个字符串

```ts
expect('xiaoming').toContain('min')
```

* `toMatch()`：断言字符串中是否符合正则表达式

```ts
expect('top fruits include apple, orange and grape').toMatch(/apple/)
```



### 数组类断言

* `toContain()/toContainEqual()`：断言数组中是否含有某个元素

```ts
expect(['a', 'b']).toContain('b');
```



### 对象类的断言

* `toHaveProperty(<key>, <value>)`：断言是否含有某个key，第2个参数可以断言要含有这个key并且key的值需要等于指定的

```ts
expect({ age:23 }).toHaveProperty('age');
expect({ age:23 }).toHaveProperty('age', 2); // 不通过，断言对象上要有age这个key，且值为2

```

``toHaveProperty()` 只会判断一层，支持通过`.`的方式或 `[]` 去拿对象或者数组

```ts
const obj = {
  person:{
    name: 'xx'
  }, 
  count: [{type:'3'}]
};

expect(obj).toHaveProperty('name'); // 不通过，name在第2层了
expect(obj).toHaveProperty('name.fruit'); // 通过
expect(obj).toHaveProperty('count[0].type'); // 通过
expect(obj).toHaveProperty('count.0.type'); // 通过
```

* `toMatchObject()`：可用于数组或对象上，判断是否含有某个对象子集

```ts
expect({person: {name: 'x'}}).toMatchObject({name: 'x'}); // 通过
expect([{ name: 'x', age: 23 }]).toMatchObject([{ name: 'x' }]); // 通过 
```

### 异常的断言

* `toThrowError()`：断言函数是否报错，也能断言错误信息，支持正则

```ts
function foo (type: string) {
  if (type === 'person') {
    throw new Error('错误信息系')
  }
  return null
}

// 这里要用箭头函数再包裹一层
expect(() => foo('person')).toThrowError('错误信息系'); // 通过，发生了异常并且异常信息message是'错误信息系'
expect(() => foo('person')).toThrowError(/错误信息系/); // 入参也可以是一个正则
```



### Promise的断言

对于一个Promise，我们需要等到Promise进入resolve或reject 之后才需要测试。vitest提供了`resolve/reject`去等待

```ts
function sleep (): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('xiaoming');
    }, 3000);
  });
}
test('单测1', () => {
   expect(sleep()).resolves.toEqual({ id: 1 }); // expect().resolves 会去等待promise完成再进行断言
  await expect(sleep()).rejects.toThrow('no id'); // reject的断言
});
```

**注意：**加了`expect().resolves` 之后，断言就会变成一个异步的，如果不加 await，那么就会并行执行后续的

```ts
test('单测1', () => {
    // 这里没有加await,代码会去执行第4行的console代码，再等待3s后才进入断言结果
    expect(sleep({id: 1})).resolves.toEqual({ id: 1 });
    console.log('后续的测试');
});

// 打印结果
'后续的测试'
等3s
<断言结果>
```

而加上await之后，后续的就会等待这个断言出了结果再继续

```ts
test('单测1', async () => {
    // 这里加await，等待第3行的断言执行完，才会执行第4行的console.log代码
    await expect(sleep({id: 1})).resolves.toEqual({ id: 1 });
    console.log('后续的测试');
});

// 打印结果
等3s
<断言结果>
'后续的测试'
```



### 其他断言

* `toBe()`：可以用于任何类型，相当于`===`。

`toBe()` 尽量不要用在浮点数上，比如 `0.1 + 0.2` 其实不等于 `0.3` ，如果要用在浮点型上，可以使用 `toBeCloseTo()`代替

```ts
expect(0.1 + 0.2).toBeCloseTo(0.3)
```

* `toEqual()/toStrictEqual()`：可以用于任何类型，用于数组、对象的时候，并且会深层次对比只要内容一样即可，`toEqual()/toStrictEqual()` 的不同可以看下面的

```ts
expect(
  { age: 23}
).toEqual(
  { name: undefined, age: 23 }
); // 结果是true，一个没有name属性，一个虽然有name属性但是undefined，`toEqual()`认为是一样的

expect(
  { age: 23}
).toStrictEqual(
  { name: undefined, age: 23 }
); // 结果不通过， toStrictEqual() 会去校验undefined
```

* `not`：否定断言，一个断言加了 `not` 之后就会取反，注意 `not` 不是一个函数比如：

```ts
expect(1 + 2).not.toBe(4); // 1+2不等于4
expect({ age:23 }).not.toHaveProperty('age'); // {age:23} 不具有age这个key
```

* `toBeDefined()`：断言值是否不为`undefined`

* `toBeTruthy()/toBeFalsy()`：断言值是否可以转为`true/false`，注意这里不是断言值是否为`true/false`，只是判断是否转为`true/false`。

```ts
expect(123).toBeTruthy(); // true
```

> js 中除了 `false` ，`0` ，`''` ，`null` ，`undefined` 和 `NaN`，其他一切都是为真

* `toBeNull()/toBeNaN()`：断言是否为 `null/NaN`

* `toBeTypeOf()/toBeInstanceOf()`：断言是否属于接收的类型

```ts
expect('aa').toBeTypeOf('string');
expect(1).toBeTypeOf('number');

const p = new Person();
expect(p).toBeInstanceOf(Person); // p是Person的实例
```

* `toHaveLength()`：用在数组 / 对象 / 字符串上都可以，断言其length属性是否为某个值

```ts
expect('abc').toHaveLength(3);
expect([1, 2, 3]).toHaveLength(3);
expect({ name:'xx',length: 3 }).toHaveLength(3)
```



### 补充内容

#### `toBe()` 和 `toEqual()` 的区别

`toBe()`它使用`===`检查严格的平等，通常用于比较基础类型，如果用来比较对象、数组等的时候，它比较的是内存引用地址是否一致。

`toEqual()` 用于检查两个对象具有相同的值，只要内容一样就行，内存地址可以不是一个

#### `toEqual` 和 `toStrictEqual()` 的区别

2者的区别主要在对undefined的处理上，`toEqual()`会跳过对undefined的比较，而 `toStrictEqual`

```ts
expect(
  { age: 23}
).toEqual(
  { name: undefined, age: 23 }
); // 结果是true，一个没有name属性，一个虽然有name属性但是undefined，`toEqual()`认为是一样的

expect(
  { age: 23}
).toStrictEqual(
  { name: undefined, age: 23 }
); // 结果不通过， toStrictEqual() 会去校验undefined
```

#### `toContain()` 和 `toContainEqual()`

`toContain` 可以用于数组、字符串，`toContainEqual()`只能用于数组。

当数组内的元素是一个对象的时候，就有区别了。

`toContain()` 对比对象是要内存地址一直，`toContainEqual()`对比的是对象内容

```ts
expect({fruit: 'apple', count: 5}).toContain({ fruit: 'apple', count: 5 }); // 不通过，是2个对象
expect([{fruit: 'apple', count: 5}]).toContainEqual({ fruit: 'apple', count: 5 }); // 通过，内容一致
```





