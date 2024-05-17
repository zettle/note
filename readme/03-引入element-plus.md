# 引入element-plus

安装： `pnpm i element-plus`

修改 `/docs/.vitepress/theme/index.ts`

```ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
  },
}
```
