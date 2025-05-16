# commands对象

## 注册指令

```js
context.subscriptions.push(vscode.commands.registerCommand('my.hello', (uri) => {
		vscode.window.showInformationMessage('Hello World');
}))
```

## 获取所有指令

```js
vscode.commands.getCommands().then((commands) => {
	  console.log(commands);
});
```

## 执行指令

用于执行其他的命令

```js
vscode.commands.executeCommand('vscode.open', <参数1, 参数2>);
```

