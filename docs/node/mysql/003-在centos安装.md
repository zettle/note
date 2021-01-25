# 003-在centos安装

centos7以后已经不支持mysql，需要使用替换品maria DB

[mariaDB安装教程](https://blog.csdn.net/qq_26903797/article/details/104709596)

执行`mysql -u root -p`，无需密码即可进入mysql服务

![](./img/003/centos-mysql.png)


使用mysql可视化工具访问的时候，一直访问失败，可以按照下面进行排查
1. 阿里云服务器是否开启3306端口访问出入
2. mysql数据库默认不支持远程连接，需要进入mysql命令行后执行下面代码
```
grant all privileges on *.* to 'root'@'%' identified by 'root';
flush privileges;
```
![](./img/003/mysql-centos-con.png)
3. 因为mariaDB按照后默认root不用密码，但是远程连接必须用密码。我们进入mysql命令行
```
use mysql;

UPDATE user SET password=password('123456') WHERE user='root'; // 设置密码

flush privileges; // 刷新mysql
```
这样子用`root/123456`去登陆既可以了