# 200-vuex自动引入module


store文件夹的结构
```
─store
│  └─module
│      ├─credit.ts
│      └─publicCertify.ts
└─index.ts
```

以往，我们引入module，是通过import引入一个个模块的方式
```ts
import publicCertify from './module/publicCertify';
import credit from './module/credit';

const store = createStore<RootState>({
    modules: { publicCertify, credit }
});
```


现在，借助webpack的`require.context()`自动导入
```ts
// store.js
import { ModuleTree } from 'vuex';
const files = require.context('./module', false, /\.ts$/);
const modules: {[index:string]: ModuleTree<any>} = {};

// 遍历文件夹里面的，然后存到modules对象里面
files.keys().forEach(fileName => { // fileName=`./publicCertify.ts`
    const key = fileName.replace(/(\.\/|\.ts)/g, ''); // 将`./publicCertify.ts`截取成`publicCertify`
    modules[key] = files(fileName).default;
});


const store = createStore<RootState>({
    modules
});
```