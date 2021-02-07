# 099-react其他api

* `ReactDOM.unmountComponentAtNode(元素)`: 把组件从指定DOM的元素卸载掉
```js
class App extends React.Component {
  render () {
    return <h1>Hello</h1>
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

setTimeout(() => {
  ReactDOM.unmountComponentAtNode(document.getElementById('root')); // 卸载
}, 1000);
```
> 这个可以用在js里面，让弹窗插件消失
