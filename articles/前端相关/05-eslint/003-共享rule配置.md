# 共享rule配置

我们可以将rule抽成一个公共的配置给所有项目共享

比如抽成一个 `eslint-plugin-example` 的包出来

```js
export default {
    configs: {
        recommended: {
            name: "example/recommended", // 最好定义一个name，该name有助于在错误信息中展示出是哪个库的规则
            rules: {
                "no-unused-vars": "warn"
            }
        },
        strict: {
            name: "example/strict",
            rules: {
                "no-unused-vars": "error"
            }
        }
    }
};
```

