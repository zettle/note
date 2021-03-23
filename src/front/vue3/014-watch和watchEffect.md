# 014-watch和watchEffect


## 1、watch
格式: `watch( source, cb, [options] )`

options支持配置和vue2的watch一样，immediate（立即触发回调函数）、deep（深度监听）、flush（执行时机）

### 1.1 监听ref

ref可以直接监听
```js
const state = ref(0);
watch(state, (newValue, oldValue) => {
});
function update () {
    state.value++;
}
```


### 1.2 监听reactive
reactive上的某个属性，不能直接监听，需要用回调的方式
```js
const person1 = reactive({name:'小明', age:1});
watch(() => person1.age, (nVal, oVal) => {
    console.log('watch-2', nVal, oVal);
});
```


### 1.3 监听多个值
用数组可以监听多个值，回调的参数也有变化
```js
const person1 = reactive({name:'小明', age:1});
watch([()=>person1.age, ()=>person1.name], ([newAge, oldAge], [newName, oldName])=> {
    console.log('watch-3', newAge, oldAge, newName, oldName);
});
```

也可以用这种写法
```js
watch(() => [person1.age, person1.name], (newArr, oldArr) => {
    console.log('watch-4', newArr, oldArr);
});
```


### 1.4 停止监听
`watch()`返回一个函数，称为stop函数，当想要停止监听的就执行下该函数
```js
const stop = watch(...);

function cancel () {
    stop(); // 取消监听，取消后就不会触发
}
```


### 1.5 onInvalidate
`onInvalidate`函数回作为第3个参数得到，在每次watch之前会被调用，这个和`watchEffect`一样
```js
const count = ref (0);
watch(count, (newVal, oldVal, onInvalidate) => {
    onInvalidate(() => {})
});
```




## 2、watchEffect
`watchEffect()`，里面用到的发生改变就会触发，初始化的时候也会触发1次
```js
const person = reactive({name:'小红', age:1});
function updatePerson2 () {
    person.age += 1;
}
watchEffect(() => {
    const haha = person2.age;
    console.log('haha', haha);
});
```


### 2.1 watchEffect的执行时机flush
flush默认值: `pre`

`watchEffect()`发生在`onBeforeMount/onBeforeUpdate`之前
如果设置`flush:'post'`
```js
watchEffect(() => {}, { flush: 'post' })
```
就可以让`watchEffect()`发生在`onBeforeMount/onBeforeUpdate`之后，`onMounted/onUpdated`之前。

```js
watchEffect(() => {}, { flush: 'sync' });
```
`{flush:'sync'}`即同步触发，和值改变同步进行。这种方式效率低，很少用到

```js
// 当值改变
flush: 'sync';
flush: 'pre'
onBeforeUpdate()
flush: 'post'
onUpdated()
```


### 2.2 onInvalidate参数
`watchEffect((onInvalidate) => {})`中的回调函数接收一个onInvalidate参数

该参数会在触发watch函数之前调用

```js
watchEffect(async (onInvalidate) => {
    const token = await fetch('http://baidu.com');
    
    onInvalidate(() => {
        console.log('执行副作用之前');
        token.close(); // 取消回调
    });
});
```