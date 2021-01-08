# 007-nginx多域名

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
        root   /root/svr/aaa;
        index  index.html index.htm;
    }
}
```

这样，浏览器访问 `http://aaa.com` 和 `http://bbb.com` 就可以看到不同的内容了

配置说明
```conf
server_name  aaa.com www.aaa.com;
```

如果只配置aaa.com就会只针对aaa.com