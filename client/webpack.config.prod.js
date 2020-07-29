const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


process.env.NODE_ENV = "production";

module.exports = {
    mode: 'production',
    target: 'web',
    devtool: 'cheap-module-source-map',
    entry: './src/index',
    output:{
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
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