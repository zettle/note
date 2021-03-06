# 010-scriptSetup语法

scriptSetup语法，3.0.3版本后可用，不过vscode里面的vetur插件会报很多错误
* [文档1](https://github.com/vuejs/rfcs/blob/script-setup/active-rfcs/0000-script-setup.md)
* [文档2](https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md)

除了vue版本升级，也需要把`@vue/compiler-sfc`也升级下`npm i -D @vue/compiler-sfc@lastest`


## 1、定义响应变量和方法
定义ref数据有2种方式
```js
<script lang="ts" setup>
import {ref} from 'vue';
const count = ref(0);
const addHandle = () => {
    count.value++;
};
</script>
```

也可以用下面的ref语法糖
```js
<script setup>
ref: count = 0;

const addHandle = ()=> {
  count++;
  console.log($count); // 得到的是ref对象
  console.log(count); // 得到的数值，相当于$count.value  
}
</script>
```




## 2、引入组件
直接import即可
```js
<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
</script>
```

* 不需要再写`components`声明组件了




## 3、定义props
定义props
```js
<script lang="ts" setup>
import {defineProps} from 'vue';
const props = defineProps({
    msg: String
});
</script> 
```
如果视图想要用用到props，比如`{{props.msg}}`，则需要给setup加上props
```vue
<template>
    <p>{{props.msg}}</p>
</template>
<script lang="ts" setup="props">
// 下面的也不能省略
const props = defineProps({
    msg: String
});
</script>
```


## 4、获取context
获取`setup()`函数的第2个参数context

通过`useContext()`获取
```js
<script lang="ts" setup>
import {useContext} from 'vue';
const context = useContext();
console.log(useContext());
</script>
```




## 5、定义emits
定义`emits`
```js
<script lang="ts" setup>
import {defineEmit} from 'vue';
const emit = defineEmit(['bian']);
const say = () => {
    emit('bian', {name:'xiaoming'})
};
</script>
```
我们也可以使用上面的`useContext()`
```js
<script lang="ts" setup>
import {defineEmit, useContext} from 'vue';
const context = useContext();

defineEmit(['bian']);
const say = () => {
    context.emit('bian', {name:'xiaoming'})
};
</script>
```




## 6、通过ref获取子组件的方法
当子组件是通过普通vue3语法写的，然后父组件通过ref获取是没有问题。

如果子组件也是用scriptSetup语法写的，通过ref获取到的是一个空对象
```js
// Child.vue 子组件
<script lang="ts" setup>
const say = () => {
    console.log('this is say');
}
</script>
```

父组件通过ref获取子组件的方法，得到的是一个空对象
```js
<script lang="ts" setup>
import Child from '@/components/Child.vue';  
import {ref,  onMounted} from 'vue';
const foo = ref(null);
onMounted(() => {
    console.log(foo.value); // 得到的是一个{}空对象
});
</script>
```

在vue中需要借助`conext.expose()`在子组件中明确声明出暴露给外界的方法

```js
// Child.vue 子组件
<script lang="ts" setup>
import {useContext, ref} from 'vue';

const conext = useContext();
conext.expose({
    say () {
        console.log('this is say 2'); // 就算有同步的say()，父组件调用的时候，也会调`conext.expose`里面的方法
    }
});
const say = () => {
    console.log('this is say');
}
</script>
```



## 7、inheritAttrs的写法
在vue3中，我们是这么设置inheritAttrs:
```js
<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    inheritAttrs: false
});
</script>
```

使用scriptSetup语法，不在js设置了，放在`<template />`上
```html
<template inherit-attrs="false">
    <div>this is child</div>
</template>
```




