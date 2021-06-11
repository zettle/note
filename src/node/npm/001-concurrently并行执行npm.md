# 001-concurrently并行执行npm

当然我们可以启动2个cmd窗口分别执行2个命令。下面介绍一个窗口并行执行npm的方法。

借用工具`concurrently`

安装: `npm i -D concurrently`

修改package.json的脚本，添加下面几个命令
```json
{
    "start": "nodemon --watch \"./src\" --ext \"ts, json, js\" --exec \"npm run dev\"",
    "serve": "nodemon --watch \"./source-web\" ./source-web/bin/www",
    "local": "concurrently \"npm run serve\" \"npm run start\""
}
```
这样，一个cmd窗口就会同时执行`npm run serve` 和 `npm run start`

另外还可以简写成下面的
```json
{
    "loc:ts": "nodemon --watch \"./src\" --ext \"ts, json, js\" --exec \"npm run dev\"",
    "loc:serve": "nodemon --watch \"./source-web\" ./source-web/bin/www",
    "loc": "concurrently \"npm:loc:*\""
}
```
`concurrently "npm:loc:*"` 会自动执行说有`loc:*`的npm命令
