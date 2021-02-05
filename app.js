const md2html = require('./md2html');
const path = require('path');

function resolve (filePath) {
    return path.resolve(__dirname, filePath);
}

md2html({
    source: resolve('./src'),
    output: resolve('./dist'),
    mdConf: {}
});