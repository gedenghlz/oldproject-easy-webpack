/**
 *  获取入口js和配置html和静态资源
 * */

const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devPaths = require('./getDevPath.js').devPaths;
let fs = require('fs');
let path = require('path');

const PATH = require('../filePath.js');

//获取js入口
function getEntriesAndOutputs() {
    let entries = {};
    devPaths.forEach(entryJsPath => {
        let entryFiles = glob.sync(entryJsPath + '/**/*.js');
        for (let i = 0; i < entryFiles.length; i++) {
            let filePath =entryFiles[i].split(path.sep).join('/');
            let ROOT = PATH.ROOT.split(path.sep).join('/');
            if (filePath.indexOf('_static') == -1) {
                let filename = filePath.substring(0, filePath.lastIndexOf('/') + 1).replace(ROOT + '/', '').replace('_entries', '_dist');
                let name = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
                entries[filename + name] = filePath
            }
        }
    })
    return {
        entries
    }
}


//获取html入口
function html_plugins() {
    let htmlPluginItems = []
    devPaths.forEach((viewPAth) => {
        let entryHtml = glob.sync(viewPAth + '/**/*.html')
        for (let i = 0; i < entryHtml.length; i++) {
            let filePath =entryHtml[i].split(path.sep).join('/');
            let ROOT = PATH.ROOT.split(path.sep).join('/');       
            if (filePath.indexOf('_static') == -1) {
                let filename = filePath.substring(0, filePath.lastIndexOf('/') + 1).replace(ROOT + '/', '').replace('_entries', '_dist');
                let name = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
                
                let conf = {
                    template: filePath,
                    filename: filename + name + '.html',
                    hash: false, // 为静态资源生成hash值
                    chunks: ['manifest', 'vendor', filename + name],
                    minify: false
                }
                htmlPluginItems.push(new HtmlWebpackPlugin(conf))
            }
        }
    })

    return htmlPluginItems
}

//获取静态文件路径，用于后面直接拷贝
let staticFilesPaths = [];
function getStaticFile(devPath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdirSync(devPath).forEach(function (filename) {
        //获取当前文件的绝对路径
        let filedir = path.join(devPath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir)

        let isFile = stats.isFile();

        if (isFile) {

            if (filedir.indexOf('_static') > 0) {
                staticFilesPaths.push(filedir);
            }
        } else {
            getStaticFile(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    })
}

function getStaticFiles() {
    devPaths.forEach(dirPath => {
        getStaticFile(dirPath)
    })
}
getStaticFiles()

module.exports = {
    html_plugins,
    getEntriesAndOutputs,
    staticFilesPaths
}