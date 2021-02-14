# 016-setState的详解


## 1、setState()是一个异步的过程

```js
this.setState({
    num: this.state.num+1
});

// 每次打印出来的都是还没+1的值
// 如果是获取DOM，也是获取到还没更新前的DOM数据
console.log(this.state.num); 
```

当我们需要改变后的state时候，需要用到第2个参数
```js
this.setState({
    num: this.state.num+1
}, () => {
    // 获取到就是state改变后的数据
    // DOM也是完成了更新
    console.log(this.state.num);
});
```


## 2、setState()可以接收一个函数
我们最常用的是下面的写法
```js
this.setState({
    num: this.state.num+1
});
```

但是也可以传递一个函数进去
```js
this.setState((state, props) => {
    return {num: state.num+1}
});
```
* 该函数接收2个参数，当前的state和props数据，最后返回一个JSON，react会按照这个JSON去更新数据
* 这样写的好处是，有state和props直接传递过来，就不需要通过`this.state.xxx/this.props.yyy`获取，直接用`state.xxx/props.yyy`既可获取

