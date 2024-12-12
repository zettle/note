# 基础入门

文档索引

> 哪些项目使用了vitest：https://cn.vitest.dev/guide/#%E4%BD%BF%E7%94%A8-vitest-%E7%9A%84%E9%A1%B9%E7%9B%AE
>
> 各种api：https://cn.vitest.dev/api/#test
>
> vitest集成进各个框架的Demo：https://cn.vitest.dev/guide/#%E7%A4%BA%E4%BE%8B 或 https://github.com/vitest-tests/browser-examples/tree/main/examples
>
> 

## 简单使用

vitest完全兼容jest，会jest入门vitest非常快

安装: `pnpm i -D vitest`

比如现在 `sum.ts` 和 `sum.spec.ts` 内容如下

```ts
// sum.ts
export function sum(a: number, b: number) {
  return a + b
}

// sum.spec.ts
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
});
```

执行 `vitest` 即可查看运行结果，并且会启动watch模式。

执行 `vitest run` 只运行一次单测。

执行 `vitest run --coverage`可以生成覆盖率报告。

## vue组件单测

vitest天然支持vue组件，在测试vue组件之前我们需要配置`vite.config.ts`

```ts
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [Vue()]
});
```

比如现在有下面的`Hello.vue`组件

```vue
<template>
    <div>{{msg}}</div>
</template>

<script lang="ts" setup>
const msg = ref('hello');
</script>
```

和对应单测文件 `hello.spec.ts`

```ts
import { test } from 'vitest';
import Hello from './hello.vue';

test('测试Hello', () => {
  console.log(Hello);
})
```

再次执行`vitest run`跑单测，如果遇到下面提示，说文件不存在，是我们没有安装vue依赖，执行下`pnpm i vue`之后即可

```text
 FAIL  src/components/hello.spec.ts [ src/components/hello.spec.ts ]
Error: Failed to load url vue (resolved id: vue) in E:/workspace/vitest-learn/src/components/hello.vue. Does the file exist?
```

## tsx组件单测

如果要测试的组件是tsx，也是天然支持tsx组件。

有`World.tsx`组件如下：

```tsx
import { defineComponent } from 'vue';

export default defineComponent({
  setup () {
    const msg = 'xiaoming';
    return () => (<div>
      <p>{msg}</p>
      <p>333</p>
    </div>)
  }
})
```

可以直接写单测

```ts
import { mount } from "@vue/test-utils";
import World from './world.tsx';

describe('测试world组件', () => {
  test('正常渲染world', () => {
    const wrapper = mount(World);
  });
});
```

## 用tsx写单元测试

在写单测的时候，我们可以直接使用tsx写，无需配置，文件名改为 `xx.{test,spec}.tsx` 即可

这个时候传递给 `mount()` 的第1个参数就可以写成jsx的回调函数

```ts
it('基础Button', () => {
    const handleClick = vi.fn()
    const wrapper = mount(() => (<Button type="primary" onClick={handleClick}></Button>))
    wrapper.find('button').trigger('click');
    expect(handleClick).toHaveBeenCalled();
    expect(1).toBe(1)
});
```

## vitest的配置

### 1、配置文件抽离（推荐）

可以抽离成 `vite.config.ts` 和 `vitest.config.ts`	

修改 `vitest.config.ts` 文件如下：

```ts
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
    },
  }),
)
```

### 2、配置文件不抽离

直接在`vite.config.ts` 加关于vitest的配置

```ts
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    test: {
        // ...
    },
});
```

加上 `<reference types="vitest/config" />` 之后就能得到test的提示

## vitest的命令

```shell
# 可以启动一个在浏览器访问的页面查看单测情况
vitest --ui

# 生成代码覆盖率
vitest run --coverage
```