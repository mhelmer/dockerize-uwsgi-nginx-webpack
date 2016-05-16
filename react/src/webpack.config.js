var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders')
var path = require('path');


var webpackConfig = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './app/index.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: combineLoaders([
            {
              loader: 'react-hot',
              include: path.join(__dirname, 'app'),
              exclude: /node_modules/
            },
            {
              loader:  'babel-loader',
              include: path.join(__dirname, 'app'),
              exclude: /node_modules/,
              query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
              }
            }
        ])
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }
    ]
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
