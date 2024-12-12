# vite设置全局变量

在vite中可以通过 `define` 给项目设置一些全局变量。修改 `vite.configt.ts`

```ts
export default {
  define: {
    PROD: JSON.stringify(true),
  },
}
```

然后就可以在任何地方使用

```ts
console.log(PROD)
```

在ts中会提示报错，我们需要这么解决下，新建 `env.d.ts`，然后修改 `tsconfig.json`

```json
{
 "include": [
  "env.d.ts" // 加上这个配置
 ]
}
```