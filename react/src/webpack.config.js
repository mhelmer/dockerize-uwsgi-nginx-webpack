var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: './app/index.js',
  output: {
    path: 'dist',
    filename: 'js/bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};

module.exports = webpackConfig;
