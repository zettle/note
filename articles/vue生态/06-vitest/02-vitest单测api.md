# 单测api

- `describe`：这个函数接受一个名字和一个函数，用于将相关的测试组合在一起。当你为一个有多个测试点（如逻辑和外观）的组件编写测试时，它就会很方便。`describe`可以再嵌套`describe`
- `test/it`：这个函数代表被测试的实际代码块。它接受一个字符串，通常是测试案例的名称或描述（例如，渲染成功的正确样式）和另一个函数，所有的检查和测试在这里进行。
- `expect`： 这个函数用于测试值或创建断言。它接受一个预期为实际值（字符串、数字、对象等）的参数**x**，并使用任何支持的方法对其进行评估（例如`toEqual(y)`，检查 x 是否与 y 相同）。

```ts
describe("notification.vue", () => {
  test('测试内容11', () => {});
  test('测试内容22', () => {});
  test.skip('测试内容33', () => {}); // 跳过
  test.only('测试内容44', () => {}); // 只执行这里的单测，其他都走开
});
```

## test/it

第2个参数支持设置超时时间

```ts
test('name', async () => { ... }, 1000); // 设置1s超时时间，默认是5s
```

### 1. `test.skip()` 跳过改单测

想要跳过，可以使用`test.skip / it.skip` 来设置。

### 2. `test.only()` 跳过其他，只执行only这些

设置`test.only/ it.only` 则跳过其他，只执行这里的。

### 3.`test.concurrent()` 并行执行单词

设置 `test.concurrent()` 则是并行

比如`test.concurrent()` 并行单测，比如代码如下：

```ts
it('11', async () => {});
it('22', async () => {});
it('33', async () => {});
// 上面是执行完 11的异步 再执行 22的异步 ，接着再执行 33的异步
```

如果改为下面

```ts
it('11', async () => {});
it.concurrent('22', async () => {});
it.concurrent('33', async () => {});
// 上面的执行完11的异步，接着并行执行22和33的
```

### 4. `test.todo()` 标记待完成

设置 `test.todo()` 之后，会跳过这个单测，并且在控制台展示还有待完成的数量。

### 5.`test.fails()` 标记为失败

设置 `test.todo()` 之后，vitest会直接认为这个是失败的

### 6. `test.each()` 遍历使用不同情况进行单测

```ts
// 给each一个二维数组
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('遍历', (a, b, expected) => {
  expect(a + b).toBe(expected)
});

// 给each一个对象数组
test.each([
  {name:'xx', age: 2},
  {name:'yy', age: 3}
])('遍历', ({name, age}) => {
  console.log(name, age)
});
```

在 `test.each()` 中的单测名称，可以按照测试参数的顺序，在测试名称插入符合[printf格式](https://nodejs.org/api/util.html#util_util_format_format_args)的参数

- `%s`：字符串
- `%d`：数值
- `%i`：整数
- `%f`：小数
- `%j`：json格式
- `%o`：对象
- `%#`：对应的测试参数下标
- `%%`：单个百分比符号 (‘%’)

```ts
test.each([
  ['plain', 'is-plain'],
  ['round', 'is-round'],
  ['circle', 'is-circle'],
  ['disabled', 'is-disabled'],
  ['loading', 'is-loading'],
])('props的 %s 被正确渲染为 %s', (a, b, expected) => {});
```

上面单测名中的 `%s` 将被替换为遍历出来的变量，所以在控制台中可以看出下面文案：

```ts
✓ props的 plain 被正确渲染为 is-plain
✓ props的 round 被正确渲染为 is-round
✓ props的 circle 被正确渲染为 is-circle
✓ props的 disabled 被正确渲染为 is-disabled
✓ props的 loading 被正确渲染为 is-loading
```

