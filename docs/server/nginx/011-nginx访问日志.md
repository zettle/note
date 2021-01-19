# 011-nginx访问日志

nginx的访问日志由 ngx_http_log_module 模块提供，会把每个用户访问网站的日志记录到指定文件里面。

更多该模块内容详见[官网](https://www.nginx.cn/doc/standard/httplog.html)


## 1、nginx日志的2个参数
nginx的访问日志主要由下面2个参数控制

* `log_format`: 用来定义记录日志的格式（可以定义多种日志格式，取不同名字即可）
* `access_log`: 用来指定日志文件的路径及使用的何种日志格式记录日志

在安装完nginx后，我们在`nginx.conf`里面第21-25行可以看到下面代码
```nginx
# 日志格式
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';
# 日志位置和使用main这个日志格式
access_log  logs/access.log  main;
```
其中 `main` 就相当于一个变量名

|     参数       |     说明   |     示例   |
|  -----------  | -----------| --------- |
| $remote_addr  | 客户端地址          | 219.227.111.255 | 
| $remote_user  | 客户端用户名称       | — | 
| $time_local   | 访问时间和时区       | 18/Jul/2014:17:00:01 +0800 | 
| $request      | 请求的URI和HTTP协议  |  “GET /article-10000.html HTTP/1.1” | 
| $http_host    | 请求地址，即浏览器中你输入的地址（IP或域名） |  www.ha97.com  198.98.120.87 | 
| $status       | HTTP请求状态  | 200 | 
| $body_bytes_sent  | 发送给客户端文件内容大小 |  1547 | 
| $http_referer     | url跳转来源 |  https://www.google.com/ | 
| $http_user_agent  | 用户终端浏览器等信息 | Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; GTB7.0; .NET4.0C; | 
| $ssl_protocol     | SSL协议版本  | TLSv1 | 
| $ssl_cipher       | 交换数据中的算法  | RC4-SHA | 
| $upstream_addr    | 后台upstream的地址，即真正提供服务的主机地址  | 10.36.10.80:80 | 
| $request_time     | 整个请求的总时间  | 0.165 | 
| $upstream_response_time |  请求过程中，upstream响应时间  |  0.002  | 
| $upstream_status  | upstream状态  | 200 | 


## 2、自定义日志记录
将 `nginx.conf` 修改为下面
```nginx
http {
    # 错误日志
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"'
                      '"$request_time" "$upstream_response_time"';
    access_log  logs/access.log  main;

}
```
保存然后重启nginx，再去 `logs/access.log` 里面查看日志可以看到内容变成我们修改后的格式



## 3、access_log的作用

语法: `access_log [路径] [要用哪个变量名的格式]`
* `路径` - 如果是相对路径，是相对于nginx安装目录
* `要用哪个变量名的格式` - 就是上面`log_format`定义好的名字

可以放的位置: `http -> server -> locaton -> if in location -> limit_except`

一般情况下，我们推荐 access_log 跟着 server 走，这样找日志也方便点



## 4、多域名的access_log

现在我们有域名`http://aaa.com` 和 `http://bbb.com` 是通过nginx的server_name实现多域名的。

```nginx
http {
    server {
        listen       80;
        server_name  aaa.com;
        location / {
            root   /root/svr/aaa;
            index  index.html index.htm;
        }
    }

    server {
        listen       80;
        server_name  bbb;
        location / {
            root   /root/svr/bbb;
            index  index.html index.htm;
        }
    }
}
```

首先给2个网站定义好格式，然后在 `http://aaa.com` 为其单独配置
```nginx
http {
    # 错误日志格式，命名main
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"'
                      '"$request_time" "$upstream_response_time"';
    # 错误日志格式，命名aaaLog
    log_format  aaaLog  '$remote_addr - "$request" ';

    access_log  logs/access.log  main;
    server {
        listen       80;
        server_name  aaa.com;
        access_log   logs/aaa_access.log  aaaLog;
        location / {
            root   /root/svr/aaa;
            index  index.html index.htm;
        }
    }

    server {
        listen       80;
        server_name  bbb;
        location / {
            root   /root/svr/bbb;
            index  index.html index.htm;
        }
    }
}
```

这样子，当用户访问 `http://aaa.com` 就会使用 `aaaLog格式` 把访问日志记录在 `logs/aaa_access.log` 里面，访问其他的就继续使用 `main格式` 把访问日志记录在 `logs/access.log`


## 5、按天切割访问日志
nignx本身没有切割日志的功能，如果需要实现这种效果，需要通过shell脚本实现，在`00:00`的时候，把 `access.log` 的内容复制

[shell脚本可以参考](https://www.cnblogs.com/littleatp/p/4625010.html)

比如现在有 `http://aaa.com` 和 `http://bbb.com` 两个网址，分别存的访问日志是 `aaa.access.log` 和 `bbb.access.log`

我们新建`splitlog.sh`，内容如下：
```shell
#!/bin/bash 

# nginx/log 文件夹的路径
logPath=/usr/local/nginx-1.18.0/logs
# aaa.access.log 文件的路径
aaaLogPath=$logPath/aaa.access.log
# bbb.access.log 文件的路径
bbblogPath=$logPath/bbb.access.log
# 昨天的日期 格式 年月日时分
yesterdayDate=$(date -d yesterday +%Y%m%d%H%M)

# 要备份到哪个文件夹、以及对应的文件
bakPath=$logPath/baklog
aaaBakLogPath=$bakPath/${yesterdayDate}.aaa.access.log
bbblogBakPath=$bakPath/${yesterdayDate}.bbb.access.log

# Linux的mv命令
mv $aaaLogPath $aaaBakLogPath
mv $bbblogPath $bbblogBakPath

# mv之后原来的不见了，所以需要重新创建一份
touch $aaaLogPath
touch $bbblogPath

nginx -s reopen # 也可以用信号量语句 kill -UER1
```

执行`sh splitlog.sh`就可以了

接着只要让linux每天在定时执行上面的shell脚本即可

