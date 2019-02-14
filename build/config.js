exports.portConfig = {
    dev: { //开发设置
        port: '8080', //端口 设置
        localhost:'localhost'
    },
    pro: { //生产模式
        port: '80', //端口 设置
    },
    
}


/** 
 * 替换打包后html中的内容
 比如传入：
 [{
     match:/charset=utf-8/g,//需匹配的内容
     value:'charset=gb2312'  //需替换的内容
 }]
 html中所有的charset=utf-8都会被替换为charset=gb2312 
 如果有多个字符需要替换可以在数组放多个
 [{...},{...}],比如传入：
[    {
        match: /utf-8/gi, //需匹配的内容
        value: 'gbk' //需替换的内容
    },
    {
        match: /<script/g, //需匹配的内容
        value: '<script charset="utf-8"' //需替换的内容
    },
    {
        match: /<link/g, //需匹配的内容
        value: '<link charset="utf-8"' //需替换的内容
    }
]

 * 
*/
exports.htmlReplaceStringConfig = [

]

/**
 * 自定义编码问题
 * include:需要包含的文件，比如：/(\.html)($|\?)/i 
 * exclude:需要剔除的文件，比如：/(\.js|\.css)($|\?)/i
 * 比如传入：
 {
    encoding: 'gb2312',
    test: /(\.html)($|\?)/i
}
 * */
exports.encodingConfig = {


}
//打包后的文件使用绝对路径引入
exports.useanAbsolutePath = false