const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/app/index.js',
    post: './src/js/post/index.js',
  },
  output: {
    path: path.join(__dirname, 'assets/built'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtraWatchWebpackPlugin({
      files: [
        '/author.hbs',
        '/error-404.hbs',
        '/home.hbs',
        '/index.hbs',
        '/assets/hbs/default-template.hbs',
      ],
      dirs: [path.join(__dirname, '/partials')],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};
