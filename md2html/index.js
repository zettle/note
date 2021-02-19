const fs = require('fs');
const ejs = require('ejs');
const glob = require('glob');
const path  = require('path');
const shell = require('shelljs');
const marked = require('marked');
const hljs = require('highlight.js');
const { promisify } = require('util');
const { resolve } = require('./tools');
const { readTmplHtml, tmplAssetsPath } = require('./readTpml');

const globAsync = promisify(glob);
const readFileAsync = promisify(fs.readFile);
const markedAsync = promisify(marked);
const writeFileAsync = promisify(fs.writeFile);

const imgSuffix = 'png|gif|jepg|jpg';


/**************
 * 对单个md文件的处理
 **************/
async function handSingleMdFile (options, fileFullPath) {
    const {source, output, publicPath, mdConf} = options;
    const regStr = `${source.replace(/\\/g, '/')}(.*)/(.*).md$`;

    const res = fileFullPath.match(new RegExp(regStr));
    if (!res) {
        return false;
    }
    let [, mdTargetDirPath, mdFileName] = res; // 正则匹配出文件要放的路径和文件名
    
    // 文件夹不存在则创建
    mdTargetDirPath =  `${output}${mdTargetDirPath}`;
    if (!shell.test('-d', mdTargetDirPath)) {
        shell.mkdir('-p', mdTargetDirPath);
    }

    // 读取md文件内容，用marked转为html
    const content = await readFileAsync(fileFullPath, 'utf8');
    const article = await markedAsync(content, {
        ...mdConf,
        highlight: (code) =>  hljs.highlightAuto(code).value
    });
    const templHtml = await readTmplHtml();
    const html = await ejs.render(templHtml, { article, publicPath }, {async: true});
    writeFileAsync(`${mdTargetDirPath}/${mdFileName}.html`, html)
}


/**************
 * 匹配指定目录的md文件
 **************/
async function md2html (options) {
    const {source, output, mdConf} = options;
    
    // md文件的处理
    const files = await globAsync(`${source}/**/*.md`);
    files.forEach(file => {
        handSingleMdFile(options, file);
    });

    // img文件的处理
    const imgDirs = await globAsync(`${source}/**/*/img`);
    const regStr = `${source.replace(/\\/g, '/')}(.*)/img$`;
    imgDirs.forEach(imgDir => {
        const res = imgDir.match(new RegExp(regStr));
        if (!shell.test('-d', `${output}${res[1]}`)) {
            shell.mkdir('-p', `${output}${res[1]}`);
        }
        shell.cp('-r', imgDir, `${output}${res[1]}`);
    });

    // 静态css的处理
    const outputDir = resolve(output);
    shell.cp('-r', tmplAssetsPath, outputDir);

    // 生成index.html
    generIndexHtml(options);
}

async function generIndexHtml (options) {
    const {output, publicPath} = options;
    const regDirPath = output.replace(/\\/g, '/');
    const files = await globAsync(output + '/**/*.html');

    const fileObj = {};
    files.forEach(file => {
        const arr = file.replace(regDirPath+'/', '').split('/'); // [ 'front', 'react-redux', '001-redux介绍.html' ]
        const [firstDir, secondDir, fileName] = arr;
        if (!fileObj[firstDir]) {
            fileObj[firstDir] = {};
        }
        if (!fileObj[firstDir][secondDir]) {
            fileObj[firstDir][secondDir] = [];
        }
        fileObj[firstDir][secondDir].push(fileName)
    });

    const templHtml = await readFileAsync(resolve('./dirTemplate/index.ejs'), 'utf8');
    const html = await ejs.render(templHtml, { fileObj, publicPath }, {async: true});
    writeFileAsync(`${output}/index.html`, html)
}

module.exports = md2html;