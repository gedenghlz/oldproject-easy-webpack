const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const EncodingPlugin = require('webpack-encoding-plugin');

let webpackConfig = require('./webpack.config.base')
const PATH = require('./filePath')
const distPaths = require('./tool/getDevPath.js').distPaths;
const configs = require('./config');

distPaths.forEach(dir => {
    webpackConfig.plugins.unshift(
        new CleanWebpackPlugin([dir], {
            root: PATH.PUBLICPATH,
            verbose: true,
            dry: false,
            exclude: []
        })
    )
})

webpackConfig.plugins.unshift(
    new CleanWebpackPlugin([PATH.VENDOR], {
        root: PATH.PUBLICPATH,
        verbose: true,
        dry: false,
        exclude: []
    }))


if (configs.encodingConfig.encoding) {
    webpackConfig.plugins.push(new EncodingPlugin(configs.encodingConfig))
}

webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        comments: false,
        compress: {
            warnings: false,
            screw_ie8: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            properties: false
        },
        output: {
            beautify: false,
            quote_keys: true
        },
        mangle: {
            screw_ie8: false
        },
        parallel: true,
        cache: true
    })
)

module.exports = webpackConfig