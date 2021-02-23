# 001-render函数

一般我们定义组件的html是通过`<template>`
```vue
<template>
    <div>Hello World</div>
</template>
<script>
export default {
    name: 'HelloWorld'
}
</script>
```

有时候我们借助render函数更加方便，vue底层也是将`<template>`转为render函数的

```vue
<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    render (h) {
        return h('div', {}, 'Hello World')
    }
}
</script>
```
结果为:
```html
<div>Hello World</div>
```

render的h函数接受3个参数:
* 第1个参数是标签，也可以是自定义组件
* 第2个参数是一个JSON，支持下面字段
```js
{
    props: {}, // 作为props传递给子组件
    attrs: {}, // 作为DOM的attrs属性
    on: {}, // 加事件
    scopedSlots: {} // 传递具名插槽
}
```
* 第3个参数接受字符串或数组，如果是字符串就是标签的文字，如果是数组，则数组每个元素表示一个标签


## 1、又render又template的情况
如果又有render函数又有`<template>`，vue只会认`<template>`
```vue
<template>
    <div>111</div>
</template>
<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    render (h) {
        return h('div', {}, 'Hello World')
    }
}
</script>
```
结果为
```html
<div>111</div>
```



## 2、 定义属性
h函数的第2个参数接受一个`{attrs:{}, on: {}}`的JSON格式，其中`attrs`为定义属性，`on`为添加监听事件
```vue
render (h) {
    return h('div', {
        attrs: { 
            class:'warp', 
            id:'box' 
        },
        on: {
            click: () => {
                this.say(); // 调用methods的方法
            }
        }
    }, 'Hello World')
},
methods: {
    say () {
        console.log('say fun');
    }
}
```
结果:
```html
<div class="warp" id="box">Hello World</div>
```




## 3、创建子标签
render的h函数的第3个参数，可以再调用h函数
```vue
render (h) {
    return h('ul', {}, [
        'Hello World',
        h('li', {}, '第1个li'), // 创建li标签
        h('li', {}, '第2个li'),
        h('li', {}, '第3个li')
    ])
}
```
结果
```html
<ul>
    Hello World
    <li>第1个li</li>
    <li>第2个li</li>
    <li>第3个li</li>
</ul>
```


## 4、创建自定义组件
h的第1个参数除了字符串，还可以是我们定义的组件，这个时候，第3个参数就会作为slot传递给子组件
```vue
return h(Son, {
    props: {
        count: this.age
    },
    attrs: { 
        class:'warp', 
        id:'box' 
    },
    on: {
        // 监听子组件emit来的数据
        confirm: (data) => {
            console.log('子组件发来的数据', data);
        }
    }
}, 'Hello World'); // 作为默认slot传递过去
```


## 5、传递具名slot
通过上面我们知道，第3个参数会作为默认插槽传递给子组件

当子组件有多个插槽的时候，我们需要在第2个参数中传递`{scopedSlots}`
```vue
render (h) {
    return h(Son, {
        props: {
            count: this.age
        },
        attrs: { 
            class:'warp', 
            id:'box' 
        },
        on: {
            // 监听子组件emit来的数据
            confirm: (data) => {
                console.log('子组件发来的数据', data);
            }
        },
        scopedSlots: {
            // 这里的key将传递给同名`<slot name="foot">`
            foot: (scope) => {
                return h('button', {}, '按钮')
            }
        }
    }, 'Hello World')
}
```

