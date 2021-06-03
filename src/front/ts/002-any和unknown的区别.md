# 002-any和unknown的区别

any表示任何类型都可以，比如下面代码
```ts
const kk:any = '';
kk.toString();
kk+=1;
```
ts会将any当做任何类型，不会触发任何类型检查

而unknown，表示这个类型未知，在使用的时候，需要通过类型断言出对应的类型才能调用
```ts
let kk:unknown = '';
kk+=1; // 异常
```
需要断言
```ts
let kk:unknown = '';
if (typeof kk === 'number') {
    kk+=1;
}
```
