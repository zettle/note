# 002-配置文件

[配置项目-英文文档](https://pm2.keymetrics.io/docs/usage/deployment/)

在项目根目录添加pm2的部署脚本文件: `ecosystem.json`

```json
{
    // apps是数组，是要发布对象的一些定义
    "apps": [
        {
            // 项目名字
            "name": "ant-help-center",
            // 启动脚本
            "script": "./bin/www",
            // 多核的服务器可以配置，配置成核数一样
            "instances": 2,
            // 启动脚本的环境变量，注意value要写成字符串
            "env": {
                "COMMON_VARIABLE": "true"
            },
            // 测试服务器
            "env_development": {
                "NODE_ENV": "development",
                "PORT": 8087
            },
            // 生产环境
            "env_production": {
                "NODE_ENV": "production",
                "PORT": 8087
            }
         }
    ],
    "deploy": {
        // 生产环境服务器
        "production": {
            // 登录账号
            "user": "root",
            // 服务器IP，数组可以多台主机
            "host": ["xxx.xxx.xxx.xxx"],
            // 端口
            "port": "22",
            // 从指定的分支拉取代码
            "ref": "origin/master",
            // 仓库地址
            "repo": "git@gitee.com:xxx/xxxx.git", // 使用
            // 发布到服务器对应的哪个目录下
            "path": "/www/website/production", //发布到服务器指定的目录下
            // StrictHostKeyChecking=no 可以避免在clone代码的时候因为key验证导致clone失败
            "ssh_options": "StrictHostKeyChecking=no",
            // 项目clone代码后执行什么操作
            "post-deploy": "npm install",
            // 本地每次发布之前要做什么操作，比如eslint等等
            "pre-deploy-local": "echo 'Deploy pre'",
            // 环境变量
            "env": {
                "NODE_ENV": "production"
            }
        },
        // 测试环境
        "development": {
            "user": "root", //Nginx服务器上的username
            "host": ["xxx.xxx.xxx.xxx"], // 服务器地址
            "port": "22",
            "ref": "origin/master", //从指定的分支拉取代码
            "repo": "git@gitee.com:xxx/xxxx.git",
            "path": "/www/website/development", //发布到服务器指定的目录下
            "ssh_options": "StrictHostKeyChecking=no",
            //构建在发布
            "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env development",
            "env": {
                "NODE_ENV": "development"
            }
        }
    }
}
```