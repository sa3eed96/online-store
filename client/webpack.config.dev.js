const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


process.env.NODE_ENV = "development";

module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'cheap-module-source-map',
    entry: './src/index',
    output:{
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        stats: 'minimal',
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ],
    module:{
        rules:[{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
        },
        {
            test: /(\.css)$/,
            use: ["style-loader", "css-loader"]
        }],
    }
};