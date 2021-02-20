const md2html = require('./md2html');
const path = require('path');

function resolve (filePath) {
    return path.resolve(__dirname, filePath);
}

md2html({
    publicPath: 'note', // 要看gitee上给的是什么
    source: resolve('./src'),
    output: resolve('./dist'),
    mdConf: {}
});

