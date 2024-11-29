# @vue/test-utils

[@vue/test-utils](https://test-utils.vuejs.org/)是一个用来专门测试vue组件的工具，提供了一系列工具方法

# 基本使用

安装：`pnpm i -D @vue/test-utils`

配置 `vitest.config.ts` 内容如下：

```ts
defineConfig({
    test: {
      environment: 'jsdom', // 也可以使用happy-dom之类
      globals: true
    },
})
```

现有 `Hello.vue` 组件

```vue
<template>
    <div>{{msg}}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
defineOptions({
    name: 'Hello'
});
const msg = ref('hello');
</script>
```

可以写单测

```ts
import { mount } from "@vue/test-utils";
import Hello from './hello.vue';

describe('测试Hello组件', () => {
  test('正常渲染', () => {
    const warp = mount(Hello);
    console.log("🚀 ~ test ~ warp:", warp)
  })
});
```

