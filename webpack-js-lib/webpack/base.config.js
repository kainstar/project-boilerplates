const utils = require('./utils');
const webpack = require('webpack');

const libName = process.env.LibName || 'lib';

/**
 * @param {boolean} isProd
 * @return {import('webpack').Configuration}
 */
const getBaseConfig = (isProd) => ({
  mode: isProd ? 'production' : 'development',
  optimization: {
    minimize: false
  },
  entry: {
    [libName]: utils.resolve('src/index.ts')
  },
  output: {
    path: utils.resolve('dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      ...utils.getStylesLoader(isProd),
      {
        test: /\.(png|jpg)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 40000
        }
      },
      {
        test: /\.(woff|svg|eot|ttf)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 40000
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: `"${require('../package.json').version}"`
    })
  ]
});

module.exports = getBaseConfig;
