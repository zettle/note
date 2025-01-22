# when语句

通过 `when` 我们可以控制菜单、执行等出现的条件。[官方文档](https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts)

## 支持when的配置

能支持when的，有 `菜单/快捷键`

```json
{
  "contributes": {
      "menus": {
          "editor/title": [{
              "when": "resourceLangId == markdown",
              "command": "markdown.showPreview",
              "group": "navigation"
          }]
      }
  }
}
```



## 常见的when语句

下面几个常用的when语句

* `{ "when": "resourceLangId == markdown" }` 当文件是一个 md 文件的时候才有
* `{ "when": "resourceFilename == test.js" }` 当前打开文件名是`test.js`时
* `{ "when": "editorFocus" }` 当中间代码编辑区有聚焦的时候才有这个菜单
* `{ "when": "editorHasSelection" }` 当中间代码编辑区的代码有被选中的时候
* `{ "when": "editorFocus && resourceLangId == javascript" }`：当代码编辑区域聚焦 & 是js文件的时候才展示
* `{ "when": "isLinux" }` ：`isLinux`、`isMac`、`isWindows` 判断当前操作系统
* `{ "when": "view == someViewId" }`：当前视图ID等于`someViewId`时；
* `{ "when": "" }`：
* `{ "when": "" }`：
* `{ "when": "" }`：

常用的文件类型：`[markdown, javascript]`