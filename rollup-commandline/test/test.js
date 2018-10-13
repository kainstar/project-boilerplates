/**
 * 这是测试的入口文件，你的测试代码可以写在这个文件或是这个文件引用的文件中
 */
const assert = require('power-assert')
const execa = require('execa')
const pkg = require('../package.json')

describe('command test', function() {
  it('test version', function() {
    return execa.shell('node dist.js --version').then(result => {
      const version = result.stdout
      assert(version === pkg.version)
    })
  })
})
