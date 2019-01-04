const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let webpackConfig = require('./webpack.config.base')
const PATH = require('./filePath')
const distPaths = require('./tool/getDevPath.js').distPaths;

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
            properties:false
        },
        output:{
            beautify:true,
            quote_keys:true
        },
        mangle:{
            screw_ie8:false
        }
    })
)

module.exports = webpackConfig