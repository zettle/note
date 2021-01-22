# 022-nginx高性能之路

[参考资料](https://www.cnblogs.com/architectforest/p/12795040.html)

```nginx
# worker进程数
# 设置: CPU数*核数
worker_processes  2;

# worker进程最大打开文件数，
# 设置: 最多打开文件数（`ulimit -n`）与nginx进程数相除
worker_rlimit_nofile 65535;

# keep-alive保持连接时间，对于高并发网站来说，这个值并不是越高越好，太占用资源了
# 设置:2
keepalive_timeout  2;

events {
    # 单个进程允许的客户端最大连接数
    # 设置: 系统的最大打开文件数>=worker_connections*worker_process
    worker_connections  20480; 
}
```

1. 如何查看系统的最大打开文件数
在linux上执行
```
ulimit -n
``` 