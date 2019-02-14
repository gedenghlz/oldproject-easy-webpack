/**
 * 获取入口文件夹
 * */
let fs = require('fs');
let path = require('path');
const PATH = require('./../filePath')

let devPaths = [];
let distPaths = [];

//解析需要遍历的文件夹
let filePath = PATH.ROOT;
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
        let isDir = stats.isDirectory(); //是文件夹
        if (isDir) {
            if (filedir.indexOf('_entries') > 0) {
                devPaths.push(filedir);
                distPaths.push(filedir.replace('_entries', '_dist'));

            } else {
                fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
        }
    })
}

module.exports = {
    distPaths,
    devPaths
};