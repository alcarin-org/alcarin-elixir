const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: './app.jsx',
  output: {
    filename: 'app.[chunkhash].js',
    path: __dirname + '/build',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/, loader: 'style!css'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              ['transform-jsx', { 'module': __dirname + '/app/framework/jsx', 'useVariables': true }]
            ],
          },
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),

    new HtmlWebpackPlugin({template: './index.html'}),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash].js',
        minChunks(module, count) {
            var context = module.context;
            return context && context.indexOf('node_modules') >= 0;
        },
    }),
  ]
};
