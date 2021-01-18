# 003-nginx的默认配置

## 安装好后的nginx.conf，默认是下面配置
```nginx
user  root;

# worker进程数量，一般配置成 `cpu数*核数` 一样，太多的话会相互争夺CPU资源
worker_processes  1; 

# 错误日志的文件位置
# error_log  logs/error.log;

# 指定存放nginx线程号的地方
#pid        logs/nginx.pid;

# 事件区块的相关配置
events {
    # 每个worker进程支持的最大连接数，
    # 一个nginx服务能同时处理多少请求，就是看上面的 worker_processes * 这里的 worker_connections
    worker_connections  1024; 
}

# http区块的相关配置
http {
    include       mime.types; # include语法: nginx支持的媒体类型
    default_type  application/octet-stream; # 默认媒体类型

    # 定义访问日志的格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    # 配置访问日志存放位置和要用的格式
    #access_log  logs/access.log  main;

    sendfile        on; # 开启高效传输模式
    keepalive_timeout  65; # 连接超时

    # server虚拟主机的相关配置，每个server监听一个端口
    server {
        listen       80; # 提供服务的端口
        server_name  localhost; # 提供服务的域名主机，多个用空格分开

        # location区块的相关配置
        location / {
            root   /root/svr/aaa; # 站点的跟目录，如果写成相对路径，则相对于nginx的安装目录
            index  index.html index.htm; # 默认首页文件，多个用空格分开
        }

        # 出现对应http状态码使用的 50x.html 返回给客户端
        # 就是如果出现 500 502 503 504 这种错误码的时候，返回 50x.html 这个文件给浏览器
        error_page   500 502 503 504  /50x.html;

        # location区块，指定访问 50x.html的时候，到哪个目录里面找
        location = /50x.html {
            root   html; # 这是一个相对路径，相对nginx安装目录，找到里面的 html/50x.html
        }
    }
}
```