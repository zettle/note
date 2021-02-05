# 008-nginx多域名

## 1、多域名配合
nginx的server_name可以让我们根据不同域名映射不同的前端目录


比如现在有 `http://aaa.com` 和 `http://bbb.com` 都指向通过ip的nginx

通过 `server_name` 定义不同的域名，指到不同的目录

```conf
server {
    listen       80;
    server_name  aaa.com www.aaa.com; # 如果只配置aaa.com就会只针对aaa.com
    location / {
        root   /root/svr/aaa;
        index  index.html index.htm;
    }
}

server {
    listen       80;
    server_name  bbb.com www.bbb.com;
    location / {
        root   /root/svr/bbb;
        index  index.html index.htm;
    }
}
```

这样，浏览器访问 `http://aaa.com` 和 `http://bbb.com` 就可以看到不同的内容了

配置说明
```conf
server_name  aaa.com;
```

如果只配置`aaa.com`就会只针对 `http://aaa.com`，所以加上`www.aaa.com`就能一起针对 `http://aaa.com` 和 `http://bbb.com` 

当只配置 `server_name aaa.com`的时候，如果用 `http://www.aaa.com` 访问，会匹配不到。

1. 没有条件买多个域名的，可以在本地配置host
2. 如果匹配不到，就会默认进入第1条配置

## 2、server_name多域名的原理

在浏览器中访问url的时候，会发起一个http请求，http请求里面的request请求头中，带有一个 host 字段，表示当前浏览器输入的域名或IP

比如访问 `http://aaa.com` 的时候，这个host就是就是 `aaa.com`。

当访问 `http://www.aaa.com` 的时候，这个host就是就是 `www.aaa.com`。

nginx会拿这个host和nginx配置里面对比，对比成功就进入对应的server分支，对比不成功就返回第1个server

所以当我们直接通过ip地址访问 `http://59.110.21.75/` 或者输入一个不存在的，就会返回第1个server_name