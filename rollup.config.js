import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss-modules'
import replace from 'rollup-plugin-replace'

import autoprefixer from 'autoprefixer'

import pkg from './package.json'

const env = process.env.BUILD_ENV || 'development'
const name = 'UIKit' // * Used as default export name in CDN projects
const path = 'dist/qp-es-ui'
// * Globals are peer dependencies that are required to run the package. This
// * Maps how the exported bundle can find it.
// * Roughly: import React from 'react'
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}
// * This function excludes files from being included in the bundle
const external = id => {
  if (globals.hasOwnProperty(id)) {
    return true
  }
}

const babelOptions = () => ({
  babelrc: false,
  externalHelpers: false,
  runtimeHelpers: true,
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    // for async await syntax
    ['@babel/plugin-transform-runtime', { 'helpers': false }]
  ],
  exclude: 'node_modules/**'
})

export default [
  {
    input: 'src/index.js',
    output: { // * For ES6 React app projects
      file: pkg.module,
      format: 'es'
    },
    external,
    plugins: [
      babel(babelOptions()),
      resolve(),
      commonjs(),
      postcss({
        minimize: true,
        plugins: [ autoprefixer() ]
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
      terser({ mangle: false, compress: false })
    ]
  },
  {
    input: 'src/index.js',
    output: { // * For ES5 React app projects
      name,
      file: path + '.js',
      format: 'umd',
      globals
    },
    external,
    plugins: [
      babel(babelOptions()),
      resolve(),
      commonjs(),
      postcss({
        minimize: true,
        plugins: [ autoprefixer() ]
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
      terser({ mangle: false, compress: false })
    ]
  },
  {
    input: 'src/index.js',
    output: { // * For CDN style projects
      name,
      file: path + '.min.js',
      format: 'umd',
      globals
    },
    external,
    plugins: [
      babel(babelOptions()),
      resolve(),
      commonjs(),
      postcss({
        minimize: true,
        plugins: [ autoprefixer() ]
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
      terser({ mangle: { reserved: ['Error', 'TimeoutError'] } })
    ]
  }
]
