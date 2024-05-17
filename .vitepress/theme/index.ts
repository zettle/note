import { h } from 'vue';
import { type EnhanceAppContext, type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
// <demo>组件的导入
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme';
// element-plus的导入
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 第3方主题的导入
// import escookTheme from '@escook/vitepress-theme';
// import '@escook/vitepress-theme/style.css';
// 自定义样式
import './style.css';

export default {
    extends: DefaultTheme, // vitepress默认主题
    // extends: escookTheme, // 使用第3方主题
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // return h(escookTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    async enhanceApp({ app, router, siteData }) {
        app.component('Demo', AntdTheme);
        app.use(ElementPlus);
        if (!import.meta.env.SSR) {
            const { loadOml2d } = await import('oh-my-live2d');
            loadOml2d({
                models: [
                    {
                        path: 'https://model.oml2d.com/cat-black/model.json',
                        scale: 0.08,
                        position: [0, 80],
                        stageStyle: {
                            height: 350,
                        },
                    },
                ],
            });
        }
    },
} satisfies Theme;
