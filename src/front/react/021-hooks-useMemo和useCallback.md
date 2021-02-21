# 021-hooks-useMemo和useCallback



## 1、useMemo
类似vue的computed，首先我们来看下面这个场景
```jsx
export default function ChildFun () {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('小明');
    // 将count*2
    function doubleCount () {
        console.log('执行了doubleCount');
        return count*2;
    }
    return (
        <div className="child-fun">
            <button onClick={() => setCount(count+1)}>{doubleCount()}</button>
            <button onClick={() => setName(name+'a')}>{name}</button>
        </div>
    );
}
```
按钮一展示的文案是`{count*2}`，无论我们只改变了count的值还是改变name的值，都会触发`doubleCount()`的调用，如下:

![](./img/useMemo-1.gif)

当我们支持改变name的值的时候，其实执行`doubleCount()`是一种浪费行为。所以可以用`useMemo()`来声明一个计算属性

```jsx
export default function ChildFun () {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('小明');
    
    const doubleCount = useMemo(() => {
        console.log('执行了doubleCount');
        return count*2;
    }, [count]);

    return (
        <div className="child-fun">
            <button onClick={() => setCount(count+1)}>{doubleCount}</button>
            <button onClick={() => setName(name+'a')}>{name}</button>
        </div>
    );
}
```

* `useMemo()`接受第2个参数是一个数组，数组里面有元素改变了，就会触发`useMemo()`的回调。

比如硬是这么写，那么count/name改变都会触发里面的回调
```jsx
const doubleCount = useMemo(() => {
    console.log('执行了doubleCount');
    return count*2;
}, [count, name]); // 明明回调里面没有用到name，还硬要写上
```


### 1.1 同时改变状态
当多次调用改变状态的时候，`useMemo()`只会执行一次
```jsx
export default function ChildFun () {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('小明');

    const doubleCount = useMemo(() => {
        console.log('执行了doubleCount');
        return (count*2)+name;
    }, [count, name]);

    // 同时改变name/count的值，useMemo()也是只执行一次
    function say () {
        setCount(count+1);
        setName(name+'a');
    }

    return (
        <div className="child-fun">
            <button onClick={ () => say() }>{doubleCount}</button>
        </div>
    );
}
```





## 2、useCallback
和`useMemo()`作用类似，也是当依赖列表数据发生改变的时候，才会触发回调

和`useMemo()`不同，`useMemo()`返回的是一个值并将其缓存，`useCallback()`返回的是一个函数并将其缓存
```jsx
export default function ChildFun () {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('小明');

    const doubleCount = useMemo(() => {
        console.log('useMemo');
        return count*2;
    }, [count]);

    const doubleCountFn = useCallback(() => {
        console.log('useCallback');
        return count*2;
    }, [count]);

    return (
        <div className="child-fun">
            <p>count: {count}</p>
            <p>doubleCount: {doubleCount}</p>
            <p>doubleCountFn: {doubleCountFn()}</p>
            <button onClick={ () => setCount(count+1) }>改变count</button>
            <button onClick={ () => setName(name+'a') }>改变name</button>
        </div>
    );
}
```
所以在html中，要写成`doubleCountFn()`这种形式

* 当点击 “改变name” 按钮去改变 name 变量的值，发现 `doubleCountFn()` 里面的会执行一次。 这里要正确的理解 `useCallback()`返回的是一个函数并将其缓存，这里缓存的是函数这个本身，并不代表不会被调用触发，在改变 name 变量后，触发了`render()`，而html中有句`<p>doubleCountFn: {doubleCountFn()}</p>` 这里会调用一次函数，所以函数方法体执行了，导致我们的 `useCallback()` 明明没有依赖 name变量，name变量一改变也会调用方法体，所以看到控制台会打印1次



**如何验证函数有缓存起来**

我们可以借用Set数据结构，如果前后函数都是同一个，那么存不到Set里面去
```jsx
export default function ChildFun () {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('小明');

    const doubleCountFn = useCallback(() => {
        return count*2;
    }, [count]);
    mySet.add(doubleCountFn);
    console.log('size', mySet.size);

    return (
        <div className="child-fun">
            <p>count: {count}</p>
            <p>doubleCountFn: {doubleCountFn()}</p>
            <button onClick={ () => setCount(count+1) }>改变count</button>
            <button onClick={ () => setName(name+'a') }>改变name</button>
        </div>
    );
}
```
* 当依赖项 count 变量改变的时候，`set.size`里面会累加，说明存进去的是一个新函数了。当改变 name 变量的时候，`set.size`不变，说明存进去的是旧函数，set不允许存重复元素


**使用场景**

在传递给子组件的时候，子组件通过`useEffect()`监听普通函数和`useCallback()`返回的函数，就会有不同现象
```jsx
export default function ChildFun () {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('小明');

    const doubleCountFn = useCallback(() => {
        return count*2;
    }, [count]);
    
    const double2 = () => {
        return count*2;
    };

    return (
        <div className="child-fun">
            <p>count: {count}</p>
            <p>doubleCountFn: {doubleCountFn()}</p>
            <button onClick={ () => setCount(count+1) }>改变count</button>
            <button onClick={ () => setName(name+'a') }>改变name</button>

            <Grandson cb={doubleCountFn} cc={double2}></Grandson>
        </div>
    );
}

function Grandson (props) {
    useEffect(() => {
        console.log('useEffect1执行了');
    }, [props.cb])

    useEffect(() => {
        console.log('useEffect2执行了');
    }, [props.cc])
    return (
        <div>
            <p>this is 孙子</p>
        </div>
    );
}
```

现象: `useEffect()`当依赖发生改变的时候，会执行回调函数，上面`props.cb`是经过`useCallback()`处理的函数（依赖于count变量），当我们改变 name 变量的时候，`useCallback()`返回的还是原来的函数，所以 `<Grandson cb={doubleCountFn} />` 中传递 props.cb 还是原来的函数，