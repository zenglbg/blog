const process = require('process'),
  webpack = require('webpack'),
  rules = require('./loaders'),
  config = require('./config'),
  resolve = require('./resolve'),
  plugins = require('./plugins'),
  __DEV__ = (process.env.NODE_ENV || 'development') === 'development';

const base = {
  entry: __DEV__ ? config.apps.entry.dev : config.apps.entry.prod,
  output: config.apps.output,
  // devtool: __DEV__ ? config.apps.devtool.dev : appConfig.apps.devtool.prod,
  plugins: __DEV__
    ? [].concat(plugins.dev_plugins)
    : [].concat(plugins.prod_plugins),
  mode: __DEV__ ? 'development' : 'production',
  resolve: resolve.resolve,
  resolveLoader: resolve.resolveLoader,
  module: {
    rules
  }
};

module.exports = __DEV__
  ? Object.assign({}, base, {
      devServer: config.dev_server
    })
  : base;
