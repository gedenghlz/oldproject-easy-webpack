/**
 *  获取入口js和配置html
 * */

const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devPaths = require('./getDevPath.js').devPaths;

const PATH = require('../filePath.js');


function getEntriesAndOutputs() {
    let entries = {};
    devPaths.forEach((entryJsPath, index) => {
        let entryFiles = glob.sync(entryJsPath + '/**/*.js');
        for (let i = 0; i < entryFiles.length; i++) {
            let filePath = entryFiles[i];
            let filename = filePath.substring(0, filePath.lastIndexOf('\/') + 1).replace(PATH.ROOT + '/', '').replace('_entries', '_dist');
            let name = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            entries[filename + name] = filePath
        }
    })
    return {
        entries
    }
}

function html_plugins() {
    let entriesFiles = getEntriesAndOutputs().entries
    let htmlPluginItems = []
    devPaths.forEach((viewPAth, index) => {
        let entryHtml = glob.sync(viewPAth + '/**/*.html')
        for (let i = 0; i < entryHtml.length; i++) {
            let filePath = entryHtml[i]
            let filename = filePath.substring(0, filePath.lastIndexOf('\/') + 1).replace(PATH.ROOT + '/', '').replace('_entries', '_dist');
            let name = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            let conf = {
                template: filePath,
                chunksSortMode:'manual',
                filename: filename + name + '.html',
                hash: false, // 为静态资源生成hash值
                chunks: ['manifest', 'vendor', filename + name],
                minify: {
                    removeComments: true, //移除HTML中的注释
                    collapseWhitespace: false //删除空白符与换行符
                }
            }
            htmlPluginItems.push(new HtmlWebpackPlugin(conf))
        }
    })

    return htmlPluginItems
}


module.exports = {
    html_plugins,
    getEntriesAndOutputs
}