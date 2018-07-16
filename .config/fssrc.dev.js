import { dirname } from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import cfg from './fssrc'

const plugins = cfg.entry[1].plugins.slice(0)

plugins.push(...[
  serve({
    port: 4001,
    host: '0.0.0.0',
    contentBase: dirname(__dirname)
  }),
  livereload()
])

cfg.entry[1].plugins = plugins

export default cfg
