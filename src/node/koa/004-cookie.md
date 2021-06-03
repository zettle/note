# 004-cookie

koa默认就集成了cookie的相关方法，可以直接使用。

设置cookie：`ctx.cookies.set('account', 'xiaoming');`。
* 默认过期时间是session，即关闭浏览器后这个cookie就会过期
* 默认Domain为当前域名
* 默认httpOnly为true


## 1、中文问题

koa的cookie是不支持中文的

如果真的需要用到中文，可以用下面的方式中转下，先将中文转为base64，然后获取的时候再解码。

存的时候：`ctx.cookies.set('account', Buffer.from('小明').toString('base64'))`得到`5bCP5piO`这个字符串

读的时候：`Buffer.from(ctx.cookies.get('account'), 'base64').toString()`，将`5bCP5piO`转为`小明`这个字符串


## 2、cookie各个配置

配置项 | 说明 | 例子 |
:-: | :-: | :-:
maxAge  | 多少毫秒后过期，单位毫秒 | maxAge: 6 * 1000 |
expires | 什么时间点过期，单位日期 | expires: new Date('2020-03-04 10:57:00') |
path | 路径，默认'/' | path: '/news'，只有该路径下的才可以获取cookie |
domain | 可以获取cookie的域名 | domain: '.baidu.com'  baidu下的二级域名都可以访问 |
secure | 默认false，true表示只有https才可以获取 |
httpOnly | 默认true，true表示只有服务器才可以获取 |
overwrite | 默认false，true表示覆盖相同名称的，实际上不论设置true还是false都会覆盖，很少用到 |
