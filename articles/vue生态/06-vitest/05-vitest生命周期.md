# 生命周期

`beforeAll`：在当前文件的正式开始测试前执行一次，适合做一些每次 test 前都要做的初始化操作，比如数据库的清空以及初始化

`beforeEach`：在当前文件的每个 test 执行前都调用一次。

`afterAll`：在当前文件所有测试结束后执行一次，适合做一些收尾工作，比如将mock清除。

`afterEach`：在当前文件的每个 test 执行完后都调用一次。

```ts
describe('测试函数库', () => {
  beforeAll(() => {
    console.log('beforeAll beforeAll');
  });

  beforeEach(() => {
    console.log('beforeEach beforeEach');
  });

  test('测试1', () => {
    expect('xiaoming').toContain('min');
  });

  test('测试2', () => {
    expect({name:'xiaoming'}).toHaveProperty('name');
  });

  afterEach(() => {
    console.log('afterEach afterEach');
  });
  
  afterAll(() => {
    console.log('afterAll afterAll');
  });
})
```

执行结果:

```text
stdout | src/utils/sum.spec.ts > 测试函数库 > 测试1
beforeEach beforeEach
afterEach afterEach

stdout | src/utils/sum.spec.ts > 测试函数库 > 测试2
beforeEach beforeEach
afterEach afterEach

stdout | src/utils/sum.spec.ts > 测试函数库
beforeAll beforeAll
afterAll afterAll
```

如果有异步操作，可以用`async/await`

```ts
beforeEach(async () => {
  // 等待beforeEach里面异步结束才执行 '测试1' 的test
  await sleep();
});
test('测试1', () => {});
```

