# 同时展示代码和demo

安装：`pnpm add vite-plugin-vitepress-demo`

修改 `/docs/vite.config.ts`

```ts
import VitePluginVitepressDemo from 'vite-plugin-vitepress-demo'

export default defineConfig({
  plugins: [VitePluginVitepressDemo({ glob: './**/demo/**/*.{vue,jsx,tsx,js,ts}' })],
})
```

修改 `/docs/.vitepress/theme/index.ts`

```ts
import { Component } from 'vue'
import { type EnhanceAppContext, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { AntdTheme } from '@pzy915/vite-plugin-vitepress-demo/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', AntdTheme)
  },
} as Theme
```

## 使用

在任何需要展示组件的地方，只需要写

```vue
<demo src="./demo/demo.vue" title="演示" desc="简单的例子"></demo>
```

如果不想展示demo，只想要展示源码，只需要加`raw`属性即可

```vue
<demo raw src="./demo/demo.vue" title="演示" desc="简单的例子"></demo>
```
