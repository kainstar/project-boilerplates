var path = require('path')
var glob = require('glob')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 用于做相应的merge处理
var merge = require('webpack-merge')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function (globPath) {
  var entryFiles = glob.sync(globPath)
  var entryMap = {}
  entryFiles.forEach((filePath) => {
    var basename = path.basename(filePath, path.extname(filePath))
    entryMap[basename] = filePath
  })
  return entryMap
}

exports.histroyRewrites = function (globPath) {
  var entryFiles = glob.sync(globPath)
  var rewrites = []
  entryFiles.forEach((filePath) => {
    var basePath = path.basename(filePath, path.extname(filePath))
    if (basePath !== 'index') {
      rewrites.push({
        from: `/${basePath}`,
        to: `/${basePath}.html`
      })
    }
  })
  return rewrites
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function (globPath) {
  var pages = exports.entries(globPath)
  var htmlWebpackPluginsArr = []
  for (var page in pages) {
    var conf = {
      // 模板路径
      template: pages[page],
      // 文件名称
      filename: page + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      // chunks: ['manifest', 'vendor', page],
      // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
      // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
      // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
      // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
      excludeChunks: Object.keys(pages).filter(item => {
        return (item != page)
      }),
      inject: true
    }

    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }

    htmlWebpackPluginsArr.push(new HtmlWebpackPlugin(conf))
  }

  return htmlWebpackPluginsArr
}
