# 类class

面对对象编程，

## 三要素

面对对象有3要素：

* 继承：抽离公共代码，实现代码复用
* 封装：高内聚，低耦合
* 多态：更好的扩展性

### 1.继承

子类继承父类，那么子类就拥有和父类一样的属性和方法

在面对对象中，对于属性和方法可以通过**可见性修饰符**来控制是否被子类、外部使用。ts中有以下几种：

* public：所有都可以访问
* protected：当前类，或者子类可访问，外部不可访问
* private：只能在当前类内部访问，其他都不行

```ts
class Person {
  cname: string;
  constructor(cname: string) {
    this.cname = cname;
  }
}

class Student extends Person {
  age: number;
  constructor(cname: string, age: number) {
    super(cname);
    this.age = age;
  }
}
```

### 2.封装

追求高内聚、低耦合

### 3.多态

多态有2种方式：重写、重载

```ts
class Person {
  constructor() {}
  say() {
    console.log("this is Person.say");
  }
}

class Student extends Person {
  constructor() {
    super();
  }
  // 重写了Person类的say方法
  say () {
    console.log('this is Student.say');
  }
}
```

重载则体现在一个类的方法上，当参数个数不同、参数类型不同、返回值不同的时候，称为重载

```ts
class Person {
  // say的入参有2种情况
  say(cname: string): void;
  say(cname: Record<string, string>, age: number): void;
  say(cname: string | Record<string, string>, age?: number): void {
    console.log("this is Person.say");
  }
}
```



