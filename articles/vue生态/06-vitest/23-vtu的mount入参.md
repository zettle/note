# utils的mount

`mount()`方法可以渲染某个组件，并因此进入单元测试

## 入参

调用方法：`mount(<组件>, <option>)`

* 第1个参数：要渲染的组件
* 第2个参数：配置信息，支持的配置见：[MountingOptions类型](https://vue-test.nodejs.cn/api/)
  * props：传递给组件哪些props属性
  * data：会重构组件的data数据，将传入的和组件原本的进行合并，只支持optionsApi
  * slots：传递给组件的slots插槽信息
  * global：配置一些全局组件等信息
    * stubs: 数组，将组件中的指定的组件mock掉

具体介绍：

* `props`传递需要给组件传递一些属性的写法

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

* `data` 修改组件数据初始值，比如现在有个组件如下：

```vue
<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      admin: ref(false),
      cname: ref('xiaoming'),
    }
  },
})
</script>

<template>
    <span>{{ cname }}{{ admin }}</span>
</template>
```

我们在单测的时候，可以直接修改data的值

```ts
const wrapper = mount(HelloWorld, {
  data() {
    return {
      admin: true,
    }
  },
})
console.log('wrapper', wrapper.html()); // 结果：xiaomingfalse
```

从上面可以看出来，`admin=true`，而 `cname依旧是xiaoming`

> 好像修改 data() 这种方式经过尝试，如果组件是compoition的写法则无效，目前版本：`vitest ^2.1.5` 和 `@vue/test-utils ^2.4.6`。后续继续观察下。

* `slots`：用来传递插槽，比如有个按钮组件 `Button.vue` 代码如下，按钮内容是通过默认插槽实现：

```vue
<template>
  <button>
    <slot></slot>
  </button>
</template>
```

那么单测中就可以这么写

```ts
const wrapper = mount(Button, {
  slots: {
    default: '提交', // 默认插槽内容
  }
});

// 最终生成的代码: `<button>提交</button>`
```

可以传入一个 vue组件 、vnode节点、字符串

```ts
import { h } from 'vue'
import Header from './Header.vue'
// 以下写法均合法
const wrapper = mount(Layout, {
    slots: {
      header: Header,
      main: h('div', 'Main Content'),
      sidebar: { template: '<div>Sidebar</div>' },
      footer: '<div>Footer</div>'
    }
})
```

也可以传递一个数组，实现多个节点

```ts
const wrapper = mount(Layout, {
  slots: {
		default: [
      '<div id="one">One</div>',
      '<div id="two">Two</div>'
    ]
  }
});
```

* `global.stubs`：能帮我们mock掉一些依赖组件。

比如我们有个组件 `Button.vue` 代码如下，依赖了另外一个 `Icon.vue` 组件

```vue
<template>
  <button>
    <es-icon v-if="loading" name="loading"></es-icon>
    提交
  </button>
</template>
<script lang="ts" setup>
import EsIcon from '../Icon/Icon.vue';
const loading = ref(true);
</script>
```

在单测中，我们其实只关心本组件 `Button` 的单测完成，对于 `Icon` 应该由 `Icon` 的单测去做，不是 `Button` 关心的。

如果我们这么写单测

```ts
const wrapper = mount(Button);
wrapper.html();
```

渲染效果如下：

```html
<button>
  <i>
    <svg>...</svg>
  </i>
  提交
</button>
```

但实际我们只需要管好 `Button.vue` 的逻辑即可

因此可以使用 `global.stubs` 来 mock 掉 `Icon.vue` 的

```ts
const wrapper = mount(Button, {
  global: {
    stubs: ['EsIcon'], // 写 `<template>` 中用到的组件名
  }
});
wrapper.html();
```

渲染结果就变成了：

```html
<button>
  <es-icon-stub name="loading"></es-icon-stub>
  提交
</button>
```

可以看到 vitest 将我们 原本的 `<es-icon>` 替换为 `<es-icon-stub>`。而我们只需要关注传给 `<es-icon-stub>` 的属性对不对即可。

```ts
import Icon from '../../Icon/Icon.vue';

const wrapper = mount(Button, {
  global: {
    stubs: ['EsIcon'],
  }
});

const iconComponent = wrapper.findComponent(Icon); // 这里传入的是一个vue组件
expect(iconComponent.exists()).toBeTruthy()
expect(iconComponent.attributes('name')).toBe('loading'); // 断言 name=loading
```







