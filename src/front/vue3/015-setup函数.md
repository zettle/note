# 004-setup函数


## 1、setup的执行时机
执行顺序: `setup -> beforeCreated -> created`

在vue2中，我们知道，到了`created()`组件刚刚被创建好，并且组件的data和methods已经初始化好了

而`setup()`在`beforeCreated()`之前，所以`setup()`中是无法使用`data/methods`

所以vue为了避免我们错误的使用，它直接将`setup()`中的this设置undefined
```js
setup() {
    console.log(this); // undefined
}
```



## 2、setup不能加async
`setup()`只能是同步不能死异步，比如加个`async`之后，界面会出不来
```js
async setup() {}
```


## 3、setup的参数
`setup(props, content)` 
* `props`: 父组件传递来的属性
* `content`: content有下面几个属性
    * `attrs`: 非props属性和非emits的事件
    * `emit`: 相当于vue2的`$emit()`
    * `expose`: 暴露给父组件的方法
    * `props`: props属性
    * `slots`: 父组件传递过来的slot
