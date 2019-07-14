const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.cssLoaders = function(options) {
  options = options || {};

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions, cssModules = false) {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        modules: cssModules,
        sourceMap: options.sourceMap,
      },
    };

    const loaders = options.usePostcss ? [cssLoader, postcssLoader] : [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [MiniCssExtractPlugin.loader, ...loaders];
    } else {
      return ['style-loader', ...loaders];
    }
  }

  return {
    css: generateLoaders(),
    'm.scss': generateLoaders('sass', {}, true),
    scss: generateLoaders('sass'),
  };
};

exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension.replace('.', '\\.') + '$'),
      use: loader,
    });
  }
  return output;
};
