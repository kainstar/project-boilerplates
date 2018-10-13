import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  // eslint检查
  eslint({
    throwOnError: true,
    throwOnWarning: true,
    include: ['src/**'],
    exclude: ['node_modules/**']
  }),
  // 替换源文件内容
  replace({
    exclude: 'node_modules/**',
    delimiters: ['{{', '}}'],
    VERSION: pkg.version
  }),
  // 解决第三方模块依赖
  nodeResolve({
    jsnext: true,
    main: true
  }),
  // commonjs转es6模块
  commonjs(),
  // 解析babel语法
  babel({
    exclude: 'node_modules/**'
  })
]

const externalModules = Object.keys(pkg.dependencies)
const entryFile = './src/index.js'
const destFile = 'dist.js'

export default {
  input: entryFile,
  output: {
    file: destFile,
    format: 'cjs'
  },
  external: externalModules,
  plugins: plugins
}
