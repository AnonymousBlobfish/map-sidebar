module.exports = {
  entry: "./client/src/index.jsx",
  output: {
    filename: "../client/dist/bundle.js"
  },
  mode: 'production',
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: ['style-loader', 'css-loader']}
    ]
  }
}
