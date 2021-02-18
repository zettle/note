# 019-hooks

hooks是为函数组件为生
```jsx
function App () {
  return <h1>Hello</h1>
}

ReactDOM.render(<App />, document.getElementById('root'));
```
我们知道，函数组件是没有state状态的

所以hooks的出现改变了这一现象




## 1、useState
`useState()`方法
* 接收一个值，该值会作为默认值
* 返回一个数组，数组第1个元素是设置的值，第2个元素是改变值的方法

```jsx
import {useState} from 'react';

export default function Child () {
    const [count, setCount] = useState(0); // 调用第2个方法既可改变值
    const changeCount = () => {
        setCount(count+1);
    }
    return (
        <div>
            {count} 
            <button onClick={changeCount}>改变</button>
        </div>
    )
}
```



## 2、useEffect