const { DefinePlugin } = require('webpack');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FavIconWebPackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/main/index.tsx',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    axios: 'axios',
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(
        'https://fordevs.herokuapp.com/api'
      ),
    }),
    new HtmlWebPackPlugin({
      template: './template.prod.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[contenthash].css',
    }),
    new FavIconWebPackPlugin({
      logo: './public/favicon.png',
    }),
  ],
});
