// https://github.com/michael-ciniawsky/postcss-load-config

const AUTOPREFIXER_CONFIG = {
  plugins: {
    // to edit target browsers: use "browserlist" field in package.json
    autoprefixer: {
      browsers: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ]
    }
  }
}

module.exports = process.env.NODE_ENV === 'production' ? AUTOPREFIXER_CONFIG : {}
