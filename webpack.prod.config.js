const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
}

module.exports = {
  context: paths.src,
  entry: ['./app.js', './main.scss'],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(paths.dist,"dist"),
    publicPath: 'dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader', 'sass-loader'
        ]),
      }
    ],
  },
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: '4800',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.bundle.css',
      allChunks: true,
    })
  ],
}
