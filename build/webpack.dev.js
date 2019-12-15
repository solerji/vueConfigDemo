const webpack = require('webpack')
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: '../dist',
    open: true,
    port: '8081',
    // 热重启（对css支持较好,js可以另外配置）
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
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = devConfig
