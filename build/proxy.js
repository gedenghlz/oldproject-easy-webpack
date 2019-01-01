/**
 * 更多配置请参考http-proxy-middleware 
 * 文档地址:https://www.npmjs.com/package/http-proxy-middleware
 */
const proxyConfig = {
    "/sjgl": // 代理解析路径,只要请求的接口是以/sjgl开头都会被代理
    {
        target: "http://192.168.150.99:8800", //实际需要发送请求的服务器
        changeOrigin: true, //是否跨域
        logLevel:'debug' //在控制台显示代理日志
    }
}

module.exports = proxyConfig;