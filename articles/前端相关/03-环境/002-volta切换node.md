# 初步使用

## 1、安装

直接双击安装，安装后的目录`C:\Program Files\Volta`，如果不是可以执行`where volta`查看目录

输入`%LOCALAPPDATA%`，进入用户目录，即在`D:\MyData\huangzt5\AppData\Local\Volta`中新建`hooks.json`，内容如下：

```json
{
    "node": {
        "index": {
            "template": "https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/index.json"
        },
        "distro": {
            "template": "https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/v{{version}}/node-v{{version}}-{{os}}-{{arch}}.zip"
        }
    }
}
```
