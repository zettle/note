# 013-provider和inject

vue3中使用`provide/inject`通讯

在父组件`provide(<keyName>, <data>)`

```js
const stu2 = reactive({name:'xiaohong', age:1});
provide('stu2', stu2);
```

在父组件`inject(<keyName>)`即可
```js
const person2 = inject('stu2');
```


## 1、provider/inject特点
由`provider/inject`，父组件提供给子组件的数据，如果子组件修改了也会同样影响到父组件。

一般我们不建议这么做，父组件提供数据，那就应该由父组件去修改这些数据，正确做法是父组件再`provider/inject`一个事件给子组件，子组件去触发这个事件

```js
// 父组件
const stu2 = reactive({name:'xiaohong', age:1});
provide('stu2', readonly(stu2)); // 用readonly包装一层，子组件就无法修改了
provide('changeStu', (info) => { // 提供修改的方式给子组件
    console.log('info', info);
});
// 子组件
const person2 = inject('stu2');
const changeStu = inject('changeStu');
const update = () => {
    changeStu(100); // 调用父组件提供过来的方式
}
```