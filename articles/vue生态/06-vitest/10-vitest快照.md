# vitest的快照

## 什么是快照

使用快照可以方便的为我们第1次跑测试的时候生成好预期的值。

比如下面的测试中，我们需要人工想好`toBe()`的预期值

```ts
  function say (name: string) {
    return 'hello' + name;
  }

expect(say('xx')).toBe('helloxx'); // helloxx helloyy 是靠人想出来的预期值
expect(say('yy')).toBe('helloyy');
```

而使用快照后，我们就可以不写预期值了

```ts
expect(say('xx')).toMatchInlineSnapshot();
expect(say('yy')).toMatchInlineSnapshot();
```

然后我们跑单测 `npx vitest` 的时候，vitest会自动根据函数的运行结果生成预期值

```ts
expect(say('xx')).toMatchInlineSnapshot(`"helloxx"`); // 这里的 helloxx 和 helloyy 是vitest跑完填充进去的
expect(say('yy')).toMatchInlineSnapshot(`"helloyy"`);
```

之后我们提交代码到git，下次其他人跑的时候，就会跑是否匹配中 `helloxx/helloyy`

而之后我们可能修改业务代码，改了原来的返回值，比如后来 `say()` 改为了下面代码

```ts
function say (name: string) {
  return 'hello' + name + '我是新人'; // 修改了返回值
}
```

再去跑单测 `npx vitest` 的时候，vitest就会出现下面提示

```text
Expected: ""helloxx""
Received: ""helloxx我是新人""

 ❯ sum.spec.ts:10:23
      8|   test('测试1', () => {
     10|     expect(say('xx')).toMatchInlineSnapshot(`"helloxx"`);
       |                       ^
     11|     expect(say('yy')).toMatchInlineSnapshot(`"helloyy"`);
     12|   })
     
 FAIL  Tests failed. Watching for file changes...
       press u to update snapshot, press h to show help
```

意思是现在快照的单测跑失败，如果需要更新快照的预期值，按键盘的 `u` 键，如果我们按了，测试代码就会变成下面的

```ts
expect(say('xx')).toMatchInlineSnapshot(`"helloxx我是新人"`);
expect(say('yy')).toMatchInlineSnapshot(`"helloyy我是新人"`);
```

## 快照的API

* `toMatchInlineSnapshot()`：vitest会在当前这个函数的 `()` 内生成预期值，比如上面的

```ts
expect(say('xx')).toMatchInlineSnapshot();
// ====》 快照之后，预期值在括号内
expect(say('xx')).toMatchInlineSnapshot(`"helloxx我是新人"`);
```

* `toMatchSnapshot()`：vitest会创建一个 `__snapshots__/xx.snap` 的文件，预期值放在这里面

```ts
// sum.spec.ts文件
expect(say('xx')).toMatchSnapshot();
```

```text
├── sum.spec.ts
├── sum.ts
└── __snapshots__
    ├── sum.spec.ts.snap  // vitest自动生成的，内容如下
```

```ts
// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`整体 > 测试1 1`] = `"helloxx我是新人"`;
```

