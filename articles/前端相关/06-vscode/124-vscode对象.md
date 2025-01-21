# vscode对象

vscode.window对象

##  `vscode.window` 对象

`vscode.window.showInformationMessage()`：可以传递第2/3个参数，这样的弹窗就有按钮，可以通过下面方式获取用户点击了哪个按钮

```ts
const answer = await vscode.window.showInformationMessage('Hello World from VSTodo!', '确定', '取消');
console.log(answer); // 确定/取消
```
