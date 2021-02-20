# 022-nginx高性能之路

[参考资料](https://www.cnblogs.com/architectforest/p/12795040.html)

## 1. 配置worker_processes

`worker_processes`: work进程数。

推荐设置: CPU数*核数，比如2个四核的CPU那么就设置为8

`worker_cpu_affinity`: 为每个进程分配cpu，比如下面的demo就是为8个进程分配到8个CPU中，当然可以写多个，或者将一个进程分配到多个CPU中

[worker_cpu_affinity资料](https://blog.csdn.net/u011957758/article/details/50959823)

```nginx
worker_processes  8;
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;
```


## 2. 配置worker_rlimit_nofile

`worker_rlimit_nofile`: worker进程最大打开文件数。理论上应该是最多打开文件数（`ulimit -n`）于nginx进程数（`worker_processes`）相除，但是nginx分配请求并不是那么均匀，所有最好于`ulimit -n`的值保持一致

现在在Linux2.6内核下开启文件打开数为65535，worker_rlimit_nofile就相应应该设置65535

这是因为nginx调度时分配请求到进程并不是那么均衡，所以加入设置10240，总并发量达到3-4万就有进程可能超过10240了，这个时候就会返回502错误

> 查看Linux最多打开文件数: `ulimit -n`


## 3. 优先epoll模型
```nginx
events {
    use epoll;
}
```
nginx优先使用epoll模型



## 4. 配置worker_connections
每个进程允许的最多连接数，理论上`一台centos服务器的最大连接数 = worker_connections * worker_processes`

推荐设置: 最多打开文件数（`ulimit -n`）相同
```nginx
events {
    worker_connections  65535;
}
```


## 5. 配置keepalive_timeout
keepalive的超时时间

浏览器经过握手链接服务器后，不会立即中断，后面的请求就会继续沿用上次的，称为keepalive。

这个值对于同一个浏览器的请求是有帮助，但是对于不同浏览器请求就是无意的，比如有10万个用户同时请求一个链接的时候，这10万个请求是不同地方来的，都是首次建立链接，这个值太大了反而占据了较多cpu资源

推荐设置: 20-60
```nginx
http {
    keepalive_timeout  65;
}
```



## 6. 配置client_header_buffer_size
客户端请求头部的缓冲区的大小，这个可以根据系统分页大小来设置，一般一个请求头打大小不会超过1K，不过由于一般系统分页都要大于1K，所以这里设置为分页大小

```nginx
http {
    client_header_buffer_size 4k;
}
```

> 查询系统分页大小的方法: `getconf PAGESIZE`， 比如得到的值是4096，那么就是4K，`4K=4096/1024`

> 也有client_header_buffer_size超过4K的情况，但即使是这样client_header_buffer_size也必须设置为“系统分页大小”的整数倍



## 7. 配置open_file
打开文件指定缓存，默认是没有开启的

位置: `http - server - location`

* `open_file_cache`: max指缓存数量，推荐和“系统打开文件数”（`ulimit -n`）一致。inactive是指经过多长时间文件没被请求后删除缓存
* `open_file_cache_valid`: 多长时间检查一次缓存的有效信息
* `open_file_cache_min_uses`: open_file_cache指令中inactive参数时间内文件最少使用次数，如果超过这个次数，文件描述符一直是在缓存中打开的。比如设置
```
open_file_cache max=65535 inactive=30s;
open_file_cache_min_uses 2; 
```
上次的意思是30s内，最少有2个文件在使用，那么这个缓存就不会失效

```nginx
http {
    open_file_cache max=65535 inactive=30s;
    open_file_cache_valid 60s;
    open_file_cache_min_uses 2;
}
```



