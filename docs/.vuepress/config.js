module.exports = {
    // base: '/bolg-note/',
    base: '/',
    port: 8080,
    dest: './dist', // 目录是相对于项目根目录来的
    repo: 'https://gitee.com/huangzetao/bolg-note',  // 代码仓库
    title: '笔记本',
    description: '主要记录平时自己的一些博客以及学习历程，基于vuepress搭建',
    themeConfig: {
        sidebarDepth: 0, // 这样就不会提取##到左边菜单栏了
        nav: [
            { text: '主页', link: '/' },
            { text: '前端', link: '/front/' },
            { text: 'nodeJS', link: '/node/' },
            { text: '服务器', link: '/server/' },
            { text: '公众号收录', link: '/wxmp/' }
        ],
        sidebar: {
            '/front/': [
            ],
            '/node/': [
            ],
            '/server/': [
                {
                    title: 'nginx',
                    children: [
                        '/server/nginx/001-nginx简介',
                        '/server/nginx/003-nginx的默认配置',
                        '/server/nginx/006-nginx的include',
                        '/server/nginx/007-nginx多域名',
                        '/server/nginx/008-nginx状态',
                        '/server/nginx/009-nginx错误日志'
                    ]
                }
            ],
            '/wxmp/': [
                {
                    title: '前端',
                    children: [
                        '/wxmp/front/工作中如何巧妙的使用发布订阅模式.md',
                        '/wxmp/front/其他.md',
                    ]
                }
            ]
        },
        lastUpdated: '最后更新时间'
    }
};
