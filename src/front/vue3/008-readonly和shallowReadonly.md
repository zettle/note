# 008-readonly和shallowReadonly

这章涉及api: `readonly()/shallowReadonly()`

我们知道，修改一个reactive会引起js和html的更新，但如果被`readonly()`包转一层，那么这个变量就变成了只读属性，修改会报错，html和js都不会更新
```js
const person = reactive({
    a: {
        b: {
            c: 1
        }
    }
});
const personOnly = readonly(person); // 返回也是一个Proxy{}对象
function updatePersonOnlyAge () {
    personOnly.a.b.c += 1; // vue会警告，并且js和html都不会更新
    person.a.b.c += 1; // 通过reactive去修改的，js和html都会正常更新
}
```

`readonly()`会将每一层都设置为只读属性，如果想要只设置第1层的，就使用`shallowReadonly()`

```js
const person2 = reactive({
    a: {
        b: {
            c: 1
        }
    }
});
const personOnly2 = shallowReadonly(person2);
function updatePersonOnly2Age () {
    personOnly2.a = {b:{c:100}}; // a只读，vue会警告，html和js都不会更新
    personOnly2.a.b = 'xiaoming'; // a.b非只读，html和js都会更新
}
```
