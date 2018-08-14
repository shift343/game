var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
    mode: "development",
    entry: './assets/index.js',
    output: {
        path: path.join(__dirname, './public/javascripts/'),
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
          loader: "file-loader?name=images/[name].[ext]"
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css-loader?-url&minimize&sourceMap!sass-loader'),
        },
      ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}];