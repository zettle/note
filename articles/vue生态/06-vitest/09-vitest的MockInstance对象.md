# vitest的MockInstance对象

在 vi 的工具函数里面， `vi.fn/vi.spyOn` 返回的是一个 MockInstance 对象：

```ts
function say() {}
const sayFn = vi.fn(say);  // sayFn是一个 MockInstance 对象

const obj = { say() {} };
const spySay = spyOn(obj, 'say'); // spySay是一个 MockInstance 对象 
```

## MockInstance对象上的方法

对象上的方法返回的又是一个MockInstance对象，因此可以链式调用

```ts
function say() { return 'aaaa'; }

const sayFn = vi.fn(say);
sayFn.mockReturnValue('xiaoming').mockReturnValueOnce('小红'); // 链式调用
```

* `mockReturnValue()/mockReturnValueOnce()`：能够mock掉函数的返回值

```ts
function say() { return 'aaaa'; }

const sayFn = vi.fn(say);
sayFn.mockReturnValue('xiaoming'); // 本来函数返回的是 aaa 的，这里mock掉了，函数返回值变成了 xiaoming
sayFn(); // 返回值是 xiaoming
expect(sayFn).toHaveReturnedWith('xiaoming');
```

而 `mockReturnValueOnce()` 只能mock一次值，如果链式调用，每次调用都会返回mock值，当mock值别调用完了，就由 `mockImplementation` 或 其他 `mockReturn*` 方法指定。

```ts
function say() { return 'aaaa'; }

const sayFn = vi.fn(say);
sayFn.mockReturnValueOnce('xiaoming'); // 代理返回值1次
sayFn.mockReturnValueOnce('小红'); 
sayFn();
expect(sayFn).toHaveLastReturnedWith('xiaoming'); // 通过，第1次调用，返回值是 xiaoming

sayFn();
expect(sayFn).toHaveLastReturnedWith('小红'); // 通过，第2次调用，返回值是 小红

sayFn();
expect(sayFn).toHaveLastReturnedWith('aaaa'); // 通过，第3次调用，因为 toHaveLastReturnedWith 次数耗尽了，又没有其他mock，就用函数本来的返回
```

* `mockImplementation()/mockImplementationOnce()`：模拟函数的实现，`mockImplementationOnce()`模拟的就是一次性的

```ts
function say (age: number) {
  return age;
}

const mockFn = vi.fn(say);
mockFn.mockImplementation((age: number) => 23);
mockFn(1); // 返回 23
```

## MockInstance对象上的属性

二维数组，数组的每一项是每次调用时候的入参

```ts
function say (name: string, age: number) {
  return name + '_' + age;
}

const fn = vi.fn(say);
fn('xiaoming', 18);
fn('小红', 23);
console.log(fn.mock.calls); // [ [ 'xiaoming', 18 ], [ '小红', 23 ] ]
```

