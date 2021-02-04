# 003-深入理解事件绑定的this问题


## 1、问题
首先来看一个最简单经典的代码
```jsx
class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 1
    };
  }
  add () {
    console.log(this); // 这里的this=undefined
  }
  render () {
    return <button type="button" onClick={this.add}>累加:{this.state.count}</button>
  }
};
```
我们都知道，通过这种方式调用的，`add()`方法里面的`this=undefined`，那么为什么是undefined呢




## 2、解析问题
要明白这个事件，需要从class类入手
```js
class Person {
    constructor (name) {
        this.name = name; // 放在实例上
    }
    say () { // 放在Person这个原型对象上
        console.log(this);
    }
}
const p1 = new Person('小明');
console.log(p1);
p1.say();
```
![](./img/class.png)

当执行`p1.say()`的时候，`say()`里面的this就是指向p1这个实例

假如改成下面的代码
```js
const p1 = new Person('小明');
const xx = p1.say; // 先赋值给一个变量
xx(); // 再通过变量调用，那么这个时候 `say()` 里面的this就是undefined了
```

这个就是class的特点了，只有通过实例调用的，即上面的`p1.say()` 。方法里面的this才会指向实例

而第2中情况，是把方法赋值给了一个变量，然后再调用该变量`xx()`，这种是函数的直接调用。

而js基础知道，函数的直接调用，里面的this应该为window的。

```js
function yy () {
    console.log(this); // 函数直接调用，this=window
}
yy();
```

然而在上面的例子，我们看到的`this=underfined`。这又是为什么呢？

这是class类的另外一个特性，class类会将其定义的所有方法，都默认内部开启严格模式，所以[this不敢指向全局对象](https://www.cnblogs.com/mengfangui/archive/2017/12/02/7954585.html)，只能指向undefined
```js
function yy () {
	'use strict'
    console.log(this); // 因为开启了严格模式，所以这个this=underfined
}
yy();
```

最后，我们回到react代码
```jsx
<button type="button" onClick={this.add}></button>
```
中`onClick={this.add}`是发生了什么事

首先`this.add`没有`()`说明不会调用，而是取出这个函数然后交给onClick做为回调。当点击事件发生的时候，js从堆里面直接拿出那个函数执行，这种情况根本不是通过`实例.方法`的方法去调用，是直接调用的+类方法默认开启严格模式，所以`this=underfined`



