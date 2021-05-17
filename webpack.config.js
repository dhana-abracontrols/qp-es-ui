const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'docs'),
  entry: {
    index: ['@babel/polyfill', './index.js']
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    port: 8000,
    historyApiFallback: true
  },
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: {
                localIdentName: process.env.NODE_ENV === 'production'
                  ? '[hash:base64]'
                  : '[path][name]__[local]--[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'qp-es-ui': path.resolve(__dirname, 'src/index')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'docs/index.html')
    }),
    new CopyWebpackPlugin(['favicon.ico']),
    new webpack.DefinePlugin({
      API_KEY: process.env.NODE_ENV === 'development'
        ? JSON.stringify(process.env.API_KEY)
        : JSON.stringify('')
    })
  ]
}
