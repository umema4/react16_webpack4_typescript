const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');

const isDebug = process.env.NODE_ENV !== 'production';
console.log(`debug is ${isDebug}`);

module.exports = {
  entry: './src/index.tsx',
  mode: isDebug ? 'development' : 'production',
  devtool: isDebug ? 'source-map' : false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDebug
                  ? '[path][name]__[local]'
                  : '[hash:base64:8]',
              },
              sourceMap: isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                cssnano({
                  zindex: false,
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
