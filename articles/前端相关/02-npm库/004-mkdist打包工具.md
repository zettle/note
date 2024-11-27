# mkdist打包工具

[mkdist](https://github.com/unjs/mkdist)是一个很轻量级的打包工具，特别适合用来打包一些纯js的库，使用esbuild进行构建。

之前我们介绍了unbuild和rollup，打包会将所有源码，最后打包进入一个`dist/index.js`文件，破快了源码的目录结构。



## 简单使用

安装：`pnpm i -D mkdist`

新建项目代码目录如下

```text
├── package.json
├── pnpm-lock.yaml
└── src
    ├── index.ts
    └── tool.ts
```

执行命令`npx mkdist` 即可，默认就会从src打包编译到dist目录，命令参数如下 

```shell
npx mkdist [rootDir] [--src=src] [--dist=dist] [--pattern=glob [--pattern=more-glob]] [--format=cjs|esm] [-d|--declaration] [--ext=mjs|js|ts]
```



## 脚本调用

也可以通过node脚本的方式调用，新建文件`build.ts`，内容如下：

```ts
import { mkdist } from 'mkdist';

mkdist({
  srcDir: './src/',
  distDir: './dist/',
  format: 'esm', // 可选，指定输出格式
  cleanDist: true, // 可选，清理目标目录
});
```

因为是ts文件，我们可以使用tsx来执行，执行 `tsx build.ts` 即可

> 支持的配置项见：https://github.com/unjs/mkdist/blob/main/src/make.ts#L18

