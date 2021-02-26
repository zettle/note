# 010-computed计算属性

这个和vue2没有太大的差距

```js
const person = reactive({
    name: 'xiaomin',
    age: 1,
    doubleAge: computed(() => {
        return person.age * 2;
    })
});
function changeAge() {
    person.age += 1;
}
```


也支持`get/set`，`computed()`返回的是一个ComputedRefImpl类型
```js
const doubleAge = computed({
    get () { return age*2 },
    set (newVal) { age=newVal }
};
doubleAge.value // 要通过value去设置和获取值
```

