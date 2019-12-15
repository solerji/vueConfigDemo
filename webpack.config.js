const path = require('path')
const HtmlWebpackPlugins = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.css', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devtool: 'cheap-module-source-map',
  module: {
    // 除js格式文件的规则
    rules: [
      {
        test: /\.(png|jpe?g)$/,
        use: {
          loader: 'url-loader'
          // name: '[name]_[hash].[ext]'
          // outputPath: 'images/',
          // limit: 15500
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      // es6语法支持
      {
        test: /\.js$/,
        // use: ['babel-loader'],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // 使用vue框架
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugins({
      template: './index.html',
      title: 'vue'
    }),
    // 打包之前把生成目录删除
    new CleanWebpackPlugin(),
    // 打包后放进css文件中
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // })
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: './dist',
    open: true,
    port: '8081',
    // 热重启（对css支持较好）
    hot: true,
    hotOnly: true
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9092'
    //   }
    // }
  },
  // 减少打包时的无用代码
  optimization: {
    usedExports: true
  }
}
