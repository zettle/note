# 014-nginx的location匹配

location即定位的意思，可以把网站的不同uri部分，定位到不同的处理方式上


## 1、语法
location语法如下:
```
location [=|~|~*|^-] [uri] {
}
```

中间的 `[=|~|~*|^~]` 是匹配的修饰符，可以省略

* 省略不写，即`locaton [uri]`: 称为一般匹配
    * 对当前路径及子路径下的所有对象都生效
* `locaton = [uri]`: 称为精准匹配
    * 只对当前路径生效，不包括子路径
* `locaton [~|~*] [uri]`: 称为模式匹配
    * 此处的uri可以用正则表达式
    * `~` 和 `~*` 的区别，前者区分字母大小写，后者不区分字母大小写
* `locaton ^~ [uri]`: 不使用正则表达式


## 2、如何发挥作用
上面几种匹配模式，有优先级区分

第1优先级: `location = [uri]` 匹配到了就停止继续匹配

第2优先级:  `locaton ^~ [uri]`

第3优先级:  `locaton [~|~*] [uri]`

第4优先级:  `locaton [uri]`


**场景1：**看下面配置
当访问 `http://aaa.com/` 有下面配置

```nginx
location = / {
    root /root/svr/aaa;
    index index.html index.htm;
}

location / {
    root   /root/svr/bbb;
    index  index.html index.htm;
}
```

按照优先原则，应该展示的是 `/root/svr/aaa`， 但实际上展示的是 `/root/svr/bbb`

实际上，对于这种情况，nginx是怎么定位的
1. 精准匹配，命中 `location = /` 这精准匹配条，得到首页是index.html
2. 然后访问index.html，此次内部转跳uri已经是'/index.html'
3. 最终结果命中了 `location /`，最后访问 `/root/svr/bbb/index.html`

如果改为下面的配置
```nginx
location = / {
    root /root/svr/aaa;
    index aaa.html index.html index.htm; # 这里多加一个aaa.html
}

location / {
    root   /root/svr/bbb;
    index  index.html index.htm;
}
```
当范围 `http://aaa.com/` 的时候，经历下面的过程
1. 精准匹配 `location = /` 命中，得到首页是aaa.html
2. 接着访问 `http://aaa.com/aaa.html`，此时内部转跳uri已经是`aaa.html`
3. 命中一般匹配 `location /`，所以最终去读取 `/root/svr/bbb/aaa.html` 的内容


如果改为下面配置
```nginx
location = /index.html {
    root /root/svr/aaa;
    index index.html index.htm;
}

location / {
    root   /root/svr/bbb;
    index  index.html index.htm;
}
```




