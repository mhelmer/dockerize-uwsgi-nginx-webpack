var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: './app/index.jsx',
  output: {
    path: 'dist',
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Custom template',
    template: './app/index.html',
    inect: 'body'
  })]
};

module.exports = webpackConfig;
