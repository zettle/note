# 015-egg连接redis

官方提供了redis插件[egg-redis](https://github.com/eggjs/egg-redis)

连接方式:
```js
config.redis = {
    client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0, // egg-redis支持多redis连接，这个时候就通过db来标识
    },
}
```

使用的时候和redis语法一样，在获取的时候，注意加上await
```js
this.app.redis.set('name', 'xiaoming');
const name = await this.app.redis.get('name');
```

