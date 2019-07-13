const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getBaseConfig = require('./base.config');
const merge = require('webpack-merge');

module.exports = merge(getBaseConfig(true), {
  bail: true,

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});
