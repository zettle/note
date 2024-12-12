# mount的返回值

`mount()` 返回了一个 `Wrapper` 对象

## 返回

`mount()` 返回了一个 `Wrapper` 对象，拥有很多几个属性方法给我们进行单测。

* `element`：属性可以获取原生的DOM

```ts
const wrapper = mount(HelloWorld)
wrapper.element; // HTML DOM对象
```

借此可以获取DOM上的很多属性了

```ts
warpper.element.type
warpper.element.tagName
```



* `find()/findAll()/get()`：在组件中找到某个DOM

```ts
wrapper.find("button").exists(); // 存在返回true，不存在返回false
```

`get()` 如果没有匹配到DOM，直接断言失败。而 `find()` 则不会，继续跑单测

* `exists()/isVisible()`：一个是判断是否存在DOM，一个是判断是否可见

在vue中有时候我们是通过`v-show`去控制不展示，这种情况通过`get()/find()`依然是可以获取到的，用 `exists()`也始终返回true，这个时候判断就需要使用`isVisible()`

```ts
wrapper.find('#todo-test').exists(); // v-show的也会返回true
wrapper.find('#todo-test').isVisible(); // v-show的会返回false
```

* `text()`：获取DOM内的文本，类似`innerText`属性。返回的是纯文字的，过滤调了html标签

```vue
<div :class="['hello', type]">
  <p class="msg">{{msg}}</p>
  <s>sdf</s>
  <button @click="onClick">点击</button>
</div>
```

单测内容如下：

```ts
const wrapper = mount(Hello, {
  props: {
    type: 'success'
  }
});
console.log('===>', wrapper.text()); // hellosdf点击
```

* `classes(<class名>)`：获取DOM上的 class 属性，是一个数组。如果传入字符串，就会返回boolean类型，表示DOM上是否有这个class。

```ts
expect(wrapper.classes()).toContain('my-span')
expect(wrapper.classes('my-span')).toBe(true)
expect(wrapper.classes('not-existing')).toBe(false)
```

* `emitted()`：能得到组件所有的emit事件

比如现有组件：

```vue
<script>
export default {
  created() {
    this.$emit('greet', 'hello')
    this.$emit('greet', 'goodbye')
  }
}
</script>
```

那么单测可以

```ts
wrapper.emitted()// 得到内容 { greet: [['hello'], ['goodbye']] }

expect(wrapper.emitted()).toHaveProperty('greet');       // 是否有 greet 这个事件
expect(wrapper.emitted().greet).toHaveLength(2);         // 一共有2次 greet 事件
expect(wrapper.emitted().greet[0]).toEqual(['hello']);   // 第1次事件的返回参数是 hello
expect(wrapper.emitted().greet[1]).toEqual(['goodbye']); // 第2次事件的返回参数是 goodbye
```

`emitted()` 也可以接收一个入参，返回的不再是对象，而是指定的事件参数组成的数组

```ts
wrapper.emitted('greet'); // 返回 [['hello'], ['goodbye']]
```

* `setValue()/trigger()`：可以设置表单元素，比如 `input/checkbox` 等的值。而 `submit()` 可以触发 `<form></form>` 的提交动作。

可以直接将 `submit.prevent | submit.stop` 等传给 `trigger()`

```ts
await wrapper.find('form').trigger('submit.prevent'); // 阻止默认行文
```

假如有下面的复杂交互

```vue
<template>
  <input @keydown.meta.c.exact.prevent="captureCopy" v-model="input" />
</template>
```

在单测中，也是可以直接通过 `await wrapper.find(input).trigger('keydown.meta.c.exact.prevent')` 模拟触发。



有时候 `event` 需要一些额外的数据，可以传递第2个参数过去

```vue
<template>
	<input type="text" @blur="handleBlur" />
</template>
<script>
function handleBlur(ev: FocusEvent) {
  console.log(ev.cname)
}
</script>
```

那么单测可以这么写：

```ts
wrapper.find('input').trigger('blur', { cname: 'xiaoming' }); // vtu会将第2个参数的进行合并
```

* `attributes()`：获取DOM上的某个属性，不传参数就返回对象，也可以传参 ``attributes(<name>)` 获取某个属性

比如想要测试 `Button.vue` 上的disabled属性

```vue
<template>
  <button disabled></button>
</template>
```

那么单测可以这么写：

```ts
wrapper.attributes(); // {disabled:''}

// 从上面log看出 {disabled:''} 的value是一个空字符串，那么只要断言有定义就可以
// 因此可以这么写
expect(wrapper.attributes('disabled')).toBeDefined();

// 也可以通过原生html来推断
expect(wrapper.element.disabled).toBeTruthy();
```

* `setProps()`：可以改变props属性值，比如现在有下面的组件

```vue
<template>
  <div v-if="show">{{ age }}</div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    show: boolean
    age: number
  }>(),
  {},
)
</script>
```

单测可以写：

```ts
const wrapper = mount(HelloWorld, {
  props: {
		show: false,
		age: 23,
	},
});
await wrapper.setProps({ show: true }); // 改变props属性
wrapper.html(); // <div>23</div>
```



