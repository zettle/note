# 020-nginx缓存


## 1、图片的缓存
对于网站，尤其是新闻网站，图片一旦发布，改动的可能性非常小，我们希望用户访问一次后，图片缓存在浏览器上，且时间长点，可以使用到nginx的expires配置

位置: `location -> if` 里面写

格式: 
```
expires 30s # 30秒后过期
expires 30m # 30分后过期
expires 2h # 2小时后过期
expires 30d # 30天后过期
```

在请求响应中，有下面几个字段
* `expires:Wed, 20 Jan 2021 01:54:01 GMT`: 过期时间
* `Date:Wed, 20 Jan 2021 02:06:42 GMT`: 服务时间
* `Last-Modified:Wed, 20 Jan 2021 02:06:42 GMT`: 文件最后一次修改的时间
* `etag: "60078670-7cca"`: 内容的签名，内容改了签名也会改



## 2、html/js/css
304也是一种很好的缓存手段

原理: 
1. 首次请求服务端，服务端响应文件，在响应头带上`etag`标签（内容的签名，内容改了，`etag`也会改）和`Last-Modified`2个标签值。
2. 浏览器把拿到的`etag`和`Last-Modified`存起来，下次请求的时候带上，
3. 浏览器下次请求，请求头信息发送这`If-None-Match`（对应上面的`etag`的值）和`If-Modified-Since`（对应上面的`Last-Modified`的值）个标签，服务端检测文件有没有发生变化。
    * 如无，直接头信息返回`etag`和`last_modified_since`
    * 如有，返回新的内容和新的`etag|last_modified_since`
4. 浏览器知道内容无改变，于是直接调用本地缓存。
5. 这个过程也请求了服务器，但是传的内容极少
6. 对于经常变化的，如html/js/css，比较适合这种方式







