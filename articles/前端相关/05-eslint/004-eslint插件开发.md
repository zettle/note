# eslint插件开发

一个eslint插件本质上是一个create函数，遵循下面的规范

```js
// eslint.config.js
export default [
    {
        settings: {
            sharedData: "Hello"
        },
        plugins: {
            customPlugin: {
                rules: {
                    "my-rule": {
                        meta: {
                            // custom rule's meta information
                        },
                        create(context) {
                            const sharedData = context.settings.sharedData;
                            return {
                                // code
                            };
                        }
                    }
                }
            }
        },
        rules: {
            "customPlugin/my-rule": "error"
        }
    }
];
```

