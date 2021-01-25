# 099-docker实战1-部署node

用koa+mysql搭建项目

## 1、数据库结构
```mysql
-- 创建数据库d_library
CREATE DATABASE IF NOT EXISTS `d_library`;
USE `d_library`;

-- 创建表books
CREATE TABLE IF NOT EXISTS `books` (
  `id` int DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `auth` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

DELETE FROM `books`;

-- 插入数据
INSERT INTO `books` (`id`, `name`, `auth`) VALUES
	(1, '高级js编程', '张三'),
	(2, 'css技巧', '李四');
```


## 2、页面效果
主体代码:
```js
// db.js
const mysql = require('mysql');

module.exports =  {
    connect () {
        this.poll = mysql.createPool({
            host : 'localhost',
            user : 'root',
            password : '123456',
            database : 'd_library'
        });
    },
    // 查询所有books数据
    query () {
        return new Promise(resolve => {
            this.poll.query('select * from books', (error, results, fields) => {
                resolve(results);
            });
        });
    }
}
```
页面效果:

![](./img/099/web.png)



## 3、传统的部署
1. 在centos上搭建mysql数据库
2. 上传node代码
3. pm2启动node


## 4、