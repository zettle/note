# vitest的vi

vi提供了一些方便的工具

## vi的api

### vi.mock

比如现在有下面的代码

```ts
// main.ts
import { hello } from './const';
export function say () {
  return '你好'+ hello
}

// const.ts
export const hello = 'hello';
```

我们在测试的时候，可能不想要用这里的`const.ts`，又不能去改`main.ts`的源码，就可以使用 `vi.mock` 进行拦截

```ts
// main.spec.ts
import { say } from './sum';

// 第1个参数是业务代码中的 `import from 'xxx'` 这里的xxx是什么，vi.mock的第1个参数是什么
// 这样当 vitest 遇到加载对于模块的时候，就会使用这里的 vi.mock 数据
vi.mock('./const', () => {
  return {
    hello: 'xioaming'
  }
});

expect(say()).toBe('你好hello');
```

`vi.mock` 常常用于mock掉一些第3方依赖，也可以是在 vite 中配置的 alias 别名。

### vi.fn

为函数添加一个监听函数，这样vitest就可以记录该函数是否被调用、调用参数等等信息

```ts
function say() {}

const sayFn = vi.fn(say);
sayFn(); // 这里要调用代理之后的
expect(sayFn).toHaveBeenCalled();
```

### vi.spyOn

和 `vi.fn()` 类似，专门用来将某个对象上的某个方法代理

```ts
const obj = {
  say () {}
};

vi.spyOn(obj, 'say');
```

### vi.isMockFunction

判断一个函数是否是被 `vi.fn/vi.spyOn` 代理了

```ts
function say () {}
const fn = vi.fn(say);
vi.isMockFunction(fn); // true
```

### vi.clearAllMocks

清除所有的mock挡板

```ts
afterEach(() => {
  vi.clearAllMocks();
});
```

###  vi.restoreAllMocks

恢复所有被 `vi.spyOn` 或 `vi.fn` 替换的原始实现。

### vi.useFakeTimers/vi.useRealTimers

启动 `vi.useFakeTimers()`模拟计时器，包装了 `setTimeout`、`setInterval`、`clearTimeout`、`clearInterval`、`nextTick`、`setImmediate`、`clearImmediate` 和 `Date` 等一系列模拟器，直到 `vi.useRealTimers()`

比如我们想要控制当前时间再某一天

```ts
function getCurrentDate () {
  console.log(new Date().toLocaleString()); 
}

describe('整体', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 告诉vitest我们使用模拟计时器
  });
  afterEach(() => {
    vi.useRealTimers() // 每次测试运行后恢复真实时间
  });

  it('测试', () => {
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date); // 再次调用，new Date() 就是 2000/2/1 13:00:00
    getCurrentDate();
  });
});
```

### vi.setSystemTime 和 vi.getMockedSystemTime

`vi.setSystemTime`：设置当前系统时间

`vi.getMockedSystemTime()`：返回当前系统mock的时间，如果没有mock则返回null

```ts
const date = new Date(2000, 1, 1, 13);
vi.setSystemTime(date);
console.log('--->', vi.getMockedSystemTime())
```

### vi.getRealSystemTime

`vi.getRealSystemTime()`返回当前时间的时间戳（毫秒级别）。不受 `vi.setSystemTime()` 设置时间的影响