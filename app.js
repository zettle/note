const md2html = require('./md2html');
const path = require('path');

function resolve (filePath) {
    return path.resolve(__dirname, filePath);
}

md2html({
    publicPath: process.env.NODE_ENV=== 'production' ? 'note' : 'dist', // 生产note， 本地dist
    source: resolve('./src'),
    output: resolve('./dist'),
    mdConf: {}
});
