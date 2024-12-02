# vitest的vi

vi提供了一些方便的工具

## vi.mock

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

`vi.mock` 常常用于mock掉一些第3方依赖。