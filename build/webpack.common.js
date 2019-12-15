const path = require('path')
const HtmlWebpackPlugins = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const commonConfig = {
  entry: './src/index.js',
  // entry: {
  //   index: './index.js',
  //   lodash: './loadash.js'
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // filename: 'index.js'
    filename: '[name].js'
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.css', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    // 除js格式文件的规则
    rules: [
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 15500
          }
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
      {
        test: /\.(ttf|woff2|woff|eot|svg)$/,
        use: 'url-loader'
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
    new VueLoaderPlugin()
  ]
}

//设置环境变量
module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  }
  if (env && env.development) {
    return merge(commonConfig, devConfig)
  }
}
