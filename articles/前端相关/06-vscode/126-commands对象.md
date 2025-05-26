# commands对象

`vscode.commands` 提供了很多用来处理vscode命令的方法

### 注册指令

`vscode.commands.registerCommand(<命令id>, <回调函数>)`：用来注册一个新的命令

```js
context.subscriptions.push(vscode.commands.registerCommand('my.hello', (uri) => {
		vscode.window.showInformationMessage('Hello World');
}))
```

##### 注册与文本编辑器交互的指令

如果我们要注册一个与vscode文本编辑器交互的命令，可以用 `vscode.commands.registerTextEditorCommand()`，这个比起 `vscode.commands.registerCommand()` 更叫友好

| 特性                     | registerTextEditorCommand      | registerCommand                 |
| :----------------------- | :----------------------------- | :------------------------------ |
| 编辑器实例获取方式       | 自动传递                       | 需手动获取 (`activeTextEditor`) |
| 是否自动校验编辑器存在性 | ✅ 自动确保有效编辑器上下文     | ❌ 需要手动校验                  |
| 文本编辑方式             | 通过 `TextEditorEdit` 批量操作 | 通过 `editBuilder` 逐个操作     |
| 撤销堆栈支持             | 单次操作可整体撤销             | 多次操作需合并                  |

比如现在我们想要在光标位置加入当前时间，如果使用普通注册命令的 `vscode.commands.registerCommand()`

```ts
vscode.commands.registerCommand('my-hello', () => {
  const editor = vscode.window.activeTextEditor; // 1.获取当前激活的编辑器对象editor
  if (!editor) {
    vscode.window.showErrorMessage('没有活动的编辑器!');
    return;
  }

  const timestamp = new Date().toLocaleString();
  editor.edit((editBuilder) => {   // 2.开始编辑器编辑操作，得到编辑构建器editBuilder
    editBuilder.insert(editor.selection.active, `[${timestamp}] `); // 3.在光标当前位置插入时间戳
  });
});
```

如果换成 `vscode.commands.registerTextEditorCommand()`，代码如下，简介很多:

```ts
vscode.commands.registerTextEditorCommand('my-hello', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
  const timestamp = new Date().toLocaleString();
  edit.insert(textEditor.selection.active, `[${timestamp}] `);
});
```

## 获取所有指令

`vscode.commands.getCommands()`：返回vscode所拥有的所有命名，返回的是一个Promise

```js
vscode.commands.getCommands().then((commands) => {
	  console.log(commands);
});
```

## 执行指令

`vscode.commands.executeCommand(<命令ID>, <参数1>, <参数2>)`：用于执行其他的命令

```js
vscode.commands.executeCommand('vscode.open', <参数1, 参数2>);
```

