# interface 和 type

interface 和 type 都可以用来定义类型，但是2者之间还是有一些差异



## 差异

### 1. 重复定义的差异

interface允许重复定义，使用的时候会自动将几个合并起来

```ts
interface Person { cname: string; }
interface Person { age: number}
// 使用时要满足上面2个interface
const p: Person = { 
    cname: 'xiaoming',
    age:23 
};
```

而type则不允许重复定义

```ts
type Person = { cname: string };
type Person = { age: number }; // error 重复定义
```

