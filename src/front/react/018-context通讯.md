# 018-context通讯

context特别适合祖孙组件通讯

类似vue的`privide`和`inject`，用来解决如果跨了很多层级组件的时候，祖先组件和后代组件的数据通讯。


## 一、基本概念

react有2个角色，一个是Provider，一个是Consumer。Provider在外成的组件，内部需要数据的，就用Consumer来读取。

```js
const Context = React.createContext();
const ContextProvider = Context.Provider; // Context.Privider不是方法，是个组件
const ContextConsumer = Context.Consumer; 

<div>
    <h1>hello</h1>
    {/* value固定，不能改为其他 */}
    <ContextProvider value={person}>
        <ContextConsumer>
            {(person) => {
                return (
                    <div>
                        <p>姓名：{person.name}</p>
                        <button type="button" onClick={person.sayHello}>触发</button>
                    </div>
                );
            }}
        </ContextConsumer>
    </ContextProvider>
</div>
```
在`ContextProvider`中，通过`value`属性往下层传递，后代组件通过函数并接受`value`得到传递过来的数据

注意下，在Provider中的value属性名不能改成其他的。

完整的代码如下
```js
// personContext.js 代码（作为2端的中间通讯层）

import React from 'react';

const Context = React.createContext();
const ContextProvider = Context.Provider; // Context.Privider不是方法，是个组件
const ContextConsumer = Context.Consumer; 
export {ContextProvider, ContextConsumer};
```

```js
// App.js 代码（作为祖先组件）
import React from 'react';
import Son from './Son';
import { ContextProvider } from './personContext';

const person = {
    name: '小明',
    sayHello () {
        console.log('hello');
    }
};

export default class extends React.Component {
    render() {
        return (
            <div>
                <h1>hello</h1>
                {/* value固定，不能改为其他 */}
                <ContextProvider value={person}>
                    <Son></Son>
                </ContextProvider>
            </div>
        );
    }
}
```

```js
// Son.js 代码 （作为后台组件）
import React from 'react';
import { ContextConsumer } from './personContext';

export default class extends React.Component {
    render () {
        return (
            <div>
                <h2>这是son组件</h2>
                <ContextConsumer>
                    {(person) => {
                        return (
                            <div>
                                <p>姓名：{person.name}</p>
                                <button type="button" onClick={person.sayHello}>触发</button>
                            </div>
                        );
                    }}
                </ContextConsumer>
            </div>
        );
    }
}
```




## 二、 改造成HOC
从上面可以看出`App.js`和`Son.js`其实就是一个组件（`ContextProvider` 和 `ContextConsumer`）包含这另外一个组件，这种就可以改造为HOC。

比如`App.js`可以改造成下面的
```js
import React from 'react';
import Son from './Son';
import { ContextProvider } from './personContext';

const person = {
    name: '小明',
    sayHello () {
        console.log('hello');
    }
};

function providerHoc (Com) {
    return props => (
        <ContextProvider value={person}>
            <Com {...props}></Com>
        </ContextProvider>
    )
}

class App extends React.Component {
    render() {
        return (
            <Son></Son>
        );
    }
}

export default providerHoc(App);
```

`Son.js`可以改造成下面的
```js
import React from 'react';
import { ContextConsumer } from './personContext';

function withComsumer (Com) {
    class WithComsumerCom extends React.Component {
        render () {
            return (
                <ContextConsumer>
                    {personInfo => {
                        return (
                            // 把personInfo作为参数再传递进去
                            <Com {...this.props} personInfo={personInfo}></Com>
                        );
                    }}
                </ContextConsumer>
            );
        }
    }
    return WithComsumerCom;
}

class Son extends React.Component {
    render () {
        return (
            <div>
                <h5>这是Son</h5>
                <p>姓名：{this.props.personInfo.name}</p>
            </div>
        );
    }
}

export default withComsumer(Son);
```

