# 配置

这里主要讲解 `vitest.config.ts` 的配置。默认读取 `vitest.config.ts`

也可以执行命令：`vitest --config <./path/to/vitest.config.ts>` 去指定某个文件

## 默认配置

如果有需要，可以导入默认值去扩展

```ts
import { configDefaults, defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
})
```

默认配置如下：

```js
{
  allowOnly: true,
  isolate: true,
  watch: true,
  globals: false,
  environment: 'node',
  pool: 'forks',
  clearMocks: false,
  restoreMocks: false,
  mockReset: false,
  unstubGlobals: false,
  unstubEnvs: false,
  include: [ '**/*.{test,spec}.?(c|m)[jt]s?(x)' ],
  exclude: [
    '**/node_modules/**',
    '**/dist/**',
    '**/cypress/**',
    '**/.{idea,git,cache,output,temp}/**',
    '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
  ],
  teardownTimeout: 10000,
  forceRerunTriggers: [ '**/package.json/**', '**/{vitest,vite}.config.*/**' ],
  update: false,
  reporters: [],
  silent: false,
  hideSkippedTests: false,
  api: false,
  ui: false,
  uiBase: '/__vitest__/',
  open: true,
  css: { include: [] },
  coverage: {
    provider: 'v8',
    enabled: false,
    all: true,
    clean: true,
    cleanOnRerun: true,
    reportsDirectory: './coverage',
    exclude: [
      'coverage/**',
      'dist/**',
      '**/node_modules/**',
      '**/[.]**',
      'packages/*/test?(s)/**',
      '**/*.d.ts',
      '**/virtual:*',
      '**/__x00__*',
      '**/\x00*',
      'cypress/**',
      'test?(s)/**',
      'test?(-*).?(c|m)[jt]s?(x)',
      '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
      '**/__tests__/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
      '**/vitest.{workspace,projects}.[jt]s?(on)',
      '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}'
    ],
    reportOnFailure: false,
    reporter: [ [Array], [Array], [Array], [Array] ],
    extension: [
      '.js',     '.cjs',
      '.mjs',    '.ts',
      '.mts',    '.tsx',
      '.jsx',    '.vue',
      '.svelte', '.marko',
      '.astro'
    ],
    allowExternal: false,
    excludeAfterRemap: false,
    ignoreEmptyLines: true,
    processingConcurrency: 8
  },
  fakeTimers: {
    loopLimit: 10000,
    shouldClearNativeTimers: true,
    toFake: [
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval',
      'setImmediate',
      'clearImmediate',
      'Date'
    ]
  },
  maxConcurrency: 5,
  dangerouslyIgnoreUnhandledErrors: false,
  typecheck: {
    checker: 'tsc',
    include: [ '**/*.{test,spec}-d.?(c|m)[jt]s?(x)' ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ]
  },
  slowTestThreshold: 300,
  disableConsoleIntercept: false
}
```





## 配置项

### global

如果不配置 `{global: true}` ，我们写单测的时候，需要将各个api导入

```ts
import { test } from 'vitest';

test('测试Hello', () => {
  console.log(Hello);
})
```

修改 `vitest.config.ts` 如下：

```ts
defineConfig({
    test: {
      globals: true
    },
})
```

然后配置 `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

就可以不用手写 import 了，直接用下面代码即可

```ts
test('测试Hello', () => {
  console.log(Hello);
})
```

### include和exclude

`include`：要跑测试的测试文件，默认值：`['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']`

`exclude`：排除文件，默认值`['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**']`

### environment

用于测试的环境。可选值 `'node' | 'jsdom' | 'happy-dom'`，默认值：`node`

如果想要单独控制某个文件，可以使用文档注释为当前文件指定环境，比如下面修改 `say.spec.ts`文件，为其单独指定运行环境

```ts
/**
 * @vitest-environment jsdom
 */
function say() {}
```

或

```ts
// @vitest-environment happy-dom
function say() {}
```















