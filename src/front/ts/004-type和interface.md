# 004-type和interface

## 1、 interface

### 1.1 interface声明匿名函数
一般的，用interface来定义个类型里面有函数
```ts
interface IPerson {
    say (): void;
}
```

有时候，我们的参数就是一个function，这种时候就可以定义一个匿名函数了
```ts
interface CallBackFn {
    (data: String): void
}

function doSomething (cb: CallBackFn) {
    cb('调用');
}

const cb: CallBackFn = (data: String) => {};
```


### 1.2 interface的校验
当我们声明了一个类型，如果是通过直接传参的方式传递过去，那么ts会对其做强校验
```ts
interface Person {
    name: String;
}
function hi (p: Person) {
    console.log(p.name)
}
hi({name:'小明', age:23}); // 编译报错，比interface声明的多个age属性
```

而当我们是先实例化再传递的时候，ts只会校验满足基本的interface必要的要求即可
```ts
interface Person {
    name: String;
}
function hi (p: Person) {
    console.log(p.name)
}
const stu = {name:'小明', age:23};
hi(stu); // 能过，满足最基本的要求
```



## 2、 



## 3、 type和interface的区别

type和interface都可以用来声明一个类型，比如下面是等效的
```ts
type IPerson = {
    name: String;
}

interface IPerson {
    name: String;
}
```

但二者还是有细微的差别，type还可以用来作为别名，比如下面:
```ts
type IName = String | Number; // 起了个别名简写的作用

const xiao:IName = '323'; 
```

另外，interface声明同个类型名的时候，ts会将其合并
```ts
interface IPerson {
    name: String;
}

interface IPerson {
    age: Number;
}

// 上面的2个IPerson会变合并一个
const xiao: IPerson = { name: 'xiao', age: 23 };
```

而type则不行，声明同个类型名的时候，会报错
```ts
interface IPerson = {
    name: String;
}

interface IPerson = { // 报错了
    age: Number;
}
```