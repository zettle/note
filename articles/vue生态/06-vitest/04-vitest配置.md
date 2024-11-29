# 配置

## global

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

