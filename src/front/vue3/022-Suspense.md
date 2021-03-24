# 022-Suspense

在[021-组件异步组件](./021-组件异步组件.html)中使用了`<Suspense /> + defineAsyncComponent`一起使用

`<Suspense />`还可以下面的使用场景

在vue2中，有这么个场景，一进页面展示骨架屏，等接口返回后才展示内容，这种场景在vue2中是这么处理
```vue
<template>
    <div>
        <div v-if="!loading">
            ...
        </div>
        <div v-if="loading">
            加载中...
        </div>
    </div>
</template>
```

而在vue3中，提供了`<Suspense />`组件给我们使用
```vue
// async.vue子组件
<template>
    <div>
        <h4>这个是一个异步加载数据</h4>
        <p>msg：{{result}}</p>
    </div>
</template>

<script>
import { defineComponent } from "vue"
function ajax () {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({code: 0, msg: 'ok'})
        }, 2000);
    });
}
export default defineComponent({
    setup(){
        // setup里面需要返回一个promise
        return new Promise((resolve) => {
            ajax().then(resp => {
                return resolve({
                    result: 100
                })
            });
        })
    }
});
```

然后父组件就可以这么写
```vue
// 父组件
<template>
    <Suspense>
        <template #default>
            <async></async>
        </template>
        <template #fallback>
            <div>
                Loading2...
            </div>
        </template>
    </Suspense>
</template>
<script lang="ts">
import Async from "../components/Async.vue";
export default defineComponent({
    Async
})
</script>
```

在ajax请求回来之前，会展示loading，等ajax请求结束后，展示真正的内容


利用`async/await`，还可以简写为下面
```js
export default defineComponent({
    async setup () { // async装饰setup函数
        const res = await ajax();
        console.log('res', res);
        return {
            result: res.msg
        }
    }
});
```