#  vtu的双向数据绑定

在 vtu 中的双向数据绑定

## 原生html标签

如果是原生的 `input/checkbox` 等标签，可以直接使用 `setValue` 设置值

```vue
<template>
  <input data-test="new-todo" v-model="newTodo" />
</template>
```

单测中可以直接用 `setValue` 这么写：

```ts
await wrapper.get('[data-test="new-todo"]').setValue('我是mock数据');
```

如果是 `OPTION`、`CHECKBOX` 或 `RADIO` 输入的参数传递给 `setValue`，它们将设置为 `checked`

```vue
<template>
  <input type="radio" value="weekly" v-model="form.interval" />
  <input type="radio" value="monthly" v-model="form.interval" />
</template>
```

```ts
await wrapper.find('input[type=radio][value=monthly]').setValue(); // 让monthly选中
```

## 第3方库

我们使用一些第3方组件库开发，比如element-plus的时候，则需要使用下面的单测方式

比如现在有页面如下：

```vue
<template>
  <el-form @submit.prevent="handleSubmit">
    <el-input v-model="description" ref="descriptionRef" />
    <button type="submit">Send</button>
  </el-form>
</template>
```

我们不需要去了解 `<el-input>` 内部代码结构，直接mock掉。然后通过 `findCompoent()` 找到对应的 `<el-input>` 组件，调用 `setValue` 方法。

我们可以这么写单测：

```ts
const wrapper = mount(HelloWorld, {
  global: {
    stubs: ['el-input'],
  },
})
await wrapper.findComponent({ ref: 'descriptionRef' }).setValue('xiaoming')
```

## 在 jsx中使用双向数据绑定

如果我们是使用jsx来写单测，因为jsx中是没有 `v-model` 的，因此需要我们拆开写

```tsx
const activeNames = ref(['a'])
function onInput(newActiveNames: string[]) {
  activeNames.value = newActiveNames
}

// 需要使用 modelValue 和 onUpdate:modelValue
// 并且 `modelValue={activeNames.value}` 中的 `.value`不能省略
mount(() => (
  <Collapse modelValue={activeNames.value} onUpdate:modelValue={onInput} onChange={onChange}>
    <CollapseItem name="a" title="title a">
      content a
    </CollapseItem>
    <CollapseItem name="b" title="title b">
      content b
    </CollapseItem>
  </Collapse>
))
```

