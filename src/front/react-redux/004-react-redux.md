# 002-react-redux

redux是第三方出的一个js库，和react没有大的关系，随着用的人越来越多，react官网团队推出了一个[react-redux](https://www.redux.org.cn/docs/react-redux/)，用以简化redux的操作流程

```
npm i redux redux-thunk react-redux
```
* `redux`: redux核心库
* `redux-thunk`: 让redux支持异步action
* `react-redux`: facebook出品，简化`react+redux`开发

[【项目demo】](https://github.com/zettle/practice/tree/main/react-redux-learn)

## 1、如何使用react-redux

### 1.1 项目结构
```
├─ src
│   ├─ components
│   │   ├─ Calculator   // Calculator组件
│   │   └─ Person       // Person组件
│   │
│   ├─ redux
│   │   ├─ actions          // 声明各个action
│   │   │   ├─ count.js
│   │   │   └─ person.js
│   │   ├─ reducers         // 集合各个reducer，然后对外暴露
│   │   │   ├─ count.js
│   │   │   ├─ person.js 
│   │   │   └─ index.js  
│   │   ├─ constant.js      // 定义各个actionName常量
│   │   └─ store.js         // redux的store
│   │
│   ├─ App.js       // 主组件
│   └─ index.js     // 主入口
```


### 1.2 编写代码
1. 在`/src/index.js` 用 `<Provider />` 组件包裹整个 `<App />` 组件

目的是让App所有的后代容器组件（`connet()()`返回的就是容器组件）接收到store

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

2. 在`/src/App.js`中引用要展示的2个组件
```jsx
import React, { Component } from 'react';
import Calculator from './components/Calculator';
import Person from './components/Person';

export default class App extends Component {
    render() {
        return (
            <div>
                <Calculator></Calculator>
                <hr/>
                <Person></Person>
            </div>
        )
    }
}
```

3. 在`/src/redux/store.js`编写redux主入口
```js
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// 经过combineReducers()汇总后的reducer
import reducers from './reducers';

export default createStore(reducers, applyMiddleware(thunk));
```

4. 在`/src/redux/reducers/index.js`中维护好reducers的集合

所有的reducers在这里集合然后再暴露给store
```js
import {combineReducers} from 'redux';

import count from './count';
import person from './person';

// 汇总所有的reducer变为一个总的reducer
export default combineReducers({
    myCount: count, // 这里的key在页面使用connect创建连接时候使用
    person
});
```

5. 编写`<Calculator />`组件的reducers和actions服务

在`/src/redux/reducers/count.js`编写reducers
```js
import { INCREMENT } from '../constant';

const initState = 0;
export default function count (preState = initState, action) {
    // 根据type决定如何加工数据，action.type=指定值的说明是页面发来的，没有action的说明是初始化
    switch(action.type) {
        case INCREMENT:
            return preState + action.data;
        // case ...:
        //     return ...;
        default:
            return preState;
    }
}
```

> * 默认数据要放在前面是一个好习惯，这样一眼就知道默认数据是什么
> * reducers本质是一个函数，里面根据`action.type`来做不同处理，没有`action.type`说明是数据初始化阶段


在`/src/redux/action/count.js`编写actions
```js
import {INCREMENT} from '../constant';

// 创建同步{type:'increment', data}的action
export function createAddAction (data) {
    return {type:INCREMENT, data};
}
```


6. 封装UI组件，将其转为容器组件

编写`/src/components/Calculator/index.jsx`
```jsx
import React, { Component } from 'react'
import {connect} from 'react-redux';
import {createAddAction} from '../../redux/actions/count';

// UI组件
class Count extends Component {
    state = {
        num: 0
    }
    add () {
        // 调用下面connect定义好的dispatch
        this.props.jia(2);
    }
    render() {
        const {num, personLen} = this.props;
        return (
            <div>
                <p>这是Calculator组件，下面组件人数:{personLen}</p>
                <p>计算结果: {num}</p>
                <button onClick={()=>this.add()}>计算+2</button>
            </div>
        )
    }
}

// 使用connect()()转为容器组件
export default connect(
    // 定义的数据，将作为props传递`<Count>`组件
    (state) => {
        return {  
            num: state.myCount
        };
    },
    // 定义的动作，将作为props传递`<Count>`组件
    (dispatch) => {
        return {
            jia: (data) => dispatch(createAddAction(data))
        };
    }
)(Count);
```
> * 使用react-redux有一个准则，就是UI组件里面不要看到任何redux（`state/dispatch`等字样）的代码，关于redux的代码都放到容器组件里面
> * `connect(<函数A>,<函数B>)(<UI组件>)`的作用是将组件转为容器组件，这样就可以接受到redux数据了
>   * 第1个参数是接受2个函数，其返回值将作为UI组件的props属性传递过去
>   * 第2个参数传递我们的UI组件
> * `函数B`除了可以是一个函数，也可以是一个JSON格式

可以简写为下面
```jsx
export default connect(
    state => ({
        num: state.myCount,
        personLen: state.person.length
    }),
    // 用json的写法
    {
        jia: (data) => createAddAction(data)  // redux发现这里是一个action，就会自动去派发
    }
)(Count);
```

自此，组件`<Calculator />`封装完成



7. `<Person />`组件的异步action
`<Person />`组件的添加用户，是需要经过后台的（用setTimeout模拟）,这是一个异步action

编写`/src/redux/actions/person.js`

```jsx
import {ADD_PERSON} from '../constant';

// 同步action，本质是返回一个JSON格式，格式`{type:<action名称>, data:<data>}`
export const createAddPersonAction = (data) => ({type: ADD_PERSON, data});

// 异步action，本质是返回一个函数，该函数接收dispatch方法，在处理完异步后，调用dispath触发同步action
export const createAddPersonAsyncAction = (data) => {
    return (disaptch) => {
        // 用setTimeout模拟网络请求
        setTimeout(() => {
            disaptch(createAddPersonAction(data));
        }, 500);
    }
};
```

> 异步action本质是一个返回一个函数