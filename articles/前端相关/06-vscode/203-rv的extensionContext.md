# rv的extensionContext

扩展上下文可以从 `reactive-vscode` 导入。它是一个全局的 `shallowRef` ，包含 ExtensionContext 对象。

```ts
import { extensionContext } from 'reactive-vscode'

extensionContext.value?.extensionPath; // 得到我们插件的绝对路径，比如 e:\workspace\my-reactive-vscode-extenion
```

