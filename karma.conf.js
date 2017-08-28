const flow = require('rollup-plugin-flow-no-whitespace');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const common = require('rollup-plugin-commonjs');


// Karma configuration
// Generated on Fri Aug 25 2017 23:03:29 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['rollup', 'coverage'],
      'test/**/*.js': ['rollup']
    },

    rollupPreprocessor: {
      format: 'umd',
      name: 'esFullscreen',
      plugins: [
        babel({
          presets: ['flow', 'es2015-rollup', 'stage-0'],
          plugins: [],
          exclude: 'node_modules/**',
          babelrc: false
        }),
        flow(),
        resolve({
          customResolveOptions: {
            moduleDirectory: ['src', 'node_modules']
          }
        }),
        common()
      ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['IE', 'Chrome', 'Safari', 'Firefox', 'ChromeCanary', 'Opera'],
    browsers: ['Chrome', 'Firefox', 'ChromeCanary', 'Opera'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}