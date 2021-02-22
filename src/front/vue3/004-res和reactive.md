# 004-res和reactive

这章涉及api: `ref()/reactive()/isReactive()/isRef()`

ref声明简单类型的，但是ref也是可以声明复杂类型的

reactive声明复杂类型的，比如`JSON对象/数组`，如果硬是用reactive声明简单类型，在ts中会编译报错，js的会在控制台报错。 并且不能是Date等对象


## 1、ref也可声明复杂类型
ref也可以声明复杂类型，比如`JSON对象/数组`，vue会对其判断，发现是`JSON对象/数组`就转为reacitve

```js
const data = ref({ age:1 });
const data2 = reactive({ age: 1 });

console.log(data); // RefImpl{}对象
console.log(data.value); // Proxy{}对象
console.log(data2); // Proxy{}对象
```

在ref对象上，有个私有属性`__v_isRef=true`
```js
const data = ref(12);
console.log(data);
```



## 2、reactive里面含ref
正常`ref()` 声明的变量，要访问/设置的时候，需要加`.value`

但如果这个变量在`reacitve()`里面，就不需要再加`.value`了。并且无论修改哪个，都会引起另外一个改变和html的更新
```js
const age = ref(1);
const person = reactive({
    name: '小青', 
    age // age是一个ref
});

// 通过ref修改的，会引起reactive里面的同步修改，html也都更新
function updateAge () {
    age.value += 1;
}

// 通过reactive修改的，会引起ref里面的同步修改，html也都更新
function updatePerson () {
    person.age += 1;
}
```



## 3、isReactive和isRef
用来判断一个类型是否是reactive类型/ref类型
```js
const data = ref(12);
isRef(data); // true
```