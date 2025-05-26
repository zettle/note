
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import VitePluginVitepressDemo from 'vite-plugin-vitepress-demo';
import { defineConfig } from 'vite';

const __unconfig_default =  defineConfig({
    // base: '/note/',
    // glob: './**/demo/**/*.{vue,jsx,tsx,js,ts}' 这里表示扫描所有demo目录下的vue,jsx,tsx,js,ts作为demo示例代码
    plugins: [VitePluginVitepressDemo({ glob: './articles/**/demo/**/*.{vue,jsx,tsx,js,ts}' })],
    server: {
        host: '0.0.0.0',
        // open: true,
    },
});

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;