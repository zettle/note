# 004-propsType检验


## 1、类组件
react对于props传递过来的数据，可以进行类型的检查和默认值的设置
```jsx
class Person extends React.Component {
}
Person.propTypes = {}; // 类型的检查
Person.defaultProps = {}; // 默认值的设置
```
可见，`propTypes/defaultProps`是挂载在类上的，我们推荐用static
```jsx
class Person extends React.Component {
	static propTypes = {}; // 类型的检查
	static defaultProps = {};  // 默认值的设置
}
```

对于类型检查，`react15.5`之后，已经把PropTypes抽离出去，所以我们需要单独引入
```jsx
import PropTypes from 'prop-types';

class Person extends React.Component {
  // 类型校验，propTypes这个是首字母小写
  static propTypes = {
    name: PropTypes.string.isRequired, // PropTypes这个是首字母小写，是个字符串且必传
    age: PropTypes.number, // 是个数字，可不传
    say: PropTypes.func // 是个function
  };
  // 默认值
  static defaultProps = {
    age: 100
  };
  render () {
    const {name, age} = this.props;
    return (
      <p>My name is {name}, age is {age}</p>
    );
  }
};
```



## 2、函数组件
函数组件，没有state，没有refs，只有props，也可以对props检验

函数组件的props校验，就只能挂在到函数名上
```jsx
// 函数组件，参数是props
function Person(props) {
  const {name, age} = props;
  return <p>name is {name} and age is {age}</p>
}
Person.propTypes = {}; // 类型的检查
Person.defaultProps = {}; // 默认值的设置

<Person name="xiaoming" age={12}></Person>
```