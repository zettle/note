# 003-process


## 1、process.argv
`process.argv`可以获取命令行的参数

在cmd执行`node .\app.js xiaoming age=23`，将得到下面数据
```js
[
  'C:\\nodejs\\node.exe',
  'E:\\workspace\\node-learn\\app.js',
  'xiaoming',
  'age=23'
]
```
可见`process.argv`是一个数组
* 数组第1个元素是执行这个js的命令，这里是用node执行的，所以第1个参数是node的路径
* 数组第2个元素是这个js的路径
* 数组第3个元素之后就是cmd命令的参数

