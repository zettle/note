# 010-nginx错误日志

nginx的错误日志管理，是核心功能模块`ngx_core_module`

配置格式: `error_log [filePath] [level]`

其中level级别支持这几种 `debug|info|notice|warn|error|crit|alert|emerg`，级别越高记录信息越少，记录信息最高的是debug级别，但带来的IO消耗也是最大

一般场景用`warn|error|crit`其中一种就够了

在main区块中全局配置，也可以放在不同的虚拟主机中单独配置，可以放在下面的标签里面，权重是越近的越重
```
main -> http -> server -> location # 越后权重越高
```

