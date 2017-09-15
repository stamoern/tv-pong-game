/**
 * Created by stamoern on 15.09.17.
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        client: './src/client',
        tv: './src/tv'
    },
    output: {
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            root: '.',
                            modules: true,
                            localIdentName: '[folder]__[local]--[hash:base64:5]',
                        }
                    }]
                })
            },
            {
                test: /\/tv\/.+\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: '[path][name].[ext]',
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name]/bundle.css'),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            chunks: ['client'], title: 'Client', filename: 'index.html', template: 'src/client/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['tv'], title: 'TV', filename: 'tv/index.html', template: 'src/tv/index.html'
        })
    ]
};
