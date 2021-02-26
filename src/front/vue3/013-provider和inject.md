# 013-provider

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

