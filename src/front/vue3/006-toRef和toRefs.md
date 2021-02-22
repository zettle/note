# 006-toRef和toRefs

这章涉及api: `toRef()/toRefs()`


## 1、toRef()
`toRef(参数a, 字段B)` 返回一个`ObjectRefImpl{}`类型，该类型能不能引起html更新，取决于参数a是什么类型，如果参数a能引起html更新，那么这个`ObjectRefImpl{}`也可以

先来看一个简单的demo
```js
const obj = { age: 1 };
const data = ref(obj.age);
function change() {
    data.value = 100; // html会更新，但不影响原来obj的值
    console.log(obj); // {age:1}
    console.log(data);
}
```
> 上面的`const data = ref(obj.age)`，相当于拿的是`obj.age=1`是一个数值，所以改变data的值不会影响到原来的


`toRef(obj, key)`可以将obj的某个属性转为ObjectRefImpl类型，修改该类型不会引起html更新
```js
const obj = { age: 1 };
const data = toRef(obj, 'age'); // ObjectRefImpl{} 类型
function change() {
    data.value = 100; // 不会引起html更新，js内存的会变
    console.log(obj); // {age:100}
    console.log(data); // ObjectRefImpl{age:100}
}
```

如果传入`toRef()`的是一个reactive对象，那么更新就会引起html更新了
```js
const obj = reactive({ age: 1 });
const data = toRef(obj, 'age'); // ObjectRefImpl{} 类型
function change() {
    data.value = 100; // 引起html更新
}
```

> 总的说: `toRef()`会不会引起html的更新，要看传入的是什么类型，因为`toRef()`本质上是引用了传入参数A的内存地址，如果参数A改变会引起html更新，那么`toRef()`也会引起html更新



## 2、toRefs()

`toRef()`只能将一个对象的某个属性转为响应式，即仅仅支持`toRef(obj, key)`2个参数。

如果想要将obj的所有属性转为响应式，则需要`toRefs()`

```js
const obj = reactive({ age: 1, name:'xiaoming' });
toRefs(obj); // { age: ObjectRefImpl{}, name:ObjectRefImpl{} }
```

一般我们将其和reactive和扩展符一起使用，简化html的书写
```js
const obj = reactive({ age: 1 });
const data = toRefs(obj);

return {
    ...toRefs(obj)
}
```
