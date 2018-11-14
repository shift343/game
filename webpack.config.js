var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    SpritesmithPlugin = require('webpack-spritesmith');

module.exports = [{
    mode: "development",
    entry: './assets/index.js',
    output: {
        path: path.join(__dirname, './public/javascripts/'),
        filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
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
    resolve: {
      extensions: ['.js', '.vue'],
      modules: [
          "node_modules"
      ],
      alias: {
          // vue.js のビルドを指定する
          vue: 'vue/dist/vue.common.js'
      }
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: '../stylesheets/main.css'
        }),
        new SpritesmithPlugin({
            src: {
                cwd: './public/images/pieces/',
                glob: '*.png'
            },
            target: {
                image: './public/images/sprite/sprite.png',
                css: './assets/sass/common/sprite.scss'
            },
            apiOptions: {
                cssImageRef: "/images/sprite/sprite.png"
            }
        })
    ]
}];