var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
    mode: "development",
    context: path.join(__dirname, 'public/sass'),
    entry: {
        style: './app.scss'
    },
    output: {
        path: path.join(__dirname, 'public/stylesheets'),
        filename: '[name].css'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader?-url&minimize&sourceMap!sass-loader')
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}];