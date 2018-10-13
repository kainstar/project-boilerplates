const { basename } = require('path')

/**
 * 文件路径转模块名（去.js后缀），并排除 index.js 入口文件
 *
 * @param {Array<String>} filenames 文件名数组
 * @returns {Array<String>}
 */
module.exports = function normailzeModule (filenames) {
  return filenames
    .filter(filename => filename !== 'index.js')
    .map(filename => basename(filename, '.js'))
}