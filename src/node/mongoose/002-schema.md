# 002-schema

schema用来定义表的字段

以用户表(users表)为例子

|          _id             |    name    | age  |
| -----------------------  | ---------  | ---- |
| 5f324f95dbe009324052a06b | "xiaoming" |  23  |
| 5f32a1d4fc0d43fd8592033c | "小明"      |  12  |

那么定义schema码的时候如下:
```js
const UserSchema = mongoose.Schema({
    name: String,
    age: Number
});
module.exports = mongoose.model('User', UserSchema);
```

## 1、schema设置默认值
在定义Schema的时候，可以定义默认值
```js
mongoose.Schema({
    name: String,
    age: {
        type: Number,
        default: 100
    }
});
new UserModel({ name: '董卓' }).save(); // age会默认100存到数据库中
```


## 2、保存时候注意事项
保存的语法如下
```js
const user = new UserModel({
    name: '小白',
    age: 23
});
await user.save();
```

假如我们传递的数据比Schema多字段
```js
new UserModel({ name: '嫦娥', age: 23, sex: '女' }).save(); // 只会存schema有定义的字段，sex这个字段存不进去
```

假如我们传递的数据比Schema少字段
```js
new UserModel({ name: '猪刚烈' }).save(); // 能保存成功，年龄字段是空的存到数据
```



## 3、schema预定义模式修饰符

## 3.1 内置的修饰符
预定义修饰符可以影响存进去的时候，不影响获取的时候

还是上面的users表为例子，在上面中，我们定义了Schema如下:
```js
mongoose.Schema({
    name: String,
    age: {
        type: Number,
        default: 100
    }
});
```

假如我传入的name前后带有空格，那么保存到数据库里面的也是带有空格
```js
new UserModel({ name: '   二爷 ' }).save(); // 存进去的带有空格

UserModel.find({}); // 查回来的也是带有空格
```

我们可以在定义Schema的时候，就预定义好去首尾空格的修饰符，如下:
```js
mongoose.Schema({
    name: {
        type: String,
        trim: true // 去首尾空格
    },
    age: {
        type: Number,
        default: 100
    }
});
new UserModel({ name: '   雨神 ' }).save(); // 存进去的是去掉空格后的
UserModel.find({}); // 查回来的还是带有空格
```

常见的修饰符有下面几个，都是对存的时候有影响，取的时候无影响。后面在`get/set`的时候会讲到底有什么用
* `uppercase`: 转为大写
* `lowercase`: 转为小写
* `trim`: 去掉首尾空格



## 3.2 自定义修饰符
自定义模式修饰符，是通过`set/get`来实现的

比如我们想要在每个name字段后面加上字符串`001`。那么Schema就可以这么写:
```js
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        set (str) { // 在给name赋值的时候会触发
            return str + '001';
        }
    },
    age: Number
});
new UserModel({ name: '孙悟空' }).save(); // 数据库存的是`孙悟空001`
```


对于get的使用，需要注意下不是在获取数据库数据的时候出发的
```js
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        get (str) {
            return str + '001';
        }
    },
    age: Number
});

UserModel.find({}, (err, doc) => {
    console.log(doc); // 并不会出发get
});
```

`get()`的触发时机是在获取model实例对象的属性才会触发
```js
const data = new UserModel({
    name: '笑笑',
    age: 23
});
console.log(data.name); // 这里才会触发get
```

> 关于get和set的触发时机: 在对model实例赋值和获取的时候触发的，和数据库没有关系
```js
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        set (str) {
            return str + 'hehe';
        },
        get (str) { // 在给name赋值的时候会触发
            return str + '001';
        }
    }
});
const UserModel = mongoose.model('User', UserSchema);

const data = new UserModel({ name: '妖精' });
console.log(data.name); // 妖精hehe001
```
在执行`new UserModel({ name: '妖精' })`的时候，会调用set方法，所以`name=妖精hehe`。

到了执行`console.log(data.name)`的时候，会调用get方法，所以`name=妖精hehe001`。


**所以严格上说，模式修饰符和数据库存取的时间点没有关系，而是和对应的实例对象有关系**
