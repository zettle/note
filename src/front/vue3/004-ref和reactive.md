# 004-ref和reactive

这章涉及api: `ref()/reactive()/isReactive()/isRef()/unref()`

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


## 2、ref获取遍历数组的DOM
```js
// html部分
<ul>
    <li
        v-for="(item, $i) of stuList"
        :key="item.id"
        :ref="el => {if (el) liDoms[$i]=el }">
        {{item.name}}
    </li>
</ul>

// js部分
export default {
    setup () {
        const stuList = [
            {name:'小明', id: 1},
            {name:'小红', id: 2},
            {name:'小青', id: 3}
        ];
        const liDoms = []; // 也定义一个数组
        onMounted(() => {
            console.log(liDoms); // vfor出来的li会存到这个里面
        });

        return {
            stuList, liDoms
        };
    }
}
```
`:ref="el => {if (el) liDoms[$i]=el }"`的解释: `el`为DOM对象或者子组件，`if (el) liDoms[$i]=el`如果el存在就存到数组里面，而`$i`刚好等于v-for出来的顺序。




## 3、reactive里面含ref
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



## 4、isReactive和isRef
用来判断一个类型是否是reactive类型/ref类型
```js
const data = ref(12);
isRef(data); // true
```



## 5、unref
如果是一个ref，则返回`.value`的值，如果非ref，就返回本身。其效果等同于`isRef(xx) ? xxx.value : xx`

```js
const cname = ref('xiaoming');
unref(cname);
```