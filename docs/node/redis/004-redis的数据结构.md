# 004-redis的数据结构

## 1、redist所支持的几种类型
redis是以keyValue键值对的形式存在的，其中key为字符串，value支持下面5中数据类型
1. 字符串 - string
2. 哈希类型 - hash
3. 列表类型 - list
4. 集合类型 - set
5. 有序集合类型 - sortedset


## 2、通用命令
1. `keys *`: 查询所有的键
2. `type <key>`： 获取键对应的value的类型
3. `del <key>`：删除指定的key value
4. `flushall`: 删除整个redis的数据
5. `expire <key> <second>`: 设置key的过期时间是second秒，即second秒后自动删除
