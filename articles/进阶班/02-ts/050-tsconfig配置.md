# tsconfig配置

## tsconfig.json的各项配置

安装：`pnpm i -D typescript`

执行`pnx tsc --init` 会在项目创建tsconfig.json文件，内容配置如下

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
    "target": "es2016", /* 编译目标，要兼容什么版本的js语法 */
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
    "module": "commonjs", /* 指定生成的模块代码 */
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
    "esModuleInterop": true, /* 放出额外的 JavaScript，以简化对 CommonJS 模块导入的支持。这将启用 “allowSyntheticDefaultImports”，以实现类型兼容性 */
    // "preserveSymlinks": true,                         /* 禁用将符号链接解析为其真实路径。这与 node 中的标志相同 */
    "forceConsistentCasingInFileNames": true, /* 确保导入文件的大小写正确 */
    /* 类型检查 */
    "strict": true, /* 启用所有严格的类型检查选项 */
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

其中配置最多的是`compilerOptions` ，配置ts的一些列规则

## compilerOptions配置

### 1、lib

配置项目中使用到哪些 js 库，比如下面代码

```ts
const myset = new Set();
document.querySelector(".sd");
```

ts会提示

```text
找不到名称“Set”。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2015”或更高版本
找不到名称“document”。是否需要更改目标库? 请尝试更改 “lib” 编译器选项以包括 “dom”
```

因此我们需要加上配置

```json
{
    "compilerOptions": {
        "lib": ["ESNext", "DOM"]
    }
}
```

这样ts就认识 `Set/document` 语法

支持的配置如下：

* `ESNext`：es的下一语法糖，会时刻以最新的语法
* `DOM`：支持了各种DOM相关的api

#### **不配置lib：**

如果不配置lib，会发现上面的代码也是能正常运行的，这是因为ts对 lib 有着默认的配置

### 2、target

编译后的 js 版本，比如现在有下面代码：

```ts
class Person {
  constructor() {}
  sayHello() {
    return "Hello";
  }
}
```

如果我们设置的是 `{ target: "ES2016" }` 则编译后如下：

```js
class Person {
  constructor() {}
  sayHello() {
    return "Hello";
  }
}
```

因为es7中已经支持了class语法糖

如果我们设置 `{ target: "ES5" }` 则编译结果如下：

```js
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.sayHello = function () {
        return "Hello";
    };
    return Person;
}());
```

### 3、module

编译后要使用什么规范，比如现有代码如下：

```ts
export const cname = "xiaoming";
export default class Person {}
```

如果配置 `{ module:"commonjs" }` 则编译后代码：

```js
Object.defineProperty(exports, "__esModule", { value: true });
exports.cname = void 0;
exports.cname = "xiaoming";
class Person {
}
exports.default = Person;
```

如果配置 `{ module:"ESNext" }` 则编译后代码：

```js
export const cname = "xiaoming";
export default class Person {
}
```

### 4.rootDir / rootDirs / outDir

`rootDir` 配置的是源码的目录。**默认值：**`./`。如果源代码都放在src目录，就可以配置 `{ rootDir:"./src" }`

`outDir` 配置编译后的 js 存放到哪个目录下。**默认值：**`./`。会将js和ts放在一起，我们习惯放在dist目录，那么只需要配置 `{ outDir: "./dist" }`

举个例子，现在有下面文件结构

```text
ts-learn
├── dist
├── src
│   └── index.ts
└── tsconfig.json
```

如果是 `{ rootDir: "./" }` 配置。则是以根目录作为源码路径，编译后的dist目录结构如下：

```text
ts-learn
├── dist
│   └── src
│       └── index.js
```

可以看到多一层src目录。

如果我们不想要，那么可以配置以 `src` 目录为根目录，修改配置为 `{ rootDir: "./src" }` 配置，编译后dist目录如下

```text
ts-learn
├── dist
│   └── index.js
```

### 5.moduleResolution

模块查找方式

`{ moduleResolution: "node" }`：就是我们熟知的查找方式，查找node_modules的时候，现在当前目录查找，没有就往上目录找，一直找到全局

`{ moduleResolution: "Classic" }`：和node相反，先从全局目录查找，找不到再往下面查找

### 6.resolveJsonModule

是否允许在ts中import json文件，**默认：**`false`。

比如现在有一个文件`mock.json`，在ts中引入

```ts
import mock from "./mock.json"; // error报错， 提示 找不到模块“./mock.json”。请考虑使用 "--resolveJsonModule" 导入带 ".json" 扩展的模块
console.log(mock);
```

这个时候就需要设置 `{ resolveJsonModule: true }` 即可

### 7.allowJs / checkJs

`{ allowJs: true }` 开启后有2层作用，一个是允许了在 ts 文件中可以引入 js 文件，另一个是会将 js 文件也编译到 dist 目录（即使没有该 js 没有被引入）

`{ checkJs: true }` 开启后，ts 会去解析js文件，分析下是否存在ts问题。

比如现在有个 js 文件：

```js
let cname = 'sdfsdf';
cname = 23;
```

上面将一个本来是string改为了number类型，js是完全没问题

而我们开启`{ checkJs: true }`之后既可以看到有提示 `不能将类型“number”分配给类型“string”`

说明 ts 去解析 js 文件并分析有没有ts语法问题

### 8.declaration / declarationMap / sourceMap

`{ declaration: true }` 设置为true，将为ts文件生成 `d.ts` 声明文件

`{ declarationMap: true }` 设置为true，在生成 `d.ts` 文件的同时生成 `d.ts.map` 的sourcemap文件，在查看并跳转到库的类型声明时非常有用，因为可以直接跳转到源代码，而不是跳转到类型声明文件。

`{ sourceMap: true }` 设置为true，在生成 js 文件的同时生成 `js.map` 的 sourcemap 文件，这个最大的好处，在浏览器中运行的时候，可以直接在浏览器看到对应ts文件的代码，也可以在ts是进行断点调试

### 9.isolatedModules

在开发中，我们会将类型export出去，在其他地方import，例如下面代码

```ts
// a.ts
interface Aaa { cname:string }
export { Aaa }

// index.ts
import { Aaa } from './a.ts'; 
```

我们知道 ts 经过处理后变成 js，上面的类型就会没有，但如果对于一些babel，这个时候就无法解析

因此我们更推荐将`{ isolatedModules: true }`，开启之后，在类型的export，就需要加上type关键词

```ts
interface Aaa { cname:string }
export type { Aaa }
```

一般推荐开启，一方面语义化更好，一方面解决babel等编译器问题

### 10.esModuleInterop

有些依赖库底层 为了兼容 CommonJs 规范、AMD 规范这二者的规范中相互兼容，使用了 `export =`，将二者规范统一。

`{ esModuleInterop: true }` 表示允许依赖库中出现 `export =` 这种兼容规范导出的格式，TS 可以用`import from`导入

比如现有代码如下：

```ts
// lib/jquery.ts
class Jquery {}
export = Jquery; // 为了CommonJs和AMD规范的导出

// index.ts
import Jquery from "./lib/jquery"; // ts-error: 模块 ""e:/xxx/ts-learn/src/lib/jquery"" 只能在使用 "allowSyntheticDefaultImports" 标志时进行默认导入
```

可以看到在 `{ esModuleInterop: false }` 的时候提示上面错误

![allowsynthet](./img/allowsynthet.png)

 `{ esModuleInterop: true}` 设为true之后，就能正常的import

### 11.strict

一个总的开关，相当于一次性设置：`noImplicitAny/strictNullChecks/strictFunctionTypes/strictBindCallApply/strictPropertyInitialization/noImplicitThis/useUnknownInCatchVariables/alwaysStrict/noUnusedLocals/noUnusedParameters/exactOptionalPropertyTypes/noFallthroughCasesInSwitch/noUncheckedIndexedAccess/noImplicitOverride/noPropertyAccessFromIndexSignature/allowUnusedLabels/allowUnreachableCode/`

一般来说，我们就保持 `{ strict: true}` 即可。

#### 11.1 noImplicitAny

`{ noImplicitAny: true }` 不允许 ts 中有隐形的 any 类型，如果真的需要 any，则要明显的写出

```ts
function say(a) {} // ts-error 提示 参数“a”隐式具有“any”类型
```

#### 11.2 strictNullChecks

`{ strictNullChecks: true }` 对null严格要求，比如下面代码

```ts
// 开启前
const a: string = null; // 可以

// 开启后
const a: string = null; // ts-error 提示 不能将类型“null”分配给类型“string”
```

#### 11.3 strictPropertyInitialization

`{ strictPropertyInitialization: true }` 属性必须要有初始值

```ts
// 开启前
class Person {
  name: string;
}

// 开启后
class Person {
  name: string; // ts-error 提示 属性“name”没有初始化表达式，且未在构造函数中明确赋值
}
```

### 12.noImplicitReturns

`{ noImplicitReturns: true }` 开启后，要求函数的所有代码分支都要有返回值

比如现在有下面代码

```ts
function say(num: number) {
  if (num < 0) {
    return 1;
  } else if (num > 0 && num < 100) {
    return 2;
  }
}
```

![funreturn](./img/funreturn.png)

从逻辑可以看出除了返回1或2之外，还能在第3个代码分支返回undefined

开启`{ noImplicitReturns: true }` 后，就要求所有代码分支都必须有return

![unreturn](./img/funreturn-2.png)

因此需要改下代码

```ts
function say(num: number) {
  if (num < 0) {
    return 1;
  } else if (num > 0 && num < 100) {
    return 2;
  }
  return undefined
}
```

## 13.removeComments

`{ removeComments: true }` 开启后，在编译的时候，会删除代码中的注释

### 14.noUnusedLocals / noUnusedParameters

`{ noUnusedLocals: true }` 开启后，如果有定义了但没有使用的，就会给警告

`{ noUnusedParameters: true }` 开启后，函数中的参数定义未使用，就会给警告

```ts
const cname: string = "aaa"; // ts-warm 提示 已声明“cname”，但从未读取其值

function say(aname: string) {} // ts-warm 提示 已声明“aname”，但从未读取其值
```

### 15.skipLibCheck

`{ skipLibCheck: true }` 开启后，不再检查 d.ts 文件的检查

比如现在有一个`a.d.ts`文件，我们特意写错

```ts
declare const aa: string = "12"; // d.ts 文件中只有类型没有赋值，所以这里不应该有赋值语句
```

如果我们设置了 `{ skipLibCheck: false }`，那么ts就会检查 d.ts 文件并且给与错误

![skiplib](./img/skiplib.png)

**在实际开发中，**我们一般设置跳过，即`{ skipLibCheck: true }` 这是因为 d.ts 一般来说都是第3方库的 或 自动生成的，没必要去检查

### 16. typeRoots / types

这个基本就保持下面配置既可以

```json
{ 
    "typeRoots": ["./node_modules/@types"],
    "types": ["node"]
}
```

比如我们项目依赖lodash，需要安装`@types/lodash`

```ts
import lodash from 'lodash';
```

那么 ts 就在 指定的 `typeRoots` 中去查找是否有lodash相关的声明文件，因此开发中 `{ "typeRoots": ["./node_modules/@types"] }` 就保持这样即可

而`{ types: ["node"] }` 的配置是因为有这么一个问题，如果我们使用commonjs规范开发，会写下面代码

```ts
const fs = require("fs"); // ts-error 提示 找不到名称“require”。是否需要安装 Node.js 的类型定义? 请尝试运行 `npm i --save-dev @types/node`，然后将 "node" 添加到 tsconfig 的 types 字段
```

按照这个提示，一方面我们需要安装`pnpm i -D @types/node`，另一方面需要将 tsconfig.json 的 `{ types: ["node"] }` 设置

