const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const portfinder = require("portfinder");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const notifier = require('node-notifier')


const PATH = require('./filePath')
const setting = require('./config').portConfig
let webpackConfig = require('./webpack.config.base')
const logger = require('./tool/logger')
const PORT = setting.dev.port || '3000'
const LOCALHOST = setting.dev.localhost || 'localhost'
const proxyConfig = require('./apiTool/proxy.js')


webpackConfig.devtool = 'source-map'

const rennder = (PORT) => {
    let compiler = webpack(webpackConfig)
    logger.success('加载webpack配置成功!')
    logger.info('正在启动服务器 ...')
    let server = new webpackDevServer(compiler, {
        contentBase: PATH.ROOT,
        publicPath: PATH.PUBLICPATH,
        hot: false,
        quiet: true,
        proxy: proxyConfig,
        noInfo: false,
        overlay: {
            warnings: true,
            errors: true
        },
        lazy: false,
        stats: {
            colors: true
        }
    })
    server.listen(PORT, '', () => {
        logger.success('服务器启动成功！')
        logger.success('服务器IP：')
        logger.success(`       http://${LOCALHOST}:${PORT}`)
        logger.success(`       http://${PATH.LAN}:${PORT}`)

    })
}

//接口占用的情况下自动选择可用接口
portfinder.basePort = PORT;
portfinder.getPortPromise()
    .then((port) => {
        webpackConfig.entry.vendor.unshift("webpack-dev-server/client?" +
            `http://${LOCALHOST}:${port}`)
        webpackConfig.plugins.push(
            new OpenBrowserPlugin({
                url: `http://${LOCALHOST}:${port}/webpack-dev-server`
            }),
            new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `Your application is running here: http://${LOCALHOST}:${port}`
                    ]
                },
                onErrors: (severity, errors) => {
                    if (severity !== 'error') return
                    const error = errors[0]
                    const filename = error.file && error.file.split('!').pop()
                    notifier.notify({
                        title: 'oldproject-easy-webpack',
                        message: severity + ': ' + error.name,
                        subtitle: filename || ''
                    })
                }
            })
        )

        rennder(port)
    })
    .catch((err) => {
        logger.error('启动失败')
    });