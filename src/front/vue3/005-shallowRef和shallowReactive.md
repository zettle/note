# 005-shallowRef和shallowReactive

这章涉及api: `shallowReactive()/shallowRef()/triggerRef()`

跟vue2一样，vue3会对每一层都进行响应式监听，即每一层都是Proxy，但是也是比较消耗性能
```js
const data = reactive({
    a: {
        b: {
            c: 1
        }
    }
});
console.log(data); // Proxy{}对象
console.log(data.a); // Proxy{}对象
console.log(data.a.b); // Proxy{}对象
```

## 1、shallowReactive()
`shallowReactive()`声明的就只会在第1层加上监听
```js
const data = shallowReactive({
    a: {
        b: {
            c: 1
        }
    }
});
console.log(data);  // Proxy{}对象
console.log(data.a); // 普通JSON对象
// 修改 data.a 会引起html更新
// 吸怪 data.a.b 不会引起html更新
```
如果声明的是一个数组，则修改数组下面会引起html更新
```js
const data = shallowReactive([1, 2, 3, 4]);
data[1] = 'a'; // 引起html更新
```


## 2、shallowRef()
`shallowRef()`监听的是`.value`的变化
```js
const data = shallowRef({
    a: {
        b: {
            c: 1
        }
    }
});
console.log(data);   // RefImpl{}对象
console.log(data.value); // 普通JSON对象
// 修改 data.value 会引起界面变化
// 修改 data.value.a 不会引起界面变化
```
如果`shallowRef()`声明的是一个数组也是如此，只有`.value`会更新html
```js
const data = shallowRef([1, 2, 3]);
data.value='a' // 引起html更新
data.value[0]='a' // 不引起html更新
```

## 3、 triggerRef()
从`shallowRef()`的特性我们知道，如果修改的非`.value`层的变化是不会引起html更新的。

但vue3提供了一个api可以让我们在更新数据后，自己手动更新html
```js
const data = shallowRef({
    a: {
        b: {
            c: 1
        }
    }
});
function change () {
    data.value.a.b = 1;
    triggerRef(data); // 手动触发更新，vue会更新data的最新值去更新html
}
```

> vue3只提供了`triggerRef()`但没有提供`triggerReactive()`，说以如果是`shallowReactive()`声明的对象是无法实现这种功能

