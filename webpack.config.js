const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    inject: "./src/inject/inject.ts",
    inject_chatterbox: './src/inject/inject_chatterbox.ts',
    background: "./src/background/background.ts",
    popup: "./src/popup/popup.ts",
  },
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/popup/popup.html", to: "popup.html" },
      ],
    }),
  ]
};