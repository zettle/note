# 040-tsconfig配置项.md


安装完`npm i -D typescript`后，执行`npx tsc --init`会自动创建tsconfig.json文件

[完整的配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)


## 1、 什么情况ts会用到tsconfig.json
比如执行`tsc main.ts`这种带有一个具体的目标的时候，ts是不会去读取tsconfig.json的

比如我们在tsconfig.json中配置编译自动删除空格
```json
{
    "compilerOptions": {
        "removeComments": true
    }
}
```

而`main.ts`中代码如下:
```ts
// 这是注释噢噢噢噢
const teacher = 'xiaoming';
```

那么在执行`tsc main.ts`的时候，不会删除掉注释。

而执行`tsc`的时候，会发现删除注释了。

原因是`tsc main.ts`的时候，tsc根本不会去读取tsconfig.json的配置。而执行`tsc`的时候，tsc会去读取

如果是使用借助`ts-node`执行`ts-node main.ts`这种命令的话，是会去找`tsconfig.json`的



## 2、 指定哪些文件被编译
在tsconfig.json中可以通过`files/include/exclude`配置哪些文件被编译
```json
{
    "files": ["...."],
    "include": ["...."],
    "exclude": ["...."],
    "compilerOptions": {
    }
}
```



## 3、compilerOptions的配置项目
compilerOptions的配置项很多，[详见](https://www.tslang.cn/docs/handbook/compiler-options.html)

下面列出一些
```json
{
    "compilerOptions": {
        "incremental": true, // 设置true后，每次编译只会编译新增部分的代码，会在根目录生成一个`tsconfig.tsbuildinfo`记录编译信息
        "allowJs": true, // 设置true后会编译js，详见下面
        "checkJs": true, // 设置true后会检查js中语法错误，详见下面
        "sourceMap": true, // 生成sourceMap文件
        "strict": true, // true表示启动所有严格模式 
        "outDir": "./dist", // 输出目录，一般是dist
        "rootDir": "./src", // 输入目录，一边是src
        "removeComments": true, // true表示编译的时候会移除注释
    }
}
```


### 3.1 严格模式
设置`"strict": true`等效把下面的几个设置都设置true
```json
{
    "noImplicitAny": true,  // 设置true，则声明一个any类型的时候必须在代码中明确写出
    "strictNullChecks": true, 
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true, 
    "alwaysStrict": true,
}
```

设置`"noImplicitAny": true`，则下面会提示不行
```ts
// some想要是一个any类型， noImplicitAny=true的时候，就必须明确写出`some:any`
function say (some: any) {

}
```



### 3.2 处理js
```json
{
    "allowJs": true,
    "checkJs": true
}
```

设置`allowJs=true`的作用，我们知道执行`tsc`的时候，tsc不会去处理项目中的js文件，如果想要让tsc也处理项目中的js文件则设置为true

设置`checkJs=true`的作用，tsc会去检查js中的语法问题，比如下面代码:
```js
const a = 'xioaming';
console.log(a.b.c); // 这种就会报错了
```