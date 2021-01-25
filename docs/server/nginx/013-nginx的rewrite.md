# 012-nginx的rewrite

## 1、介绍
rewrite依赖PCRE软件，这也是前面安装nginx为什么要先安装PCRE软件

语法: `rewrite [regex] [replacement] [?flag]`

位置: `server -> location -> if`

比如`rewrite ^/(.*) http://www.aaa.com/$1 permanent`，表示匹配以`/`开头任意字符的路径，将匹配到的拼接在`http://www.aaa.com/$1`中的`$1`位置。

比如用户访问了`http://aaa.com/login.html`经过上面的rewrite后，变成了`http://www.aaa.com/login.html`


**flag参数**
|  flag标记  | 说明  |
| --------   | ----  |
| last       | 本条规则匹配后，继续向下匹配新的loctionURI规则   |
| break      | 本条规则匹配完成即终止，不在继续匹配后面的任何规则  |
| redirect   | 返回302临时重定向，浏览器会显示跳出后的URL地址    |
| permanent  | 返回301永久重定向，浏览器会显示跳出后的URL地址    |

### 1.1 例子，重定向www.aaa.com到aaa.com
下面举个例子，比如现在`http://aaa.com`和`http://www.aaa.com`，在nginx配置如下
```nginx
server {
    listen       80;
    server_name  aaa www.aaa;
    location / {
        root   /root/svr/aaa;
        index  index.html index.htm;
    }
}
```
用户访问`http://aaa.com`和`http://www.aaa.com`都会读取前端代码然后返回。

现在我们改为用户访问`http://aaa.com`才读取前端代码，而访问`http://www.aaa.com`就重定向到`http://aaa.com`，配置如下
```nginx
server {
    listen       80;
    server_name  aaa.com;
    location / {
        root   /root/svr/aaa;
        index  index.html index.htm;
    }
}

# 监听www然后重定向
server {
    listen       80;
    server_name  www.aaa.com;
    rewrite ^/(.*) http://aaa.com/$1 permanent; # http://不能省
}
```
当用户访问`http://www.aaa.com`的时候，就会301重定向到`http://aaa.com`

> 注意上面的`http://aaa.com/$1`中的`http://`不能省，不让nginx就会一直往请求的路径追加，变成了重定向`http://aaa.com/aaa.com/aaa.com`