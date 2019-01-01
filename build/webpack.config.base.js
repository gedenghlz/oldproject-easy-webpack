const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const es3ifyPlugin = require('es3ify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')


const PATH = require('./filePath')
const {
    getEntriesAndOutputs,
    html_plugins
} = require('./tool/getFile')

const pathConfig = getEntriesAndOutputs();


const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__ = NODE_ENV === 'development'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let config = {
    context: path.resolve(__dirname, '../'),
    entry: Object.assign(pathConfig.entries, {
        'vendor': [
            path.join(PATH.POLYFILL), 'jquery-compat'
        ],
    }),
    output: Object.assign({
        filename: '[name].[chunkhash:8].js',
        publicPath: PATH.publicPath
    }),
    module: {
        rules: []
    },
    resolve: {
        modules: [
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx', '.json'],
        alias: {
            '@root': resolve(''), //根目录
            '@build': resolve('build'), //build目录
            '@mock': resolve('build/apiTool/mock') //apiTool目录
        }
    },
    plugins: [
        // 全局暴露统一入口
        new webpack.ProvidePlugin({
            $: 'jquery-compat' //兼容ie8的jQuery版本	
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity,
            filename: 'vendor_dist/[name].[chunkhash:8].js'
        })
    ].concat(html_plugins())
}



config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
        query: {
            cacheDirectory: true,
            plugins: [
                'babel-plugin-transform-class-properties',
                'babel-plugin-syntax-dynamic-import',
                [
                    'babel-plugin-transform-runtime',
                    {
                        helpers: true,
                        polyfill: false, // we polyfill needed features in src/normalize.js
                        regenerator: true,
                    },
                ],
                [
                    'babel-plugin-transform-object-rest-spread',
                    {
                        useBuiltIns: true // we polyfill Object.assign in src/normalize.js
                    },
                ],
            ],
            presets: [
                ['babel-preset-env', { //自动es转义支持
                    modules: false,
                    // babel 转译成 ie9支持
                    targets: {
                        ie9: true,
                    },
                    // tuglify 会把代码完全转换为 ES5 以支持压缩 JS 代码。
                    uglify: true,
                }],
            ]
        },
    }],
})

// Images and template
// ------------------------------------
config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                useRelativePath: true,
                emitFile: false
            }
        }
    ]
}, {
    test: /\.art$/,
    use: [{
        loader: 'art-template-loader',
        options: {
            // htmlResourceRoot: __dirname,
            // root: path.resolve(__dirname)
        }
    }]
})


// ------------------------------------
// Styles
// ------------------------------------

const extractStyles = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
    allChunks: false,
    disable: false,
})

config.module.rules.push({
    test: /\.(sass|scss|css$)$/,
    loader: extractStyles.extract({
        fallback: 'style-loader',
        use: [{
                loader: 'css-loader',
                options: {
                    sourceMap: __DEV__ ? true : false,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions', 'ie 6-8', 'Android > 4', 'ios > 7'],
                        },
                        discardComments: {
                            removeAll: true,
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: __DEV__ ? true : false,
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: __DEV__ ? true : false,
                    includePaths: [
                        PATH.STYLE
                    ],
                },
            }
        ],
    })
})




// config.plugins.push(
//     new CopyWebpackPlugin(copyFileConfig)
// )


config.plugins.push(extractStyles)
config.plugins.push(new es3ifyPlugin())
// Fonts
// ------------------------------------
;
[
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml'],
].forEach((font) => {
    const extension = font[0]
    const mimetype = font[1]
    config.module.rules.push({
        test: new RegExp(`\\.${extension}$`),
        loader: 'url-loader',
        options: {
            name: 'fonts/[name].[ext]',
            limit: 10000,
            mimetype,
        },
    })
})

config.module.rules.push({
    test: /\.ejs/,
    loader: 'ejs-render-loader'
})

module.exports = config