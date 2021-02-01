# 001-linux上安装git

如果通过yum安装的git是`1.8.3.1`，这个版本在和pm2做自动部署时候，会出现无法自动更新代码的问题，不推荐

推荐用下面方式安装指定版本的git

1. 安装依赖
```shell
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel asciidoc

yum install gcc perl-ExtUtils-MakeMaker
```



通过[git国内镜像列表](https://mirrors.edge.kernel.org/pub/software/scm/git/)获取链接
```shell
wget https://www.kernel.org/pub/software/scm/git/git-2.15.1.tar.xz

tar -vxf git-2.15.1.tar.xz
```