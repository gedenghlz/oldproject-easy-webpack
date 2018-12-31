let fs = require('fs');
const webpack = require('webpack');
let path = require('path');
const PATH = require('./filePath')
const CopyWebpackPlugin = require('copy-webpack-plugin');

//解析需要遍历的文件夹
let filePath = path.resolve(PATH.SRC);

let copyFileConfig = [];
let packFileConfig = [];
let reg = new RegExp('^/((?!\/)+)$');

let config = {
    entry: path.join(PATH.ROOT, '/src/webpackConfig/split.js'),
    output: {
        path: path.join(PATH.ROOT, '/src/webpackConfig'),
        filename: "split1.js",//通过判断目录下是否有split1.js来控制阻止重复分割
        publicPath: PATH.PUBLICPATH
    },
    plugins: [

    ]
}

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdirSync(filePath).forEach(function (filename) {
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir)
        let isFile = stats.isFile(); //是文件
        let isDir = stats.isDirectory(); //是文件夹
        if (isFile) {
            let pathStr =
                filedir.split('webSrc/')[1];
            if (pathStr.indexOf('_unPack') === -1 && pathStr.indexOf('_tP') === -1) {
                copyFileConfig.push({
                    from: filedir,
                    to: filedir.replace('webSrc/src/', ''),
                    force: true
                })
            } else if (pathStr.indexOf('_tP') > -1) {
                packFileConfig.push(filedir);
            }
        }
        if (isDir) {
            let str = filedir.split('webSrc')[1];
            if (str.indexOf('_unPack') === -1) {
                fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }

        }
    })
}

config.plugins.push(
    new CopyWebpackPlugin(copyFileConfig)
)

module.exports = config;