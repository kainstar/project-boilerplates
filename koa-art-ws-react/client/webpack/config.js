const resolve = require('./utils/resolve');

const baseConfig = {
  path: {
    root: resolve(),
    src: resolve('src'),
    dist: resolve('../public'),
    static: resolve('static'),
  },
};

const devConfig = {
  // Paths
  assetsSubDirectory: '',
  assetsPublicPath: '/',
  proxyTable: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    },
  },

  // Various Dev Server settings
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
  autoOpenBrowser: true,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

  /**
   * Source Maps
   */
  // https://webpack.js.org/configuration/devtool/#development
  devtool: 'cheap-module-eval-source-map',

  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  cssSourceMap: false,
};

const buildConfig = {
  // Paths
  assetsRoot: resolve('../public'),
  assetsSubDirectory: '',
  assetsPublicPath: '/',

  /**
   * Source Maps
   */
  productionSourceMap: true,
  // https://webpack.js.org/configuration/devtool/#production
  devtool: '#source-map',

  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,
};

module.exports = {
  base: baseConfig,
  dev: devConfig,
  build: buildConfig,
};
