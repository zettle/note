# vite-plugin-checker插件

vite默认不会在开发环境的时候检查ts、eslint等语法错误，如果想要在浏览器开发的时候就展示出来（像webpack那种效果）

那么可以使用[vite-plugin-checker](https://vite-plugin-checker.netlify.app/)

## 使用

安装：`pnpm i -D vite-plugin-checker`

配置`vite.config.ts`

```ts
export default {
  plugins: [
    checker({
      vueTsc: {
        tsconfigPath: 'tsconfig.app.json',
      },
      typescript: {
        tsconfigPath: 'tsconfig.app.json',
      },
    }),
  ]
}
```

其中`tsconfigPath` 默认是`tsconfig.json`，但是我们的``tsconfig.json`内容如下：

```json
{
    "files": [],
    "references": [
        {
            "path": "./tsconfig.node.json"
        },
        {
            "path": "./tsconfig.app.json"
        }
    ]
}
```

试过好像（目前版本 `"vite-plugin-checker": "^0.8.0"` ）不支持`references`，因此需要改配置为

```ts
{
  tsconfigPath: 'tsconfig.app.json',
}
```

