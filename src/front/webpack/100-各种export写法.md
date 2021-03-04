# 100-各种export写法


## 1、import然后export出去
常规的写法，先import，然后再import
```
import SvgIcon from './svg-icon.vue';

export { SvgIcon };
```

可以简写为下面
```
export { default as SvgIcon } from './svg-icon.vue';
```

