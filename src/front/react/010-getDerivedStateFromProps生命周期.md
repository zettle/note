# 010-getDerivedStateFromProps生命周期


## 1、语法
[官网说明](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

语法: `static getDerivedStateFromProps(props, state) {}`。

> 接收2个参数，一个是父组件传递过来的props，一个是组件本身的state。

> 返回值需要时一个JSON或者null，不能其他

> 用了`getDerivedStateFromProps`，那么就必须要有`state`。即使是空也要写`state = {};`

先来看用法:
```
class App extends React.Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    return {
      count: 12
    }
  }
  change = () => {
    this.setState({count: this.state.count+1}); // 即使一直改变，state.count的值永远=12
  };
  render () {
    return (
      <div>
        {this.state.count}
        <button onClick={this.change}>改变</button>
      </div>
    );
  }
}
```

为什么在`getDerivedStateFromProps`返回的值永远无法改变，因为`getDerivedStateFromProps()`是在组件挂载、更新的时候，都会执行一次，执行完后return的值没有变化，所以不会发生改变

![](./img/left-new.png)



## 2、使用场景
官网也说了，这个生命周期使用场景及其少，一般我们是要声明一个永远不会改变的state的时候用的

先来看一个普通state的例子
```jsx
class App extends React.Component {
  state = {count: 1};
  shouldComponentUpdate () {
    return false;
  }
  change = () => {
    this.setState({count: this.state.count+1}); 

    // shouldComponentUpdate()=false 视图不会更新，但是js内存中变量还是会改
    console.log(this.state.count); 
  };
  render () {
    return (
      <div>
        {this.state.count}
        <button onClick={this.change}>改变</button>
      </div>
    );
  }
}
```

改为用`getDerivedStateFromProps`，则不一样:
```jsx
class App extends React.Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    return {
      count: 1
    }
  }
  change = () => {
    this.setState({count: this.state.count+1});
    // 视图不会更新，js内存的count变量也不会改变
    console.log(this.state.count);
  };
  render () {
    return (
      <div>
        {this.state.count}
        <button onClick={this.change}>改变</button>
      </div>
    );
  }
}
```

我们常常会用来作为props的一个派生
```jsx
static getDerivedStateFromProps(props, state) {
  // 应为有props/state参数，在这里做写业务处理，然后return出去，那么整个组件都无法改变这个变量
  return props;
}
```