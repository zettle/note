# 011-render函数

首先要知道vue2中的h函数是做什么的，前往笔记: [vue2/001-render函数](../vue2/001-render函数.html)

到了vue3中，h函数主要有下面几点变化

* h函数不再通过render函数传入，而是我们直接通过`import { h } from 'vue'`方式引入
* 拍平了props和on结构
* scopedSlots删掉，统一到slots

> render函数里面是有this的



## 1、定义html标签
比如在vue2中定义html标签
```vue
render () {
    return h('div', {
        attrs: {
            id: 'box',
            class: 'warp'
        },
        on: {
            click () {}
        }
    }, 'Hello World')
}
```

等价vue3下面代码:
```vue
render () {
    return h('div', {
        id: 'box',
        class: 'warp',
        onClick () {}
    }, 'Hello World')
}
```

> 不再需要包裹在`attrs`和`on`里面，但是事件的注意一定是`onXXX`格式



## 2、定义子组件
```vue
export default {
    props: {
        modelValue: Number
    },
    setup () {
        const num = ref(0);
        const updateNum = () => num.value+=1;
        return {
            num, updateNum
        };
    },
    render () {
        return h('div', {
            onClick: () => {
                this.updateNum();
                this.$emit('update:modelValue', this.$props.modelValue+2);
            }
        }, [
            `子组件count: ${this.$props.modelValue}`,
            `子组件num:${this.num}`,
            this.$slots.default(),
            this.$slots.foot()
        ]);
    }
}
```
* 通过`this.$props`获取父组件传递过来的数据，前提要先定义好`props:{}`
* 通过`this.$emit`广播事件给父组件
* `setup()`返回的内容可以在`render()`中直接使用
* 通过`this.$slots`获取父组件传递过来的插槽




## 3、定义父组件
```js
export default {
    setup () {
        const count = ref(0);
        return {
            count
        };
    },
    render () {
        return h(SonThree, {
            // v-model的传递方式，要拆开传
            modelValue: this.count,
            'onUpdate:modelValue': $event => this.count=$event
        })
    }
}
```
* 引入子组件后即可使用，无需在`components: {}`再声明一次
* `v-model`需要拆属性和监听传递给子组件
* ????slot要怎么传递