# 覆盖率

执行 `npx vitest --coverage` 会为项目生成覆盖率报告，默认使用v8引擎生成，可以通过修改`vitest.config.ts`

```ts
defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      coverage: {
        provider: 'v8' // 默认v8，也可以改为istanbul
      }
    },
})
```

