import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';

import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  autoExternal(),
  // 替换源文件内容
  replace({
    exclude: 'node_modules/**',
    delimiters: ['{{', '}}'],
    values: {
      VERSION: pkg.version
    }
  }),
  // 解决第三方模块依赖
  nodeResolve(),
  // commonjs转es6模块
  commonjs(),
  typescript()
];

const entryFile = './src/index.ts';
const destFile = './dist/main.js';

/**
 * @type {import('rollup').RollupWatchOptions}
 */
const config = {
  input: entryFile,
  output: {
    noConflict: true,
    file: destFile,
    format: 'cjs'
  },
  plugins: plugins
};

export default config;
