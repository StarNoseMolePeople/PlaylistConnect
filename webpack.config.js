const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.NODE_ENV === 'development';

module.exports = {
  entry: './client/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './client'),
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  stats: {
    children: true, // Enable detailed stats for child compilations
  },
};
// rules: [{ test: /\.jsx?/, exclue: /(node_modules)/ }],
// user: {
//   loader: 'babel-loader',
//   options: {
//     presets: ['@babel/preset-env', '@babel/reset-react'],
//   },
// },
