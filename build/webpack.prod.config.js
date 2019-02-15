'use strict'
const path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config');

module.exports=merge(baseWebpackConfig,{
    mode:'production',
    entry:{
        bundle:[
            './src/index.js'
        ],
        vendor:[
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=true'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});