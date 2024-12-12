# vitest日期的断言

有时候，我们想要控制日期来进行测试，vitest提供了日期控制的机制。

比如现在有个函数获取当前时间

```ts
function getCurrentDate () {
  console.log(new Date().toLocaleString()); // 当前时间，每时每刻都在变化
}
```

我们可以使用vitest改变系统的时间

```ts
describe('整体', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 告诉 vitest 我们使用模拟时间
  });
  afterEach(() => {
    vi.useRealTimers() // 每次测试运行后恢复日期
  });
  
  it('测试', () => {
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);
    getCurrentDate(); // 再次调用，new Date() 就是 2000/2/1 13:00:00
  });
});
```

