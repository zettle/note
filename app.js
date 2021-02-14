const md2html = require('./md2html');
const path = require('path');

function resolve (filePath) {
    return path.resolve(__dirname, filePath);
}

md2html({
    publicPath: 'note',
    source: resolve('./src'),
    output: resolve('./note'),
    mdConf: {}
});