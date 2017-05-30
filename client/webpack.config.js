const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: 'index.css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/AdminLTE-2.3.11') }
    ])
  ]
}
