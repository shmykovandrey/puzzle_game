const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    devServer : {
        static : {
            directory: path.join(__dirname, 'public')
        },
        port: 9000,
    },
    entry: './src/index.js',
    output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin(), new ESLintPlugin()],
  mode: "development"
}