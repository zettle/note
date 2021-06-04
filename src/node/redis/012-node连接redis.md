# 011-node连接redis

借助第三方库: `npm i -S redis`

* 连接方法1: `redis.createClient('redis://localhost:6379')`
* 连接方法2: `redis.createClient(6379, 'localhost')`


## 1、demo
```js
const redis = require('redis');
const client = redis.createClient(6379, 'localhost');

client.set('hello', 'I am xiaoming'); // 存redis

client.get('hello', function (err, v) { // 取redis
    console.log(err, v, typeof v);
});
```



## 2、node操作字符串
* 设置字符串: `client.set('name', 'xiaoming')`
* 设置字符串带过期时间: `client.set('name', 'xiaoming', 'EX', 5)`表示设置5s后过期
* 读取字符串: `client.get('name', (err, info) => {})`
* 删除字符串: `client.del('name', (err, info) => {})` err表示是否发生异常，info表示删除成功第2个参数返回1，删除失败返回0

获取不到字符串返回null，当设置非字符串类型的时候，程序会自动调用其`.toString()`方法转为字符串
```js
client.set('hello', true); // 会转为字符串的'true'
client.set('hello', 1);    // 会转为字符串的'1'
```


## 3、node操作list
获取返回的是一个数组，获取不到则返回空数组
```js
client.rpush('myList', 'a');
client.rpush('myList', 1); // 会转为字符串'1'
client.rpush('myList', false); // 会转为字符串'false'
client.lrange('myList', 0, -1, function (err, v) {
    console.log(err, v, typeof v);
});

client.rpop('myList'); // 最右边的弹出
client.lpop('myList'); // 最左边的弹出
client.lrange('myList', 0, -1, function (err, v) {
    console.log(err, v, typeof v); // 最终v返回的是一个数组
});
```
List里面存储的也是字符串，数字、布尔型会自动转为字符串类型

注意下，获取虽然是异步，但是获取的是代码前面的状态
```js
client.rpush('myList', 'aaa');
client.rpush('myList', 'bbb');
client.lrange('myList', 0, -1, (err, info) => {
    // 获取虽然是异步，进入回调的时候肯定执行完`lpush('ccc')`了，
    // 但这里得到的是[aaa,bbb]。而不是[aaa,bbb,ccc]
    console.log(info);
});
client.lpush('myList', 'ccc');
```




## 4、node操作set
不允许重复元素，插入的时候发现有重复元素就不插入了
```js
client.sadd('mySet', 'a');
client.sadd('mySet', 1);     // 会转为字符串'1'
client.sadd('mySet', false); // 会转为字符串'false'
client.smembers('mySet', function (err, v) {
    console.log(err, v, typeof v);  // 最终返回的是一个数组
});

client.sadd('mySet', '1'); // 添加不了，里面已经有一个字符串的'1'了

client.srem('mySet', 'a'); // 删除a
```



## 5、node操作hash
```js
client.hset('myHash', 'name', 'xiaoming');
client.hmset('myHash', 'age', 22, 'sex', '女'); // 一次添加多条
client.hgetall('myHash', (err, info) => {
    console.log(err, info);
});
```

操作hash注意一点，如果操作的hash已经存在，就看设置的属性是否存在存在则会覆盖，并且新设置的里面没有就会用原来的，类型js中`Object.assign(旧hash,新hash)`
```js
client.hmset('myHash', 'age', 22, 'sex', '女'); // {age:'22', sex: '女'}
// 之后再执行下面代码
client.hmset('myHash', 'age', 24, 'name', 'xiaohong'); // {name:'xiaohong',age:'24', sex: '女'}
```
从上面看出`name`原来里面没有就会添加进入。`age`原来有，用新值覆盖掉。虽然新设置的没有`sex`，但会保留旧值





## 6、其他通用的
* `client.flushall((err, val) => {})` 清除整个redis缓存
