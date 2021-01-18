# 015-nginx二级路径多网站


## 1、使用root配置

现在访问 `http://aaa.com` 是A网站， 访问`http://aaa.com/bbs/` 想要是bbs这个项目的页面

则可以这么配置
```nginx
server {
    listen       80;
    server_name  aaa.com www.aaa.com;

    location / {
        root   /root/svr/blog;
        index  index.html index.htm;
    }

    location /bbs {
        root /root/svr; # 注意这里不要配置到 `/root/svr/bbs`，nginx会自动拿 `这个文件夹+配置的location` 组合在一起
        index index.html index.htm;
    }
}
```

这样子，当访问 `http://aaa.com` 会读取 `/root/svr/blog` 这个文件夹的前端资源

这样子，当访问 `http://aaa.com/bbs/` 会读取 `/root/svr/bbs` 这个文件夹的前端资源

> 注意点：

在配置
```nginx
location /bbs {
    root /root/svr;
    index index.html index.htm;
}
```
注意不要配置成 `root /root/svr/bbs`，nginx会自动把location的拼接在后面，如果配置成这样子，最终nginx找的路径是`/root/svr/bbs/bbs`


## 1、使用alias配置
```nginx
server {
    listen       80;
    server_name  aaa.com www.aaa.com;

    location / {
        root   /root/svr/blog;
        index  index.html index.htm;
    }

    location /bbs {
        root /root/svr/bbs; # 注意这里就要加上 bbs
        index index.html index.htm;
    }
}
```
上面实现效果是一样的



