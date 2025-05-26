# context上下文

单插件激活之后，会传递 context 上下文对象，里面包含了很多关于当前插件的信息和方法

```ts
import vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log('插件激活===>', context);
}
```

## 方法

**1. 获取某个资源的绝对路径**

每个用户 vscode 安装的路径不一样，我们的资源需要通过vscode提供的 `context.asAbsolutePath()` 去获取绝对路径

比如有下面的目录

```text
my-extension/
├── src/
│   └── extension.ts
└── resources/
    └── haha.png
```

那么我们可以通过

```ts
export function activate(context: vscode.ExtensionContext) {
  context.asAbsolutePath('resources/haha.png'); // e:\workspace\my-reactive-vscode-extenion\resource\haha.png
}
```

我们现在是开发过程，所以上面的路径是我们正在开发vscode插件的目录，如果插件打包后用户安装了，那路径就是用户安装之后的绝对路径。



