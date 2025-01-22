# 自定义definition跳转

在vscode中，我们 `ctrl + 点击` 某个函数/变量的时候，vscode会跳到对应的位置上，这个功能成为 definition跳转

而在开发中，允许我们去自定义这种跳转功能。

## 跳转的示例

使用到 `vscode.languages.registerDefinitionProvider()` 这个API，里面返回一个 `new vscode.Location()` 对象。

`new vscode.Location`接收2个参数，第一个是要跳转到文件的路径，第二个是跳转之后光标所在位置，接收`Range`或者`Position`对象，`Position`对象的初始化接收2个参数，行`row`和列`col

```ts
context.subscriptions.push(
  vscode.languages.registerDefinitionProvider(["json"], {
    /**
     * document: Document对象，里面很多方法
     * position: 点击单词的位置
     */
    provideDefinition(document, position, token) {
      const destPath = "/";
      return new vscode.Location(
        vscode.Uri.file(destPath),
        new vscode.Position(0, 0)
      );
    },
  })
);
```

然后需要在 `package.json` 中 `activationEvents` 声明一下，这样vscode启动的时候才会自动去执行

```json
{
  "activationEvents": [
    "onLanguage:json"
  ]
}
```

比如我们熟知的 `package.json` 中的 `devDependencies | dependencies` ，我们可以开发一个插件，实现当点击 `ctrl + 点击` 一个npm名的时候，自动跳到 node_modules 中该包的位置。

代码如下：

```ts
import * as vscode from "vscode";
import {existsSync} from "fs";
import { dirname } from "path";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(["json"], {
      provideDefinition(document, position, token) {
        const fileName = document.fileName; // 文件路径
        const workDir = dirname(fileName); // 文件目录
        const word = document.getText(
          document.getWordRangeAtPosition(position)
        ); // 点击的单词
        const line = document.lineAt(position);
        const projectPath = vscode.workspace.workspaceFolders?.[0]; // 项目跟目录

        // 只处理package.json文件
        if (/package\.json$/.test(fileName)) {
          const json = document.getText(); // 整个package.json的内容
					// word.replace(/\//g,"\\/") 将 jquery 改为 jquery
          if (
            new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g,"\\/")}[\\s\\S]*?\\}`,"gm").test(json)
          ) {
						// 在node_modules中的路径
            let destPath = `${workDir}/node_modules/${word.replace(/"/g,"")}/package.json`;
            if (existsSync(destPath)) {
              // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
              return new vscode.Location(
                vscode.Uri.file(destPath),
                new vscode.Position(0, 0)
              );
            }
          }
        }
      },
    })
  );
}

export function deactivate() {}
```



