# 006-eslint检查

## 1、基本配置
安装下面插件
```
npm i -D
    eslint
    eslint-plugin-standard

    @vue/eslint-config-standard
    eslint-plugin-vue

    @vue/eslint-config-typescript
    @typescript-eslint/parser
    @typescript-eslint/eslint-plugin

    eslint-plugin-import
    eslint-plugin-node
```
* `eslint`: eslint工具
* `eslint-plugin-standard`: eslint的js规范，用了这个就可以在`.eslintrc.js`里面引入插件`extends: ['eslint:recommended']`
* `@vue/eslint-config-standard`+`eslint-plugin-vue`: vue的规范，能用`extends: ['plugin:vue/vue3-recommended']`
* `@vue/eslint-config-typescript` + `@typescript-eslint/parser`: ts的规范，能用`extends: ['@vue/typescript/recommended']`
* `eslint-plugin-import` + `eslint-plugin-node` + `eslint-plugin-promise` + `` + ``，能用`extends: ['@vue/standard']`，这个控制空格、单双引号等等之类


在根目录新建`.eslintrc.js`，内容如下:
```js
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'eslint:recommended', // eslint自己的规范
        'plugin:vue/vue3-recommended', // eslint-plugin-vue的规范
        '@vue/standard',
        '@vue/typescript/recommended' // ts的规范
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        // '@typescript-eslint/no-explicit-any': ['off'], // 禁止声明any类型，关闭掉
        // 普通.js 普通.ts 的缩进
        indent: ['error', 4, {
            SwitchCase: 1 // switch的缩进
        }],
        // vue-template的缩进
        'vue/html-indent': ['error', 4, {
            // 下面已经是默认值
            // 'attribute': 1,
            // 'baseIndent': 1,
            // 'closeBracket': 0,
            // 'alignAttributesVertically': true,
            // 'ignores': []
        }],
        // vue-script缩进的方式
        'vue/script-indent': ['error', 4, {
            baseIndent: 0, // 首层缩进
            switchCase: 1, // switch的缩进
            ignores: []
        }],
        // 语句强制分号结尾
        semi: ['error', 'always'],
        // 检查html标签自闭合还是双闭合
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    // 常见的自闭合html标签，要自闭合，比如 img input hr br
                    void: 'always',
                    // 普通html标签，除了上面的 img input等外的普通html标签，要双闭合
                    normal: 'never',
                    // vue组件的，用双闭合
                    component: 'never'
                }
                // 也可以写具体的标签名单独控制， always-自闭合  never-双闭合 any-不强制
                // svg: 'never',
                // math: 'always'
            }
        ],
        // 控制html结尾`>`的缩进
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'never'
        }],
        // doc-template-script-style的顺序
        'vue/component-tags-order': ['error', {
            order: ['doc', 'template', 'script', 'style']
        }],
        // @click方法是否加() never不加
        'vue/v-on-function-call': ['error', 'never'],
        // vue-html上attr按照字母顺序
        'vue/attributes-order': ['error', {
            // order已经在 plugin:vue/vue3-recommended 定义了，这里就不再定义
            // 'order': [
            //     'DEFINITION',       // 比如  is
            //     'LIST_RENDERING',   // 比如  v-for
            //     'CONDITIONALS',     // 比如  v-if v-show v-cloak
            //     'RENDER_MODIFIERS', // 比如  v-once v-pre
            //     'GLOBAL',           // 比如  id
            //     'UNIQUE',           // 比如  ref key v-slot slot
            //     'TWO_WAY_BINDING',  // 比如  v-model
            //     'OTHER_DIRECTIVES', // 比如  v-custom-directive
            //     'OTHER_ATTR',       // 比如  custom-prop='foo'', 'v-bind:prop='foo'', ':prop='foo'
            //     'EVENTS',           // 比如  @click='functionCall'', 'v-on='event'
            //     'CONTENT'           // 比如  'v-text', 'v-html'
            // ],
            alphabetical: true
        }],
        // template里面组件名称书写，中横线写法
        'vue/component-name-in-template-casing': ['error', 'kebab-case', {
            registeredComponentsOnly: false, // 设置为fasle，这样子那些在全局组件注册的，也会按照这套规范
            ignores: []
        }],
        // 控制结尾要不要换行
        'vue/block-tag-newline': ['error', {
            singleline: 'always', // 一行的也需要换行比如 <script>export default {};</script>
            multiline: 'always',
            maxEmptyLines: 0,
            blocks: {
                template: {
                    singleline: 'always',
                    multiline: 'always',
                    maxEmptyLines: 0
                },
                script: {
                    singleline: 'always',
                    multiline: 'always',
                    maxEmptyLines: 0
                },
                'my-block': {
                    singleline: 'always',
                    multiline: 'always',
                    maxEmptyLines: 0
                }
            }
        }],
        // html中注释 注释内容要不要另起一行
        'vue/html-comment-content-newline': ['error', {
            singleline: 'ignore',
            multiline: 'always'
        }, {
            exceptions: []
        }],
        // html中注释中间有空格
        'vue/html-comment-content-spacing': ['error', 'always', { exceptions: [] }],
        // html中注释缩进
        'vue/html-comment-indent': ['error', 4],
        // 组件的name值和文件名保持一致
        'vue/match-component-file-name': ['error', {
            extensions: ['jsx', 'tsx', 'vue', 'js', 'ts'],
            shouldMatchCase: false
        }],
        // boolean类型的prop不要设置默认值
        // 'vue/no-boolean-default': ['error', 'no-default'],
        // 用了$attr就要加上 inheritAttrs: false
        'vue/no-duplicate-attr-inheritance': ['error'],
        // 禁止template/script/style里面没有内容
        'vue/no-empty-component-block': ['error'],
        // 禁止html中 class属性为数组的时候，里面多个对象
        'vue/no-multiple-objects-in-class': ['error'],
        // 禁止自定义组件起名和vue内置组件一样
        'vue/no-reserved-component-names': ['error', {
            // 'disallowVueBuiltInComponents': true, // 这是vue2的内置组件
            disallowVue3BuiltInComponents: true // 这是vue3的内置组件
        }],
        // 禁止html中style有写死的
        'vue/no-static-inline-styles': ['error', { allowBinding: false }],
        // a标签有target='_blank'就要加上 rel='noopener noreferrer'
        'vue/no-template-target-blank': ['error'
            // {
            //     'allowReferrer': false// 默认false 设置true只要求加noopener，设置false要求加noopener noopener 2个
            //     'enforceDynamicLinks': 'always' // 默认always 设置动态 :href也准守这个规矩
            // }
        ],
        // 未注册的组件不可以用
        // 'vue/no-unregistered-components': ['error', {
        //     'ignorePatterns': ['^m-button$', '^router-'] // 如果是全局组件需要一个个在这里面写，每个元素是正则
        // }],
        // 禁止声明但未使用的声明
        'vue/no-unused-properties': ['error', {
            groups: ['props', 'data', 'computed', 'methods', 'setup']
        }],
        // 禁止写死的{{}}
        'vue/no-useless-mustaches': ['error'
            // {
            //     'ignoreIncludesComment': false, // 默认false 忽略注释
            //     'ignoreStringEscape': false // 默认false 忽略注释
            // }
        ],
        // 如果 :foo=''bar' 这种就要用写死的方式 foo='bar'
        'vue/no-useless-v-bind': ['error'
            // {
            //     'ignoreIncludesComment': false, // 默认false
            //     'ignoreStringEscape': false // 默认false
            // }
        ],
        // template/script/style等之间要有一行
        'vue/padding-line-between-blocks': ['error', 'always'],
        // template里面的 {{xx}} 中 双括号之间不要有空格
        'vue/mustache-interpolation-spacing': ['error', 'never'],
        // template里面 `${xxx}` 中的 括号之间不要有空格
        'vue/template-curly-spacing': ['error', 'never'],
        // template的space-unary-ops，具体看 https://cloud.tencent.com/developer/section/1135838
        'vue/space-infix-ops': ['error'],
        // 用模板字符串代替传统的字符串拼接
        'prefer-template': ['error'],
        // template里面的 prefer-template
        'vue/prefer-template': ['error'],
        // 一行最多2个属性
        'vue/max-attributes-per-line': ['error', {
            singleline: 2
        }],
        // html内容要换行
        'vue/singleline-html-element-content-newline': ['off'],
        // 关闭未定义前不能使用，文件中的hooks，暂时还没想好
        '@typescript-eslint/no-use-before-define': ['off'],
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
};
```

新增script脚本，修改`package.json`
```json
{
    "scripts": {
        "lint": "eslint \"src/**/*.{js,vue,ts}\""
    }
}
```
每次执行`npm run lint`即可检查


## 2、让vscode启动eslint自动修复

在根目录新建`/.vscode/settings.json`，内容如下:
```
{
    "eslint.validate": [
        "javascript",
        "typescript"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

然后vscode安装2个插件`eslint`，保存的时候vscode会自动根据配置格式化代码



