# 005-readonlyArray

我们知道，在ts中用readonly来声明一个只读的属性

如果要声明一个只读的数组，可以用`ReadonlyArray<T>`

```ts
let ro: ReadonlyArray<number> = [1, 2, 3, 4]
ro[0] = 123; // 编译报错
ro.push(5); // 编译报错
```