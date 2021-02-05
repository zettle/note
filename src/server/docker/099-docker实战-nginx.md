# 099-docker实战-nginx

## 1、挂载静态页面的目录
```shell
docker run -di -p 7001:80 -v /apps/svr/zettle:/usr/share/nginx/html nginx
```

nginx镜像的几个文件位置
* 配置文件: `/etc/nginx/nginx.conf`
* include的配置文件: `/etc/nginx/conf.d/default.conf`
* 静态文件目录: `/usr/share/nginx/html`

