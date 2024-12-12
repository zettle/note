# vitest断言函数

函数的断言比较多，单独作为一章

## 函数的断言

### 断言函数是否调用和入参的

* `toHaveBeenCalled()`：断言一个函数是否被调用，需要给 `expect` 传递一个`vi.spyOn/vi.fn`监听函数

```ts
const market = {
  buy(subject: string, amount: number) {}
};

const buySpy = vi.spyOn(market, 'buy'); // 拦截函数后会给函数加上一些调用次数之类的属性
expect(buySpy).not.toHaveBeenCalled();  // 通过，这个时候还没调用 
market.buy('a', 1); // 调用函数
expect(buySpy).toHaveBeenCalled(); // 通过，上一行调用了函数
```

* `toHaveBeenCalledTimes()`：断言函数被调用的次数
* `toHaveBeenCalledWith()/toHaveBeenLastCalledWith()`：断言函数被调用并且入参要符合

`toHaveBeenNthCalledWith()`：断言一个函数在第N次调用的时候，使用了某些参数

```ts
const market = {
  buy(subject: string, amount: number) {}
};

const buySpy = vi.spyOn(market, 'buy');
market.buy('a', 2);
market.buy('a', 1);
expect(buySpy).toHaveBeenCalledWith('a', 2);       // 通过，因为被调用过并且入参也符合
expect(buySpy).toHaveBeenLastCalledWith('a', 2);   // 不通过，因为最近一次调用的入参是('a', 1)
expect(buySpy).toHaveBeenNthCalledWith(2, 'a', 1); // 通过，
expect(buySpy).toHaveBeenNthCalledWith(1, 'a', 2); // 通过，
```

### 断言函数返回值

* `toHaveReturned()/toHaveReturnedTimes()/toHaveReturnedWith()/toHaveLastReturnedWith()/toHaveNthReturnedWith()`: 断言函数有返回值

```ts
function say (name: string, age: number) {  }
const saySpy = vi.fn(say);
saySpy('a', 1); // 这里要调用vitest代理后的
expect(saySpy).toHaveReturned(); // 通过，上面的say函数即时没有返回内容也能通过，基本上只要函数不异常就能过


function say (name: string, age: number) { return { name,age } }
const saySpy = vi.fn(say);
saySpy('a', 1);
expect(saySpy).toHaveReturnedWith({ name: 'a', age: 1 });
```

> **注意：** `toHaveNthReturnedWith()`是从1开始的，所以想要测试第2次调用的话，就传2，`toHaveNthReturnedWith(2)` 即可