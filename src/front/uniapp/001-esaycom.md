# 001-esaycom

uniapp自带easycom模式，比如页面有引用某个组件，写法如下
```js
import Navbar from '@/components/navbar/navbar.vue';
export default {
    components: {
        Navbar
    }
}
```
即通过`components/组件名称/组件名称.vue`引用，则可以不用写上面代码，直接使用
```html
<navbar></navbar>
```

easycom方式引入组件不是全局引入，而是局部引入