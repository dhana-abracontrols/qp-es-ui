const npsUtils = require('nps-utils')
const series = npsUtils.series
const rimraf = npsUtils.rimraf

module.exports = {
  scripts: {
    clean: {
      default: series(
        rimraf('dist'),
        rimraf('docs/dist')
      )
    },
    build: {
      description: 'clean dist directory and run all builds',
      default: series(
        rimraf('dist'),
        'nps build.rollup'
      ),
      rollup: 'rollup --config ./rollup.config.js --environment BUILD:production',
      docs: series(rimraf('docs/dist'), 'webpack --progress -p')
    },
    publish: {
      default: 'nps build'
    }
  }
}
