/* eslint-disable no-undef */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    Lib: './src/js/index.js'
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/'
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.scss']
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: require.resolve('eslint-loader'),
        include: path.resolve(__dirname, '../src/js')
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          require.resolve('stylus-loader')
        ]
      },
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

  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, '..', 'demo'),
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

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      VERSION: `"${require('../package.json').version}"`
    })
  ],

  performance: {
    hints: false
  }
}
