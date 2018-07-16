// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:

import path from 'path'
import replace from 'rollup-plugin-replace'
import flow from 'rollup-plugin-flow-no-whitespace'
import resolveId from 'rollup-plugin-resolve-id'

import babelrc from '../.babelrc'
import { version, name, author, license, dependencies } from '../package.json'

const banner = (name, short = false) => {
  let s;
  if (short) {
    s = `/* ${name} v${version} | ${license} Licensed | ${author} */`
  } else {
    s = `/*
 * ${name} v${version}
 *
 * @author ${author}
 * Released under the ${license} License.
 */`
  }
  return s + '\n'
}

const resolve = p => path.resolve(__dirname, '..', p)
const plugins = [
  resolveId({
    extensions: ['.js', '.ts'],
    alias: {
      'toxic-utils': require.resolve('toxic-utils/src'),
      'toxic-decorators': require.resolve('toxic-decorators/src'),
      'toxic-predicate-functions': require.resolve('toxic-predicate-functions/src')
    }
  }),
  'babel',
  flow,
  'resolve',
  'commonjs',
  replace({ 'process.env.NODE_ENV': `'production'` })
]

export default {
  destDir: resolve('lib'),
  dependencies,
  pluginOptions: {
    babel (rollupCfg) {
      const cfg = {
        ...babelrc,
        babelrc: false,
        externalHelpers: false,
        runtimeHelpers: false,
        include: [ '{src,demo}/**', 'node_modules/{\0,toxic-*}/src/**' ]
      }
      cfg.plugins.forEach((o, i) => {
        const name = typeof o === 'string' ? o : o[0]
        if (o === 'transform-es2015-modules-commonjs') cfg.plugins.splice(i, 1)
      })
      return cfg
    }
  },
  entry: [
    {
      input: resolve('src/index.js'),
      plugins,
      output: [
        { format: 'umd', name: 'ESFullscreen', file: 'index.js', banner: banner(name) },
        { format: 'es', file: 'index.esm.js', banner: banner(name, true) } ]
    },
    {
      input: resolve('demo/base/index.js'),
      plugins,
      output: { format: 'iife', file: 'index.dev.js', minimize: false, banner: banner(name) }
    }
  ]
}
