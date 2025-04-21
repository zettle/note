# reactive-vscode

[官网](https://kermanx.com/reactive-vscode/)，可以用hook方式开发vscode插件

### 创建项目

执行 `pnpm create reactive-vscode`，根据需要填写信息

```text
√ What's the display name of your extension? (会作为 package.json 的 displayName 属性)
√ What's the package name of your extension? (会作为 package.json 的 name 属性)
√ What's your publisher name? (会作为 package.json 的 publisher 属性)
√ Which directory do you want to scaffold the project in? (会作为项目的文件夹名)
```

本地开发的时候，执行 `pnpm dev`，修改 `.vscode/launch.json`，加下面配置

```json
{
  "configurations": [
    {
      // ...
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--disable-extensions" // 加上这个
      ]
    }
  ]
}
```

### 定义扩展插件

```ts
import { defineExtension } from 'reactive-vscode'
const { activate, deactivate } = defineExtension(() => {
  // Your extension code here
})
export { activate, deactivate }
```

