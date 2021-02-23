# 006-toRaw和markRaw

这章涉及api: `toRaw()/markRow()`

这2个Api命名差不多，但含义完全不同，不要混淆

## 1、toRaw()
先来看一题
```js
const obj = {age:1};
const data = reactive(obj); // 将obj传递进去
console.log(data);
function change () {
    obj.age = 100; // 这里修改的是obj的值
    console.log(obj); // {age:100} 跟着改了
    console.log(data); // Proxy{age:100} 跟着改了
}
```
上面js中的`data.obj`虽然改了，**但是html不会更新**。

只有通过包装的reactive变量改变才会引起html的更新

* 如果`toRaw()`传入的是reactive，返回reactive的原始引用
* 如果`toRaw()`传入的是ref，则返回ref本身，如果是`.value`，则返回原始引用类型
```js
const obj = {age:1};
const data = reactive(obj);
console.log(toRaw(data) === obj); // true


const obj = 1;
const data = ref(obj);
console.log(data === toRaw(data)); // true
console.log(1 === toRaw(data.value)); // true
```




## 2、markRaw()
首先来看一个最简单的情况
```js
const obj = { age: 1 };
const data = reactive(obj);
function change () {
    data.age = 100; // js和html都会更新，data.age和obj.age都会改
}
```

`markRaw()`用来包装一个原始类型，一旦被包装了，即使通过reactive改变，也不会引起html更新
```js
const obj = { age: 1 };
const obj2 = markRaw(obj);
const data = reactive(obj);
function change () {
    data.age = 100; // 即使通过reactive改变，js内存值会变，但是html不会更新
}
```
上面已经是通过`data.age`修改值了，html不会更新，但是js内容中`obj/obj2/data`的值改了

因为对象是引用赋值的，所以虽然`markRaw()`返回的是obj2，传入`reactive()`的是obj，但是2者都是同个内存地址
```js
obj === obj2 // true
```

一旦被`markRaw()`包装，`reactive()`返回的不再是Proxy对象了，而是一个原始引用的内存地址
```js
const obj = { age: 1 };
const data = reactive(obj);
console.log(obj === data); // false


const obj = { age: 1 };
const data = reactive(markRaw(obj)); // 不再是一个Proxy{}对象了，是普通JSON对象
console.log(obj === data); // true，说明reactive返回的是原始引用
```

`markRaw()`也可以和`ref()`使用，也是和`reactive()`一样的现象，只是变成了`.value`
```js
const obj = {name:'小智', age:1};
const obj2 = markRaw(obj);
const person = ref(obj); // 还是返回RemImpl{}对象，但是 person.value 不再是一个Proxy{} 对象了
function updatePerson4 () {
    person.value.age += 1; // 只会改js内存
}
```
