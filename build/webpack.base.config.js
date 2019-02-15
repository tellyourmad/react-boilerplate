'use strict'
const devMode = process.env.NODE_ENV !== 'production',
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    context: path.resolve(__dirname, '..'),
    module: {
        rules: [
            {
                // 当前项目的less文件，启用CSS modules
                test: /\.(css|sass)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: devMode?'style-loader':MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 3,
                            localIdentName: '[name].[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader:'babel-loader'
            },
            {
                test: /\.woff(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name].[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name].[hash:8].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?prefix=fonts/&name=[name].[hash:8].[ext]&limit=10000&mimetype=font/opentype'
            },
            {
                test: /\.ttf(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name].[hash:8].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.*)?$/,
                use: 'file-loader?prefix=fonts/&name=[name].[hash:8].[ext]'
            },
            {
                test: /\.svg(\?.*)?$/,
                use: 'url-loader?prefix=fonts/&name=[name].[hash:8].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.sass'],
        alias:{}
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            // favicon: './static/BookMark.png',
            filename: './index.html',
            template: './view/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: './[name].[contenthash:8].css',
            chunkFilename: './[id].[contenthash:8].css',
        })
    ]
};
