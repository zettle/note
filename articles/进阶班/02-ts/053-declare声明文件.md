# declare声明文件

关键字 declare 表示声明的意思，可以用来做出各种声明，可以描述以下类型。

- 变量（const、let、var 命令声明）
- type 或者 interface 命令声明的类型
- class
- enum
- 函数（function）
- 模块（module）
- 命名空间（namespace）

```ts
declare let/const  // 声明全局变量
declare function   // 声明全局方法
declare class      // 声明全局类
declare enum       // 声明全局枚举类型
declare namespace  // 声明（含子属性的）的全局对象
interface/type     // 声明全局类型
```

比如声明一个 `$` 函数

```ts
declare function $(ready: () => void): void;
```

## declare变量

比如，我们在使用外部脚本的变量 `x`

```ts
x = 123; // 报错
```

 上面示例中，变量 `x` 是其他脚本定义的，当前脚本不知道它的类型，编译器就会报错。

这时使用 declare 命令给出它的类型，就不会报错了。

```ts
declare let x:number;
x = 1;
```

如果 declare 关键字没有给出变量的具体类型，那么变量类型就是`any`。

```ts
declare let x;
x = 1;
```

上面示例中，变量`x`的类型为`any`。

下面的例子是脚本使用浏览器全局对象`document`。

```ts
declare var document;
document.title = 'Hello';
```

上面示例中，declare 告诉编译器，变量`document`的类型是外部定义的（具体定义在 TypeScript 内置文件`lib.d.ts`）。

如果 TypeScript 没有找到`document`的外部定义，这里就会假定它的类型是`any`。

注意，declare 关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。

```ts
declare let x:number = 1; // 报错
```

上面示例中，declare 设置了变量的初始值，结果就报错了。

## declare函数

declare 关键字可以给出外部函数的类型描述。

下面是一个例子。

```ts
declare function sayHello(name:string):void;

sayHello('张三');
```

上面示例中，declare 命令给出了 `sayHello() 的类型描述，表示这个函数是由外部文件定义的，因此这里可以直接使用该函数。

注意，这种单独的函数类型声明语句，只能用于 `declare` 后面。一方面，TypeScript 不支持单独的函数类型声明语句；另一方面，declare 关键字后面也不能带有函数的具体实现。

```ts
// 报错 Function implementation is missing or not immediately following the declaration
function sayHello(name:string):void;

let foo = 'bar';
function sayHello(name:string) {
  return '你好，' + name;
}
```

上面示例中，单独写函数的类型声明就会报错。

## declare class

declare 给出 class 类型描述的写法如下。

```ts
declare class Animal {
  constructor(name:string);
  eat():void;
  sleep():void;
}
```

下面是一个复杂一点的例子。

```ts
declare class C {
  // 静态成员
  public static s0():string;
  private static s1:string;

  // 属性
  public a:number;
  private b:number;

  // 构造函数
  constructor(arg:number);

  // 方法
  m(x:number, y:number):number;

  // 存取器
  get c():number;
  set c(value:number);

  // 索引签名
  [index:string]:any;
}
```

同样的，declare 后面不能给出 Class 的具体实现或初始值。

## declare namespace 和 declare module

如果想把变量、函数、类组织在一起，可以将 declare 与 module 或 namespace 一起使用

```ts
declare namespace AnimalLib {
  class Animal {
    constructor(name:string);
    eat():void;
    sleep():void;
  }

  type Animals = 'Fish' | 'Dog';
}

// 或者
declare module AnimalLib {
  class Animal {
    constructor(name:string);
    eat(): void;
    sleep(): void;
  }

  type Animals = 'Fish' | 'Dog';
}
```



使用了命名空间之后，原来加的 `declare函数` 或 `declare变量` 那些就不再需要加 `declare` 了

`declare module` 和 `declare namespace` 里面，加不加 export 关键字都可以。

```ts
declare namespace jQuery {
  function $(ready: () => void): void; // 不再需要declare
}

jQuery.$(); // 不再报错
```

模块声明`declare module`，是针对某个包的声明，比上面命名空间声明好处是不需要再每一次地方再 `jQuery.xx.xx` 的方式使用命名空间

比如上面命名空间改造为模块声明：

```ts
declare module 'jQuery' {
  function $(ready: () => void): void;

  namespace $ {
    function ajax(url: string): void;
  }
}
```

那么在可以直接import了

```ts
import jquery from 'jQuery';

jquery.$(() => {});
jquery.$.ajax('xxxx.do');
```

命名空间里面可以又有命名空间

```ts
declare namespace jQuery {
  function $(ready: () => void): void;

  namespace $ {
    function ajax(url: string): void;
  }
}
```

这样就可以在ts中使用

```ts
jQuery.$.ajax('xxxx.do');
```



下面的例子是当前脚本使用了 `myLib` 这个外部库，它有方法 `makeGreeting()` 和属性 `numberOfGreetings`。

```ts
let result = myLib.makeGreeting('你好');
console.log('欢迎词：' + result);

let count = myLib.numberOfGreetings;
```

`myLib` 的类型描述就可以这样写。

```ts
declare namespace myLib {
  function makeGreeting(s:string): string;
  let numberOfGreetings: number;
}
```



declare 关键字的另一个用途，是为外部模块添加属性和方法时，给出新增部分的类型描述。

```ts
import { Foo as Bar } from 'moduleA';

declare module 'moduleA' {
  interface Foo {
    custom: {
      prop1: string;
    }
  }
}
```

上面示例中，从模块 `moduleA` 导入了类型 `Foo`，它是一个接口（interface），并将其重命名为 `Bar`，然后用 declare 关键字为 `Foo` 增加一个属性 `custom`。这里需要注意的是，虽然接口 `Foo` 改名为 `Bar`，但是扩充类型时，还是扩充原始的接口 `Foo`，因为同名 interface 会自动合并类型声明。



在vue项目中，我们经常会往原型链上挂在一些全局方法，比如 `main.ts` 如下：

```ts
import { igEq, igIn } from './utils';

const app = createApp();
app.config.globalProperties.$igEq = igEq;
app.config.globalProperties.$igIn = igIn;
```

为了让ts能识别我们新增的全局函数，我们会修改类型文件

```ts
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $igEq: typeof import('../api/utils/index.ts')['igEq'];
    $igIn: typeof import('../api/utils/index.ts')['igIn'];
  }
}
```



下面是另一个例子。一个项目有多个模块，可以在一个模块中，对另一个模块的接口进行类型扩展。

```ts
// a.ts
export interface A {
  x: number;
}

// b.ts
import { A } from './a';
declare module './a' {
  interface A {
    y: number; // 会将 {x:number} 和 {y:number} 合并起来
  }
}

const a:A = { x: 0, y: 0 };
```

上面例子中 同名 `interface A` 会自动合并，所以等同于扩展类型



使用这种语法进行模块的类型扩展时，有两点需要注意：

（1）`declare module NAME` 语法里面的模块名 `NAME`，跟 import 和 export 的模块名规则是一样的，且必须跟当前文件加载该模块的语句写法（上例 `import { A } from './a'`）保持一致。

（2）不能创建新的顶层类型。也就是说，只能对 `a.ts` 模块中已经存在的类型进行扩展，不允许增加新的顶层类型，比如新定义一个接口 `B`。

（3）不能对默认的 `default` 接口进行扩展，只能对 export 命令输出的命名接口进行扩充。这是因为在进行类型扩展时，需要依赖输出的接口名。

某些第三方模块，原始作者没有提供接口类型，这时可以在自己的脚本顶部加上下面一行命令。

```ts
declare module "模块名";
```

比如

```ts
declare module "hot-new-module";
```

加上上面的命令以后，外部模块即使没有类型声明，也可以通过编译。但是，从该模块输入的所有接口都将为 `any` 类型。

`declare module` 描述的模块名可以使用通配符。

```ts
declare module 'my-plugin-*' {
  interface PluginOptions {
    enabled: boolean;
    priority: number;
  }

  function initialize(options: PluginOptions): void;
  export = initialize;
}
```

上面示例中，模块名 `my-plugin-*` 表示适配所有以 `my-plugin-` 开头的模块名（比如 `my-plugin-logger`）。



## declare global

如果要为 js 引擎的原生对象添加属性和方法，可以使用 `declare global {}` 语法。

```ts
export {};

declare global {
  interface String {
    toSmallString(): string;
  }
}

String.prototype.toSmallString = ():string => {
  // 具体实现
  return '';
};
```

上面示例中，为 js 原生的 `String` 对象添加了 `toSmallString()` 方法。declare global 给出这个新增方法的类型描述。

这个示例第一行的空导出语句 `export {}`，作用是强制编译器将这个脚本当作模块处理。这是因为 `declare global` 必须用在模块里面。

下面的示例是为 window 对象（类型接口为 `Window`）添加一个属性 `myAppConfig`。

```ts
export {};

declare global {
  interface Window {
    myAppConfig:object;
  }
}

// 在具体的某个ts中就可以用下面写法，不会报错
const config = window.myAppConfig;
```

`declare global` 只能扩充现有对象的类型描述，不能增加新的顶层类型

## declare enum

declare 关键字给出 enum 类型描述的例子如下，下面的写法都是允许的。

```ts
declare enum E1 {
  A,
  B,
}

declare enum E2 {
  A = 0,
  B = 1,
}

declare const enum E3 {
  A,
  B,
}

declare const enum E4 {
  A = 0,
  B = 1,
}
```

## declare interface

`declare interface` 在声明文件中完全可以省去 `declare`

```ts
interface Foo {}
declare interface Foo {} // 2种写法等效
```

## 声明文件的demo

下面是类型声明文件的一些例子。先看 moment 模块的类型描述文件`moment.d.ts`。

```
declare module 'moment' {
  export interface Moment {
    format(format:string): string;

    add(
      amount: number,
      unit: 'days' | 'months' | 'years'
    ): Moment;

    subtract(
      amount:number,
      unit:'days' | 'months' | 'years'
    ): Moment;
  }

  function moment(
    input?: string | Date
  ): Moment;

  export default moment;
}
```

上面示例中，可以注意一下默认接口`moment()`的写法。

下面是 D3 库的类型声明文件`D3.d.ts`。

```
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }

  export interface Event {
    x: number;
    y: number;
  }

  export interface Base extends Selectors {
    event: Event;
  }
}

declare var d3: D3.Base;
```

## d.ts 文件

`declare module` 用于类型声明文件

我们可以为每个模块脚本，定义一个 `.d.ts` 文件，把该脚本用到的类型定义都放在这个文件里面。

但是，更方便的做法是为整个项目，定义一个大的 `.d.ts` 文件，在这个文件里面使用 `declare module` 定义每个模块脚本的类型。

下面的示例是 `node.d.ts` 文件的一部分。

```ts
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }

  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}

declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
```

上面示例中，`url` 和 `path` 都是单独的模块脚本，但是它们的类型都定义在 `node.d.ts` 这个文件里面。

另一种情况是，使用 `declare module` 命令，为模块名指定加载路径。

```ts
declare module "lodash" {
  export * from "../../dependencies/lodash";
  export default from "../../dependencies/lodash";
}
```

上面示例中，`declare module "lodash"` 为模块 `lodash`，指定具体的加载路径。

使用时，自己的脚本使用三斜杠命令，加载这个类型声明文件。

```ts
/// <reference path="node.d.ts"/>
```

如果没有上面这一行命令，自己的脚本使用外部模块时，就需要在脚本里面使用 declare 命令单独给出外部模块的类型。



举例来说，有一个模块的代码如下。

```ts
const maxInterval = 12;

function getArrayLength(arr) {
  return arr.length;
}

module.exports = {
  getArrayLength,
  maxInterval,
};
```

它的类型声明文件可以写成下面这样。

```ts
export function getArrayLength(arr: any[]): number;
export const maxInterval: 12;
```



类型声明文件也可以使用 `export =` 命令，输出对外接口。下面是 moment 模块的类型声明文件的例子。

```ts
declare module 'moment' {
  function moment(): any;
  export = moment;
}
```

上面示例中，模块 `moment` 内部有一个函数 `moment()`，而 `export =` 表示 `module.exports` 输出的就是这个函数。

除了使用 `export =`，模块输出在类型声明文件中，也可以使用 `export default` 表示。

比如有个模块代码如下：

```ts
// 模块输出
module.exports = 3.142;
```

那么类型文件可以有下面的写法

```ts
// 写法一
declare const pi: number;
export default pi;

// 写法二
declare const pi: number;
export= pi;
```

上面示例中，模块输出的是一个整数，那么可以用 `export default` 或 `export =` 表示输出这个值。



## 使用声明文件

比如有个类型声明文件`types.d.ts`

```ts
export interface Character {
  catchphrase?: string;
  name: string;
}
```

然后，在ts中引入

```ts
import { type Character } from "./types";

export const character: Character = {
  catchphrase: "Yee-haw!",
  name: "Sandy Cheeks",
};
```

更好的方式是在 `package.json` 中引入，就不需要每个文件去引了

```json
{
  "compilerOptions": {},
  "files": [
    "typings/types.d.ts"
  ]
}
```

