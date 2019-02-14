const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const es3ifyPlugin = require('es3ify-webpack-plugin');
const HappyPack = require('HappyPack');
const HtmlStringReplace = require('html-string-replace-webpack-plugin');


const PATH = require('./filePath');
const {
    getEntriesAndOutputs,
    html_plugins,
    staticFilesPaths
} = require('./tool/getFile')
const configs = require('./config');

const pathConfig = getEntriesAndOutputs();


const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__ = NODE_ENV === 'development'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const extractStyles = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
    allChunks: false,
    disable: false,
})


let config = {
    context: path.resolve(__dirname, '../'),
    entry: Object.assign({
        'vendor': [
            path.join(PATH.POLYFILL), "jquery-compat"
        ].concat(__DEV__ ? [path.join(PATH.MOCK)] : [])
    }, pathConfig.entries),
    output: Object.assign({
        filename: '[name].[chunkhash:8].js',
    }),
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                        loader: 'cache-loader', //减少编译时间
                        options: {
                            cacheDirectory: path.resolve('build/', '.cache')
                        }
                    },
                    {
                        loader: 'happypack/loader?id=happyBabel'
                    }

                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true,
                        emitFile: false
                    }
                }]
            },
            {
                test: /\.art$/,
                use: [{
                    loader: 'art-template-loader',
                }]
            },
            {
                test: /\.(sass|scss|css$)$/,
                loader: extractStyles.extract({
                    fallback: 'style-loader',
                    publicPath: './',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: __DEV__ ? true : false,
                                minimize: {
                                    autoprefixer: {
                                        add: true,
                                        remove: true,
                                        browsers: ['last 2 versions', 'ie 6-8'],
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
            }

        ]
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
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    "presets": [
                        "es2015",
                        "stage-0"
                    ],
                    "plugins": [
                        "add-module-exports", "transform-runtime"
                    ]
                },
            }]
        }),
        // 全局暴露统一入口
        new webpack.ProvidePlugin({
            $: 'jquery-compat' //兼容ie8的jQuery版本	
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity,
            filename: 'vendor_dist/[name].[chunkhash:8].js'
        }),

        extractStyles,
        new es3ifyPlugin(),
        new CopyWebpackPlugin(staticFilesPaths.map(dir => {
            return {
                from: dir,
                to: dir.replace('_entries', '_dist')
            }
        }))
    ].concat(html_plugins()).concat([
        new HtmlStringReplace({
            enable: true,
            patterns: configs.htmlReplaceStringConfig.map(item => {
                return {
                    match: item.match,
                    replacement: function () {
                        return item.value
                    }
                }
            })

        })
    ])
}

configs.useanAbsolutePath && (config.output.publicPath = '/');


module.exports = config