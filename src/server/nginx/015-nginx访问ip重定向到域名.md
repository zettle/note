# 015-nginx访问ip重定向到域名

正常情况下，用户通过域名或者通过IP地址都可以访问到我们的网站

如果我们想要实现用户访问IP的时候，重定向到域名，则在nginx添加下面配置即可

baidu就是做了这种效果

```nginx
server {
    listen       80;
    server_name  59.110.21.75;
    rewrite ^/(.*) http://aaa.com/$1 redirect;
}
```
