# tsconfig配置

## tsconfig.json的各项配置

安装：`pnpm i -D typescript`

执行`pnx tsc --init` 会在项目创建tsconfig.json文件，内容配置如下

```json
{
    
    "rootDir": "./", // 源目录，默认 './'
    "outDir": "./",  // 输出目录，默认'./'
}
```