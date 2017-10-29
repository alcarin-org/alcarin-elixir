const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: './app.jsx',
  output: {
    filename: 'app.js',
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
    new HtmlWebpackPlugin({template: './index.html'}),
  ]
};
