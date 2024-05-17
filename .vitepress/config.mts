import { defineConfig } from 'vitepress';
import { getSidebarData, getNavData } from './navSidebarUtil';
import { repository } from '../package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/note/', // url二级路径
    title: '随记', // 所有文档的浏览器标签title
    description: '前端技术;随堂笔记;记录各种', // 会渲染成<meta>标签，SEO用
    lang: 'zh-CN', // 默认en-US，最终渲染到<html lang="">
    // cleanUrls: true, // 从 URL 中删除 .html 后缀，线上需要服务器支持
    // metaChunk: true, // 当设置为 true 时，将页面元数据提取到单独的 JavaScript 块中
    // appearance: true, // 默认true，false-不展示暗黑主体切换按钮
    // ignoreDeadLinks: true, // 默认false，true-忽略一些找匹配不到的连接
    srcDir: '.', // 指定文档目录，默认为`.`
    markdown: {
        // vitepress自带的theme
        // 'css-variables' | 'dark-plus' | 'dracula-soft' |
        // 'dracula' | 'github-dark-dimmed' | 'github-dark' |
        // 'github-light' | 'hc_light' | 'light-plus' | 'material-darker'
        // 'material-default' | 'material-lighter' | 'material-ocean' | 'material-palenight'
        // 'min-dark' | 'min-light' | 'monokai' | 'nord' | 'one-dark-pro' | 'poimandres'
        // 'rose-pine-dawn' | 'rose-pine-moon' | 'rose-pine' | 'slack-dark' | 'slack-ochin' |
        // 'solarized-dark' | 'solarized-light' | 'vitesse-dark' | 'vitesse-light'
        // theme: 'one-dark-pro', // md文件的渲染风格
        lineNumbers: true, // 默认false， true-表示代码片段展示行数
        image: {
            lazyLoading: true, // 图片懒加载，默认false
        },
        // [[toc]]的配置，只识别一二级标题生成目录就好了，测试了无效？？
        // toc: { includeLevel: [1, 2] },
    },
    // head: [
    //     // 创建 script | style | meta 标签
    //     ['script', { src: '/js/cpython666.js' }],
    //     ['link', { rel: 'stylesheet', href: '/css/nomouse.css' }],
    //     ['meta', { name: 'referrer', content: 'no-referrer' }],
    //     ['script', {}, `var a = 23;console.log(a)`], // 直接写js内容
    // ],
    // 文档顶部右上角出现多语言切换按钮
    locales: {
        root: { label: '简体中文', lang: 'zh-cn' },
        tw: { label: '繁體中文', lang: 'zh-tw' },
    },
    themeConfig: {
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        lightModeSwitchTitle: '切换到浅色模式', // 鼠标悬停开关展示的title
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单', // 侧边栏菜单名，仅移动端看到
        darkModeSwitchLabel: '主题', // 深色模式开关名，仅移动端看到
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                // full    -> 2024年5月15日星期三
                // long    -> 2024年5月15日
                // medium  -> 2024年5月15日
                // short   -> 2024/5/15
                dateStyle: 'full',
                // full    -> 中国标准时间 23:32:58
                // long    -> GMT+8 23:32:58
                // medium  -> 23:32:58
                // short   -> 23:32
                timeStyle: 'short',
            },
        },
        outline: {
            label: '页面导航',
            level: 'deep',
        },
        // https://vitepress.dev/reference/default-theme-config
        // 扫描目录自动生成顶部导航
        nav: getNavData({ enableDirActiveMatch: true }),
        // 扫描目录自动生成侧边导航数据
        sidebar: getSidebarData(),
        editLink: {
            pattern: `${repository}/edit/master/:path`,
            text: '编辑该页面',
        },
        // 右上角的社交信息
        socialLinks: [
            // icon支持 'discord' | 'facebook' | 'github' | 'instagram' | 'linkedin' | 'slack' | 'twitter' | 'youtube'
            { icon: 'github', link: repository },
            // 自定义svg的icon:
            {
                icon: {
                    svg: '<svg t="1670218854313" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2397" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" p-id="2398"></path></svg>',
                },
                link: 'https://bilibili.com',
            },
        ],
        // 顶部搜索的key，需要自己到algolia申请
        // algolia: {
        //   appId: '8J64VVRP8K',
        //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        //   indexName: 'vitepress'
        // },
        // 使用本地搜索
        search: {
            provider: 'local',
        },
        // 接入carbonAds广告，详见 https://process1024.github.io/vitepress/guide/theme-carbon-ads
        // carbonAds: {
        //   code: 'your-carbon-code',
        //   placement: 'your-carbon-placement'
        // },
        // 底部的页脚信息
        footer: {
            message: `本站收录内容源自互联网，不对其网站内容或交易负责。&ensp;|&ensp;如有内容侵犯权益，请联系站长删除相关内容；<a href="${repository}" target="_blank">MIT协议</a>`,
            copyright: 'Copyright © 2022',
        },
    },
});
