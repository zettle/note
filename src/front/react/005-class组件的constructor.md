# 005-class组件的constructor

对于类组件的构造函数，我们在调用`super()`的时候，props貌似都不影响到代码

比如下面代码
```jsx
class Person extends React.Component {
  constructor (props) {
    super();
  }
  render () {
    const {name} = this.props;
    return (
      <p>My name is {name}</p>
    );
  }
};
```

然而[官网](https://reactjs.bootcss.com/docs/react-component.html#constructor)针对这一块说不推荐这么写，让我们还是要把`super(props)`传递过去，否则可能出现`this.props`在构造函数中可能会出现未定义的 bug。

那么这句话是什么意思呢，看下面的场景
```jsx
class Person extends React.Component {
  constructor (props) {
    super();
    console.log(this.props); // 由于没有把props传递给super,所以这里的this.props=underfined
  }
}
```

所以我们推荐，要不就不写构造函数，要么就写全`super(props)`