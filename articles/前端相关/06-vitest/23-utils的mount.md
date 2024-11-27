# utils的mount

`mount()`方法可以渲染某个组件，并因此进入单元测试

## 入参

调用方法：`mount(<组件>, <option>)`

* 第1个参数：要渲染的组件
* 第2个参数：配置信息，支持的配置见：[MountingOptions类型](https://vue-test.nodejs.cn/api/)
  * props：传递给组件哪些props属性

```ts
import { mount } from "@vue/test-utils";
import Hello from './hello.vue';

const wrapper = mount(Hello, { 
  props: {
  	type: 'xiaoming'
  }
});
// 上面等价于 <Hello type="xiaoming"></Hello>
```

## 返回

`mount()` 返回了一个 `Wrapper` 对象，拥有下面几个属性方法：

* `find(<标签>)`：在组件中找到某个DOM

```ts
wrapper.find("button")
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
expect(wrapper.emitted()).toHaveProperty('greet')
expect(wrapper.emitted().greet).toHaveLength(2)
expect(wrapper.emitted().greet[0]).toEqual(['hello'])
expect(wrapper.emitted().greet[1]).toEqual(['goodbye'])
```



