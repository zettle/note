# 001-Linux安装jenkins

这里通过docker安装jenkins

1. 执行下面命令
```shell
docker run --name jenkins_xiaoming -itd -p 11005:8080 -p 50000:50000 jenkins/jenkins:lts
```

执行
```shell
```
可以看到这么段话，大意是：jenkins有个admin的账号，密码在``，将来需要用这个账号密码初次登陆jenkins

