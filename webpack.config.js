const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|mp3)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
      new CompressionPlugin(),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
    new CopyWebpackPlugin([{
      from: "public/manifest.json"
    }, {
      from: "public/icon16.png"
    }, {
      from: "public/icon48.png"
    }, {
      from: "public/icon128.png"
    }])
  ]
};