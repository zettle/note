# 005-redis之字符串

## 1、存储
语法: `set <key> <value>`
```shell
set name xiaoming
```
如果想要设置存储时间，则使用
```shell
# 设置30s后过期
set name xiaoming EX 30
```


## 2、获取
语法: `get <key>`

```shell
get name
```


## 3、删除
语法: `del <key>`
```shell
del name
```