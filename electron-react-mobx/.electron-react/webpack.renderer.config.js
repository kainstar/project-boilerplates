'use strict';

process.env.BABEL_ENV = 'renderer';

const path = require('path');
const { dependencies } = require('../package.json');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const notPord = process.env.NODE_ENV !== 'production';

/**
 * List of node_modules to include in webpack bundle
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
 */
const whiteListedModules = [];
const styleLoader = [
  notPord ? {
    // dev style loader
    loader: 'style-loader',
  } : {
    // prod extract loader
    loader: MiniCssExtractPlugin.loader,
  }
]

const rendererConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    renderer: path.join(__dirname, '../src/renderer/index.tsx'),
  },
  externals: [...Object.keys(dependencies || {}).filter((d) => !whiteListedModules.includes(d))],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {},
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.global\.scss$/,
        use: [
          ...styleLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          ...styleLoader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          ...styleLoader,
          'css-loader'
        ],
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name]--[folder].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]'
          }
        }
      }
    ],
  },
  node: {
    __dirname: notPord,
    __filename: notPord,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      nodeModules: notPord ? path.resolve(__dirname, '../node_modules') : false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json', '.css', 'scss', '.node'],
  },
  target: 'electron-renderer',
};

if (notPord) {
  /**
   * Adjust rendererConfig for development settings
   */
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`,
    }),
  );
} else {
  /**
   * Adjust rendererConfig for production settings
   */
  rendererConfig.devtool = '';

  rendererConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist/static'),
        ignore: ['.*'],
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  );

}

module.exports = rendererConfig;
