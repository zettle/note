# 007-never和void的区别

never一般用在下面的场景
* 无限循环
* 抛出异常
```ts
function loop (): never {
    while (true) {
        // 无限循环
    }
}

function loop (): never {
    throw new Error("haha");
}
```


void可以理解为返回的类型为空