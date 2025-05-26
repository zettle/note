# document对象

### document对象的获取

document对象并不能直接获取，而是通过其他API的入参得到，大概有下面几种

- 通过 `vscode.window.activeTextEditor` 获取，其下有个 `document` 对象，即 `vscode.window.activeTextEditor.document`

```ts
vscode.commands.registerCommand('命令id', () => {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection; // 获取选中范围
  const selectedText = editor.document.getText(selection); // 获取选中文本
});
```

### document对象拥有的APi

##### 1.获取文档内容：`document.getText(<范围>)`

`document.getText()` 如果不传递参数，获取的是整个文档的内容。也可以传入范围获取指定区域内容

```ts
const edit = new vscode.WorkspaceEdit();
const lineNumber = editor.selection.active.line;
// 获取当前行上下文
const range = new vscode.Range(
  new vscode.Position(Math.max(0, lineNumber - 3), 0), // 前3行
  new vscode.Position(lineNumber + 3, 1000)           // 后3行
);
document.getText(range);
```





