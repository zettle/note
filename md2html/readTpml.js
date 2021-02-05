const fs = require('fs');
const ejs = require('ejs');
const {promisify} = require('util');
const { resolve } = require('./tools');

const readFileASync = promisify(fs.readFile);

const tempDir = resolve('template'); // template的路径
const htmlFilePath = resolve(tempDir, 'template.html'); // 
const tmplAssetsPath = resolve(tempDir, 'assets');

let htmlContentCache = ''; // 读取template.html后的缓存，不用每次都去读取
async function readTmplHtml () {
    if (!htmlContentCache) {
        htmlContentCache = await readFileASync(htmlFilePath, 'utf8');
    }
    return htmlContentCache;
}


module.exports = {
    readTmplHtml,
    tmplAssetsPath
}