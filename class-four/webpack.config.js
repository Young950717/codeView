const htmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
module.exports = {
    entry: './src/index',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundler'
    },
    devTools: 'source-map',
    plugins: [
        new htmlWebpackPlugin({
            template: resolve(__dirname, 'src/index.html')
        })
    ],
    devServer: {
        contentBase: './',
        open: true
    }

}