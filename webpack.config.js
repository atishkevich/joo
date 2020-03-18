const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isLocal = process.env.NODE_ENV === 'local';

const plugins = [];

if (!isProduction) {
  plugins.push(new HtmlWebpackPlugin({
    chunks: ['client'],
    template: './public/dev.html',
    inject: isLocal,
  }));
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimize: isProduction,
  },
  entry: {
    client: [
      path.resolve(__dirname, './src/client.ts'),
    ],
    banner: [
      path.resolve(__dirname, './src/banner.ts'),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        rules: [
          {
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
        ],
      },
      {
        test: /\.css$/,
        rules: [
          {
            use: [
              'style-loader',
              'css-loader',
            ],
          },
        ],
      },
    ],
  },
  plugins,
  devServer: {
    historyApiFallback: true,
  },
};
