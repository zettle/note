# 014-watch和watchEffect


## 1、watch
格式: `watch( source, cb, [options] )`

options支持配置和vue2的watch一样，immediate（立即触发回调函数）、deep（深度监听）

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


### 1.4 停止监听
`watch()`返回一个函数，称为stop函数，当想要停止监听的就执行下该函数
```js
const stop = watch(...);

function cancel () {
    stop(); // 取消监听，取消后就不会触发
}
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


