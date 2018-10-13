/* eslint-disable no-undef */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  bail: true,

  entry: {
    Lib: './src/js/index.js'
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].min.js',
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
          require.resolve('template-string-optimize-loader'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                config: {
                  path: path.join(__dirname, 'postcss.config.js')
                }
              }
            },
            require.resolve('stylus-loader')
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                config: {
                  path: path.join(__dirname, 'postcss.config.js')
                }
              }
            }
          ]
        })
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

  plugins: [
    new webpack.DefinePlugin({
      VERSION: `"${require('../package.json').version}"`
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        ascii_only: true
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css'
    })
  ]
}
