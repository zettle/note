# 008-redis之set类型

不允许重复元素，无序

## 1、存储
语法: `sadd <key> <value>`
```shell
sadd mySet a 
sadd mySet a // 已经存在不能再添加
```



## 2、获取
语法: `smembers <key>` 获取key的内容
```shell
smembers mySet
```



## 3、删除
语法: `srem <key> <value>` 删除key的value值
```shell
srem mySet a
```