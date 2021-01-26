# 098-docker实战-mysql


## 1、mysql 5.7
这里以`mysql 5.7`为例子
### 1.1 启动mysql 5.7镜像
```shell
docker run -p 3607:3306 \
    --name mysql5.7 \
    -di \
    -v /apps/docker-mysql-bak/conf:/etc/mysql \
    -v /apps/docker-mysql-bak/log:/var/log/mysql \
    -v /apps/docker-mysql-bak/data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    mysql:5.7
```

`mysql 5.7`镜像中几个文件位置
* 配置文件: `/etc/mysql/conf.d`
* 日志文件: `/etc/mysql//var/log/mysql`
* 数据文件: `/var/lib/mysql`

> -v 前面是宿主机的路径，路径不在会自动创建


## 2、mysql 8

### 2.1 启动mysql8
```shell
docker run -di -p 3607:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```
