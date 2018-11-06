const path = require('path');

module.exports = {
  entry: {
    app: './src/index.ts',
    worker: './src/worker/index.ts'
  },
  devtool: 'inline-source-map',
  mode: "none",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    } 
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};