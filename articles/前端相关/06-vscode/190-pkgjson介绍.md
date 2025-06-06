# package.json介绍

## 相对完整的package.json

整个 `package.json` 配置介绍可见[官网](https://code.visualstudio.com/api/references/extension-manifest)



## 字段介绍

### name / displayName

`name`有比较严格的格式要求：不能有空格、只能小写。因为 `name` 有比较高的格式要求。因此才有 `displayName`，这个没什么格式要求

会展示在插件的name属性，即下图位置，如果 `displayName` 没有定义就会取 `name`

![image-20250121161126833](img/image-20250121161126833.png)



## description

`description`可以对插件进一步的进行描述，所写的文案将展示在下面位置

![image-20250121161412642](img/image-20250121161412642.png)

## keywords 和 categories

`keywords`是一个数组，最多5个关键词，所用文案主要用来在插件市场搜索用，没什么格式要求

`categories`是一个数组，只要用在插件市场分类的时候用到，[可选值](https://code.visualstudio.com/api/references/extension-manifest)：`[Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs, Data Science, Machine Learning, Visualization, Notebooks, Education, Testing]`

```json
{
  "keywords": ["vscode", "plugin", "demo"],
  "categories": ["Other"]
}
```

会展示在插件的下面位置：

![image-20250430152000969](img/190-pkgjson介绍/image-20250430152000969.png)

## publisher

`publisher`插件的发布者，该字段将展示在下面位置

![image-20250121161657423](img/image-20250121161657423.png)

## icon

png格式，要求至少 `128x128` 像素，将展示下面位置

![image-20250121162050162](img/image-20250121162050162.png)

## activationEvents 和 contributes

`activationEvents` 和 `contributes` 是整个vscode的核心。

### 1.activationEvents配置

支持一下配置：

* `onLanguage:$`：
* `onCommand:$`：
* `onDebug`：
* `workspaceContains:$`：当用户打开的工作区含有某个文件的时候激活该插件

比如用户安装了我们的插件后，当打开的项目中有 `.vscode/my-es-settings.yaml` 的之后，我们的插件就激活起来，那么就可以这么配置

```json
{
  "activationEvents": [
		"workspaceContains:./.vscode/my-es-settings.yaml"
	]
}
```

若配置为 `"workspaceContains:**/.vscode/my-es-settings.yaml"`，则会在工作区的任意 `.vscode` 子目录中匹配该文件。

若配置为 `"workspaceContains:my-es-settings.yaml"`，则工作区中任何位置的 `my-es-settings` 文件都会触发激活。

* `onFileSystem:$`：
* `onView:$`：
* `onUri`：
* `onStartupFinished`：当vscode启动之后，自动激活我们的插件

默认情况下，vscode是当我们在命令控制台输入之后才激活我们的插件，而有时候我们想要让vscode在启动的时候就激活，就可以配置成这个

```ts
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "jrdk" is now active!'); // 默认情况下是敲了命令之后才有这个
}
```
而配置了下面之后，就会在vscode启动的时候执行上面log
```json
{
  "activationEvents": [
    "onStartupFinished"
  ]
}
```

* `*`：*号表示，所有功能都会在vscode启动的时候激活，但vscode不推荐配置成这个，需要什么才配置

### 2.contributes配置

`contributes` 整个配置最多的地方，支持下面配置，[官方文档](https://code.visualstudio.com/api/references/contribution-points)

* `contributes.configuration`：该插件能有哪些配置项，可以通过vscode的settings进行配置
* `contributes.commands`：命令信息，是一个数组，每一个元素支持下面配置
  * `command`：命令id
  * `title`：命令的标题
  * `category`：命令的分类，会展示在命令面板以 `<category>: <title>` 方式展示
* `contributes.keybindings`：快捷键绑定
* `contributes.menus`：配置菜单
  * `editor/context`：中间代码编辑区域的右键菜单
  * `editor/title`：中间代码编辑器区域右上角的菜单，不配置图片就展示文字，配了图片就展示图片
  * `editor/title/context`：中间代码编辑器标题的右键菜单
  * `explorer/context`：资源管理器右键菜单
* `contributes.snippets`：代码片段
* `contributes.viewsContainers`：新的activitybar图标，也就是左侧侧边栏大的图标

![image-20250516100024858](img/190-pkgjson介绍/image-20250516100024858.png)

* `contributes.views`：自定义侧边栏内view的实现
* `contributes.iconThemes`：图标主题
* `contributes.languages`：新语言支持
* `contributes.debuggers`：调试
* `contributes.breakpoints`：断点
* `contributes.grammars`：
* `contributes.themes`：主题
* `contributes.jsonValidation`：自定义JSON校验
* `contributes.problemMatchers`
* `contributes.problemPatterns`
* `contributes.taskDefinitions`
* `contributes.colors`

```json




```



