import base from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import {camelize} from 'toxic-utils';
const {name} = require('../package.json');
const config = base('umd');
config.plugins.push(
  serve(),
  livereload()
);
config.input = 'demo/base/index.js';
config.plugins.unshift(replace({
  'process.env.NODE_ENV': '"development"'
}));
export default Object.assign(config, {
  output: {
    format: 'iife',
    file: 'lib/index.dev.js'
  },
  name: camelize(name)
});
