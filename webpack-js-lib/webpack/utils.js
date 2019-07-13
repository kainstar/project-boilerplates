const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = (...ps) => path.resolve(__dirname, '..', ...ps);

const getStylesLoader = (isProd) => {
  const finalLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

  const cssLoader = {
    loader: 'css-loader'
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      config: {
        path: resolve('webpack/postcss.config.js')
      }
    }
  };

  return [
    {
      test: /\.scss$/,
      use: [finalLoader, cssLoader, postcssLoader, 'sass-loader']
    },
    {
      test: /\.css$/,
      use: [finalLoader, cssLoader, postcssLoader]
    }
  ];
};

module.exports = {
  resolve,
  getStylesLoader
};
