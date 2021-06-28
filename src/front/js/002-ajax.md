# 002-ajax

## 1、手写一个ajax
```js
const xhr = new XMLHttpRequest();
xhr.open('POST', '/login.do', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status ===200) {
            console.log(xhr.responseText);
        } else {
            console.log('其他情况');
        }
    }
}
const params = {name:'xiaoming', age:23};
xhr.send(JSON.stringify(params));
```


## 2、xhr.readyState的几个状态
* `0`: 未初始化，还没调用`send()`方法
* `1`: 载入，已调用`send()`方法，正在发送请求
* `2`: 载入完成，`send()`方法执行完成，已经接收到全部响应内容
* `3`: 交互，正在解析响应内容
* `4`: 完成，响应内容解析完成，可以在客户端调用



## 3、xhr.status的几个状态
* `2xx`: 表示成功处理请求，如200
* `3xx`: 需要重定向，浏览器直接跳转，如301(永久重定向)、302(临时重定向)、
* `4xx`: 客户端请求错误，如404、403
* `5xx`: 服务端错误


