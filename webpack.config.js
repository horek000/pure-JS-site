const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  entry: {
    index: './src/index.js',
    sub: './src/sub.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/sub.html',
      inject: true,
      chunks: ['sub'],
      filename: 'sub.html',
    }),
  ],
  mode: 'development',
  output: {
    clean: true,
  },
  devServer: {
    static: './dist',
    open: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
};
