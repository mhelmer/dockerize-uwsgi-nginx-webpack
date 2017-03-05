var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


var webpackConfig = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      'babel-polyfill',
      './app/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /.jsx?$/,
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'sass-loader',
          options:  { sourceMap: true }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './app/index.html',
      inect: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = webpackConfig;
