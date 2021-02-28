# 010-vue2升级vue3指南

vue3支持vue的optionApi写法，我们可以将项目的vue2升级为vue3，但是下面的内容，是即使使用vue2写法也不支持的


## 1、删除的
* 删除filters过滤器
* 删除 .native 修饰符
* 删除 eventBus 事件总线，要实现的话用第3方库mitt
* 移除函数组件的`functional`官网说已经在v3函数组件性能已经和类组件差不多了，不推荐函数组件，如果还是要写函数组件推荐使用h函数
* 不再要求`<templat>`一定要有个跟节点，类似react的`<fragment>`
* 移除了`Vue.config.keyCodes`，就是说即使使用`app.config.keyCodes`也是不支持的
> 移除这个是因为我们常用的事件`event.keyCode`这个在[MDN已经不推荐了](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)，取代的是`event.key`。vue3的事件修饰符就是`event.key`的短横线写法
```js
// 比如我们想要监听F1键盘，通过js打印得知 ev.key='F1'
// 那么在vue中我们就可以写
<input @keyup.f1='sayHello' />
```

## 2、变动的
* 生命周期: beforeDestroy改为beforeUnmount，destroyed改为unmounted
* v-model和`.sync`统一实现: `props.xxx` 和 `emit('update:xxx')`
* 不再要求`<template />`里面有个根标签
* 以前的`Vue.use()`需改为`app.use()`
* 以前的`Vue.component()`需要改为`app.component()`
* 以前的`Vue.prototype.xxx`需要改为`app.config.globalProperties.xxx`。
* 以前的`Vue.config.errorHandler`需要改为`app.config.errorHandler`
* 以前的`$attrs`和`$listeners`融合为1个`$attrs`
* 以前的异步组件`()=>import('xx.vue')`不支持了，需要用上异步组件`defineAsyncComponent(()=>import('xxx.vue'))`
* vue2中，如果是根节点属性的data可以是JSON，而vue3中，规定data必须是一个函数
* 关于vue2中`is`用法看[](../vue2/004-is属性.html)。而在vue3中，`is`属性只用于`<component>`组件上，如果用在普通html标签或者自定义组件上，`is`会被当做普通的props属性
* 事件不再支持`@keyup.13`，语义化很不好，需要用其别名`@keyup.enter`
* `<transition>`的className改了，由原来的`xx-enter/xx-leave`改为`xx-enter-from/xx-leave-from`，更加语义化



### 2.1 访问app.config.globalProperties属性
以前的`Vue.prototype.xxx`需要改为`app.config.globalProperties.xxx`
```js
const app = createApp(App);
// 以前的Vue.prototype需要替换为下面的
app.config.globalProperties.$http = () => {
    console.log('调用了原型的$http');
};
```

通过`app.config.globalProperties.xxx`挂载到原型链上，如果是optionApi的写法，则通过`this.xxx`访问
```js
methods: {
    clickHandle () {
        this.$http();
    }
}
```

如果是componsitionApi的写法，则通过`getCurrentInstance()`访问
```js
setup () {
    const {ctx} = getCurrentInstance(); // 一定要放在setup里面
    function clickHandle () {
        // getCurrentInstance() 如果放在这里，获取到的是null
        ctx.$http();
    }  
}
```
`app.config.globalProperties`本质是往所有的组件传递一个顶级的props，当组件内定义了一个相同名字的props，这个全局props会被覆盖掉

```js
props: {
    $http: String
}
setup () {
    const {ctx} = getCurrentInstance(); // 一定要放在setup里面
    function clickHandle () {
        ctx.$http; // 这里得到的是父组件传递过来的数据 
    }  
}
```



