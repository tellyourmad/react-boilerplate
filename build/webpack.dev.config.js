'use strict'
const path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config');

module.exports=merge(baseWebpackConfig,{
    mode:'development',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=false'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});