# 004-setup函数


## 1、setup的执行时机
执行顺序: `beforeCreated -> setup -> created`

在vue2中，我们知道，到了`created()`组件刚刚被创建好，并且组件的data和methods已经初始化好了

而`setup()`在`created()`之前，所以`setup()`中是无法使用`data/methods`

所以vue为了避免我们错误的使用，它直接将`setup()`中的this设置undefined
```js
setup() {
    console.log(this); // undefined
}
```


`setup()`只能是同步不能死异步，比如加个`async`之后，界面会出不来
```js
async setup() {}
```