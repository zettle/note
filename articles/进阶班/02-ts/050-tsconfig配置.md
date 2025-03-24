# tsconfig配置

## 生成tsconfig文件

安装：`pnpm i -D typescript`

执行`npx tsc --init` 会在项目创建tsconfig.json文件，内容配置如下

```json
{
  "include": [],
  "exclude": [],
  "extends": [],
  "compilerOptions": {
    /* 访问 https://aka.ms/tsconfig 阅读更多关于此文件的信息 */
    /* 项目 */
    // "incremental": true,                              /* 保存 .tsbuildinfo 文件，以便对项目进行增量编译 */
    // "composite": true,                                /* 启用允许 TypeScript 项目使用项目引用的约束 */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* 指定 .tsbuildinfo 增量编译文件的路径 */
    // "disableSourceOfProjectReferenceRedirect": true,  /* 当引用复合项目时，禁用首选源文件而不是声明文件 */
    // "disableSolutionSearching": true,                 /* 在编辑项目时将其从多项目引用检查中移除 */
    // "disableReferencedProjectLoad": true,             /* 减少 TypeScript 自动加载的项目数量 */
    /* 语言和环境 */
    "target": "es2016" /* 编译目标，要兼容什么版本的js语法 */,
    // "lib": [],                                        /* 指定一组描述目标运行环境的捆绑库声明文件 */
    // "jsx": "preserve",                                /* 指定生成的 JSX 代码 */
    // "experimentalDecorators": true,                   /* 启用对传统实验装饰器的实验支持 */
    // "emitDecoratorMetadata": true,                    /* 为源文件中的装饰声明提供设计类型元数据 */
    // "jsxFactory": "",                                 /* 指定 React JSX Emit 目标时使用的 JSX 工厂函数，例如 “React.createElement ”或 “h” */
    // "jsxFragmentFactory": "",                         /* 指定针对 React JSX emit 时用于片段的 JSX 片段引用，如'React.Fragment'或'Fragment */
    // "jsxImportSource": "",                            /* 使用'jsx: react-jsx*'时，指定用于导入 JSX 工厂函数的模块指定符 */
    // "reactNamespace": "",                             /* 指定 “createElement ”调用的对象。这仅适用于以 “react ”JSX 发射为目标时 */
    // "noLib": true,                                    /* 禁止包含任何库文件，包括默认的 lib.d.ts */
    // "useDefineForClassFields": true,                  /* 排放符合 ECMAScript 标准的类字段 */
    // "moduleDetection": "auto",                        /* 控制用于检测模块格式 JS 文件的方法 */
    /* 模块 */
    "module": "commonjs" /* 指定生成的模块代码 */,
    // "rootDir": "./",                                  /* 指定源文件的根目录 */
    // "moduleResolution": "node10",                     /* 指定 TypeScript 如何从给定的模块规范查找文件 */
    // "baseUrl": "./",                                  /* 指定解析非相关模块名称的基本目录 */
    // "paths": {},                                      /* 指定一组条目，将导入重新映射到其他查找位置 */
    // "rootDirs": [],                                   /* 在解析模块时，允许将多个文件夹视为一个 */
    // "typeRoots": [],                                  /* 指定多个类似于“./node_modules/@types ”的文件夹 */
    // "types": [],                                      /* 指定无需在源文件中引用即可包含的类型包名称 */
    // "allowUmdGlobalAccess": true,                     /* 允许从模块访问 UMD 全局 */
    // "moduleSuffixes": [],                             /* 解析模块时要搜索的文件名后缀列表 */
    // "allowImportingTsExtensions": true,               /* 允许导入包含 TypeScript 文件扩展名。需要设置“--moduleResolution bundler ”和“--noEmit ”或“--emitDeclarationOnly” */
    // "resolvePackageJsonExports": true,                /* 解析软件包导入时使用 package.json 'exports' 字段 */
    // "resolvePackageJsonImports": true,                /* 解析包导入时使用 package.json 的 “import ”字段 */
    // "customConditions": [],                           /* 解析导入时，除了解析器特定的默认设置外，还要设置的条件 */
    // "resolveJsonModule": true,                        /* 启用导入 .json 文件 */
    // "allowArbitraryExtensions": true,                 /* 只要有声明文件，就可以导入任何扩展名的文件 */
    // "noResolve": true,                                /* 禁止 “import”、“require ”或“<reference>”扩展 TypeScript 应添加到项目中的文件数量 */
    /* JavaScript 支持 */
    // "allowJs": true,                                  /* 允许 JavaScript 文件成为程序的一部分。使用 “checkJS ”选项可从这些文件中获取错误信息 */
    // "checkJs": true,                                  /* 在经过类型检查的 JavaScript 文件中启用错误报告功能 */
    // "maxNodeModuleJsDepth": 1,                        /* 指定用于检查 “node_modules ”中 JavaScript 文件的最大文件夹深度。仅适用于 “allowJs” */
    /* 输出 */
    // "declaration": true,                              /* 从项目中的 TypeScript 和 JavaScript 文件生成 .d.ts 文件 */
    // "declarationMap": true,                           /* 为 d.ts 文件创建源映射 */
    // "emitDeclarationOnly": true,                      /* 只输出 d.ts 文件，不输出 JavaScript 文件 */
    // "sourceMap": true,                                /* 为输出的 JavaScript 文件创建源映射文件 */
    // "inlineSourceMap": true,                          /* 在输出的 JavaScript 文件中包含源映射文件 */
    // "outFile": "./",                                  /* 指定一个文件，将所有输出捆绑到一个 JavaScript 文件中。如果 “declaration ”为 true，则也指定一个将所有 .d.ts 输出捆绑在一起的文件 */
    // "outDir": "./",                                   /* 为所有输出文件指定一个输出文件夹 */
    // "removeComments": true,                           /* 移除代码中的注释 */
    // "noEmit": true,                                   /* 禁用从编译中发射文件 */
    // "importHelpers": true,                            /* 允许在每个项目中导入一次 tslib 的辅助函数，而不是在每个文件中导入 */
    // "importsNotUsedAsValues": "remove",               /* 为仅用于类型的导入指定发射/检查行为 */
    // "downlevelIteration": true,                       /* 为迭代排放更合规、但冗长且性能较差的 JavaScript */
    // "sourceRoot": "",                                 /* 指定调试器查找参考源代码的根路径 */
    // "mapRoot": "",                                    /* 指定调试器查找映射文件的位置，而不是生成的位置 */
    // "inlineSources": true,                            /* 在源代码映射中将源代码包含在发射的 JavaScript 中 */
    // "emitBOM": true,                                  /* 在输出文件的开头输出一个 UTF-8 字节顺序标记（BOM） */
    // "newLine": "crlf",                                /* 设置发射文件的换行符 */
    // "stripInternal": true,                            /* 禁用在 JSDoc 注释中带有“@internal ”的声明 */
    // "noEmitHelpers": true,                            /* 禁止在编译输出中生成类似“__extends ”的自定义辅助函数 */
    // "noEmitOnError": true,                            /* 如果报告了类型检查错误，则禁止生成文件 */
    // "preserveConstEnums": true,                       /* 禁用删除生成代码中的'const enums'声明 */
    // "declarationDir": "./",                           /* 指定生成声明文件的输出目录 */
    // "preserveValueImports": true,                     /* 在 JavaScript 输出中保留未使用的导入值，否则这些值将被删除 */
    /* 操作限制 */
    // "isolatedModules": true,                          /* 确保每个文件都能安全地转译，而无需依赖其他导入，export类型的时候要加type */
    // "verbatimModuleSyntax": true,                     /* 不转换或省略任何未标记为纯类型的导入或导出，确保它们根据 “模块 ”设置以输出文件的格式写入 */
    // "allowSyntheticDefaultImports": true,             /* 当模块没有默认导出时，允许 “import x from y */
    "esModuleInterop": true /* 放出额外的 JavaScript，以简化对 CommonJS 模块导入的支持。这将启用 “allowSyntheticDefaultImports”，以实现类型兼容性 */,
    // "preserveSymlinks": true,                         /* 禁用将符号链接解析为其真实路径。这与 node 中的标志相同 */
    "forceConsistentCasingInFileNames": true /* 确保导入文件的大小写正确 */,
    /* 类型检查 */
    "strict": true /* 启用所有严格的类型检查选项 */,
    // "noImplicitAny": true,                            /* 启用隐含 “any ”类型的表达式和声明的错误报告 */
    // "strictNullChecks": true,                         /* 进行类型检查时，考虑 “null ”和 “undefined” */
    // "strictFunctionTypes": true,                      /* 分配函数时，检查以确保参数和返回值是子类型兼容的 */
    // "strictBindCallApply": true,                      /* 检查 “绑定”、“调用 ”和 “应用 ”方法的参数是否与原始函数一致 */
    // "strictPropertyInitialization": true,             /* 检查已声明但未在构造函数中设置的类属性 */
    // "noImplicitThis": true,                           /* 当'this'的类型为'any'时启用错误报告 */
    // "useUnknownInCatchVariables": true,               /* 将捕获子句变量默认为 “unknown ”而不是 “any” */
    // "alwaysStrict": true,                             /* 确保始终发出 “use strict” */
    // "noUnusedLocals": true,                           /* 在未读取局部变量时启用错误报告功能 */
    // "noUnusedParameters": true,                       /* 当函数参数未被读取时引发错误 */
    // "exactOptionalPropertyTypes": true,               /* 按写入的可选属性类型解释，而不是添加 “undefined” */
    // "noImplicitReturns": true,                        /* 对函数中没有明确返回的代码路径启用错误报告功能 */
    // "noFallthroughCasesInSwitch": true,               /* 在 switch 语句中启用针对穿墙情况的错误报告 */
    // "noUncheckedIndexedAccess": true,                 /* 在使用索引访问类型时添加 “undefined” */
    // "noImplicitOverride": true,                       /* 确保派生类中的覆盖成员使用覆盖修饰符标记 */
    // "noPropertyAccessFromIndexSignature": true,       /* 对使用索引类型声明的键强制使用索引访问器 */
    // "allowUnusedLabels": true,                        /* 禁用未使用标签的错误报告 */
    // "allowUnreachableCode": true,                     /* 禁用无法到达代码的错误报告 */
    /* 完整性 */
    // "skipDefaultLibCheck": true,                      /* 跳过 TypeScript 附带的 .d.ts 文件的类型检查 */
    "skipLibCheck": true /* 跳过所有 .d.ts 文件的类型检查 */
  }
}
```

`tsconfig.json`文件主要供`tsc`编译器使用，它的命令行参数`--project`或`-p`可以指定`tsconfig.json`的位置（目录或文件皆可）。

```sh
tsc -p ./dir
```

如果不指定配置文件的位置，`tsc`就会在当前目录下搜索`tsconfig.json`文件，如果不存在，就到上一级目录搜索，直到找到为止。

其中配置最多的是`compilerOptions` ，配置ts的一些列规则



## 使用别人的预设配置

除了执行 `npx tsc --init` 生成配置文件，我们可以用别人预设好的一些配置。

npm 的`@tsconfig`名称空间下面有很多模块，都是写好的`tsconfig.json`样本，比如 `@tsconfig/recommended`和`@tsconfig/node16`。

这些模块需要安装，以`@tsconfig/deno`为例。

```
npm install --save-dev @tsconfig/deno
```

在`tsconfig.json`里面引用这个模块

```json
{
  "extends": "@tsconfig/deno/tsconfig.json"
}
```

@tsconfig/xxx的[github仓库](https://kkgithub.com/tsconfig/bases/tree/main/bases)，能看到目前有的预设



## 配置详解

### 1、include / exclude 

`include`：指定哪些文件需要编译

`exclude`：必须与`include`属性一起使用，用来从编译列表中去除指定的文件

这2个配置都支持下面的通配符

- `?`：指代单个字符
- `*`：指代任意字符，不含路径分隔符
- `**`：指定任意目录层级。

```json
{
  "include": ["./src/**/*"],
  "exclude": []
}
```

## 2、extends

继承哪些配置，可以是本地文件，也可以是node_modules

```json
{
  "extends": "../tsconfig.base.json"
}
```

## 3、files

`files`属性指定编译的文件列表，如果其中有一个文件不存在，就会报错。

它是一个数组，排在前面的文件先编译。

```
{
  "files": ["a.ts", "b.ts"]
}
```

该属性必须逐一列出文件，不支持文件匹配。如果文件较多，建议使用`include`和`exclude`属性。

## 4、references

`references` 的 `path` 属性，既可以是含有文件 `tsconfig.json` 的目录，也可以直接是该文件

```json
{
  "references": [
    { "path": "../pkg1" },   // 指向文件夹
    { "path": "../pkg2/tsconfig.json" }  // 指向文件
  ]
}
```

与此同时，被应用的项目的 `tsconfig.json` 必须启用 `composite` 属性，比如上面的 `pkg1/tsconfig.json` 和 `pkg2/tsconfig.json` 都需要配置下面

```json
{
  "compilerOptions": {
    "composite": true
  }
}
```



