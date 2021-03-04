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