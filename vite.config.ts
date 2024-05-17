import VitePluginVitepressDemo from 'vite-plugin-vitepress-demo';
import { defineConfig } from 'vite';

export default defineConfig({
    // glob: './**/demo/**/*.{vue,jsx,tsx,js,ts}' 这里表示扫描所有demo目录下的vue,jsx,tsx,js,ts作为demo示例代码
    plugins: [VitePluginVitepressDemo({ glob: './**/demo/**/*.{vue,jsx,tsx,js,ts}' })],
    server: {
        host: '0.0.0.0',
        // open: true,
    },
});
