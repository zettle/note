# 001-vscode认识alias

有时候我们会在webpack定义各种路径

```js
config.resolve
    .alias
    .set('@', resolve('./src'))
    .set('@assets', resolve('src/assets'))
    .set('@com', resolve('src/components'))
```

定义之后webpack认识了，但是vscode不认识

如果是ts项目，我们在`tsconfig.json`修改里面
```js
{
    "compilerOptions": {
        "paths": {
            "@/*": ["src/*"],
            "@assets/*": ["src/assets/*"],
            "@com/*": ["src/components/*"]
        }
    }
}

```

这样在vscode也可以通过双击路径到达指定的文件

如果是js项目，则在`jsconfig.json`修改
```js
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"],
            "@assets/*": ["src/assets/*"],
            "@com/*": ["src/components/*"]
        }
    }
}
```
