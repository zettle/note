# 007-nginx的include

当server里面配置多了之后会比较难维护，我们可以把server拆成一个个文件，然后通过include进nginx

分开前 `nginx.conf` 的配置
```nginx
http {
    server {
        listen       80;
        server_name  zettle.top www.zettle.top;

        location / {
            root   /root/svr/aaa;
            index  index.html index.htm;
        }
    }

    server {
        listen       80;
        server_name  huangzetao.xyz www.huangzetao.xyz;
        location / {
            root   /root/svr/bbb;
            index  index.html index.htm;
        }
    }
}
```

把server拆成2个

```nginx
# conf/zettle.conf
server {
    listen       80;
    server_name  zettle.top www.zettle.top;

    location / {
        root   /root/svr/aaa;
        index  index.html index.htm;
    }
}

# conf/huangzetao.conf
server {
    listen       80;
    server_name  huangzetao.xyz www.huangzetao.xyz;
    location / {
        root   /root/svr/bbb;
        index  index.html index.htm;
    }
}
```
然后在 `nginx.conf` 通过include引入
```nginx
# nginx.conf
http {
    include ./conf/zettle.conf;
    include ./conf/huangzetao.conf;
}
```

include也支持 `*` ，表示任意字符，比如 `include ./conf/*.conf` 表示引入 `./conf/` 目录里面所有`.conf`结尾的配置文件