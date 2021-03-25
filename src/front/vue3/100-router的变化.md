# 100-router的变化


## 1、路由模式的配置
vue2中是这么配置
```js
const router = createRouter({
    mode: 'history',
})
```

vue3中是这么配置
```js
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
})
```
`history`支持下面选项:
* `createWebHistory()`: 对应vue2中的history，vue2中的base属性变成了`createWebHistory()`的参数传递进去
* `createWebHashHistory()`: 对应vue2中的hash
* `createMemoryHistory()`: 对应vue2中的abstract，ssr用


## 2、监听route
可以通过watch监听route里面的各个属性，比如下面监听query的变化
```js
watch(()=>route.query, (newVal) => { ... })
```


## 3、`*`号通配符被移除
### 3.1 404页面
```js
{
    path: '/:pathMatch(.*)', // 配置404
    component: () => import('../pages/error/notFound.vue')
}
```


## 4、没有beforeRouterEnter
如果是用compositionApi的写法，则没有onBeforeRouterEnter。

可以这么理解，执行了setup，说明已经路由进入了，这个时候早就过了onBeforeRouterEnter