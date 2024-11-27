# pnpm命令

pnpm命令基本和npm一直，只有一小部分不一样



## pnpm workspace

用pnpm开发monorepo模式越来越主流，下面是开发中常用的一些命令

```shell
# 在根目录安装某个依赖包
pnpm add <某个包> -w

# 为某个子包安装依赖
# 比如`pnpm add lodash --filter @xx/yy` 为 `/packages/yy` 添加lodash依赖
pnpm add <要依赖的npm包> --filter <子包package.json中的name>

# 执行子包的某条命令
# 比如`pnpm -C play dev` 执行 `/packages/play` 包中的 dev命令
pnpm -C <子包的文件夹名> <script脚本名>
```

