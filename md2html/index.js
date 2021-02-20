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
    console.log('===', tmplAssetsPath, outputDir);
    shell.cp('-r', tmplAssetsPath, outputDir);

    // 生成index.html
    generIndexHtml(options);
}

async function generIndexHtml (options) {
    const {source} = options;
    const srcDirs = fs.readdirSync(source);
    console.log('srcDirs', srcDirs);
    srcDirs.forEach(srcDir => {
        generIndexSingle(srcDir, options); // 为每个目录生产一个index.html
    });
    // const templHtml = await readFileAsync(resolve('./dirTemplate/index.ejs'), 'utf8');
    // const tttt = 'front';
    // const tarDir = path.resolve(output, tttt);
    // const dirs = fs.readdirSync(tarDir);
    // const aLinks = dirs.map(dir => {
    //     const aLink = `./${tttt}/${dir}/index.html`;
    //     return aLink;
    // });
    // const html = await ejs.render(templHtml, { aLinks, publicPath }, {async: true});
    // console.log('html', `${tarDir}/index.html`);
    // writeFileAsync(`${tarDir}/index.html`, html)
}

async function generIndexSingle (srcDir, options) {
    const {source, output, publicPath} = options;
    const tarDir = path.resolve(output, srcDir); // E:\workspace\note\dist\front
    // console.log('srcDir', srcDir);
    // console.log('tarDir', tarDir);
    const files = await globAsync(`${tarDir}/**/*.html`);
    console.log(files);

}

module.exports = md2html;