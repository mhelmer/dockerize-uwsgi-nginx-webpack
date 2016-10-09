var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var config = require("./webpack.config.js");
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  proxy: {
    '/api/**': {
      target: 'http://nginx'
    },
    '/media/**': {
      target: 'http://nginx'
    },
    '/api-token-auth/**': {
      target: 'http://nginx'
    }
  },
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
});
server.listen(8000);
