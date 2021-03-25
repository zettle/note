# 100-router


## 1、散记

### 1.1 next()里面有replace

比如在路由守卫判断是否有登录token，没有就跳到登录，并且要用replace的方式
```js
router.beforeEach((to, from, next) => {
    const token = storage.get(ACCESS_TOKEN);
    if (token) {
        console.log('有token');
        next();
    } else {
        if (allowList.includes(to.name as string)) {
            next();
        } else {
            // replace:true 表示用replace的方式
            next({ path: '/login', query: { redirect: to.fullPath }, replace: true });
        }
    }
});
```


### 1.2 路径简写

```js
{
    path: '/course',
    component: Layout,
    children: [{
        path: '', // 不必写成`path:'/couse'`
        name: 'courseList',
        component: () => import('@/views/course/list.vue'),
        meta: { title: '课程列表', icon: 'el-icon-notebook-2' }
    },{
        path: ':id', // 不必写成`path:'/couse/:id'`
        name: 'courseDetail',
        component: () => import('@/views/course/detail.vue'),
        meta: { title: '课程列表', icon: 'el-icon-notebook-2' }
    }]
}
```