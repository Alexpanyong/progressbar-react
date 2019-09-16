const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ip = require('ip');
const config = require('./config');

const ipAddress = ip.address();
const isProduction = process.env.NODE_ENV === 'production';
const plugins = [
  new HtmlWebpackPlugin({
    template: './' + config.portal + '/app/index.html',
    favicon: './shared/assets/images/icon.png',
  }),
];
if (isProduction) plugins.push(new MiniCssExtractPlugin());

module.exports = {
  devtool: false,
  entry: './' + config.portal + '/index.js',
  devServer: {
    historyApiFallback: true,
    open: true,
    host: ipAddress,
    clientLogLevel: 'silent',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              failOnWarning: false,
              failOnError: false,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        exclude: /node_modules/,
        loader: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
              includePath: [],
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: [/\.module\.s(a|c)ss$/, /node_modules/],
        loader: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
              includePath: ['shared/assets/css/base'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images',
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      base: path.join(__dirname, 'shared/assets/css/base'),
    },
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000,
      cacheGroups: {
        default: false,
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  stats: 'minimal',
};
