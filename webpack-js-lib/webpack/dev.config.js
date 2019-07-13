const path = require('path');
const webpack = require('webpack');
const getBaseConfig = require('./base.config');
const merge = require('webpack-merge');
const utils = require('./utils');

module.exports = merge(getBaseConfig(false), {
  devtool: 'cheap-module-source-map',

  devServer: {
    compress: true,
    contentBase: utils.resolve('demo'),
    clientLogLevel: 'none',
    quiet: false,
    open: true,
    historyApiFallback: {
      disableDotRule: true
    },
    watchOptions: {
      ignored: /node_modules/
    }
  },

  plugins: [new webpack.NamedModulesPlugin()],

  performance: {
    hints: false
  }
});
