const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        polyfills: './src/polyfills.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: 'Progressive Web Application'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProvidePlugin({
            join: ['lodash', 'join']
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: require.resolve('./src/index.js'),
                use: 'imports-loader?this=>window'
            },
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?file,parse=helpers.parse'
            }
        ]
    }
};