# 008-docker目录挂载

一个目录挂载语法: `docker run -it -v [宿主机目录]:[容器目录] 镜像名`

多个目录挂载语法: `docker run -it -v [宿主机目录]:[容器目录] -v [宿主机目录]:[容器目录] 镜像名`


## 1、nginx静态资源挂载
比如启动nginx镜像的时候，想要把自己项目的代码挂载到nginx镜像里面
```
docker run -di -p 7001:80 -v /apps/svr/zettle:/usr/share/nginx/html --privileged=true nginx
```

