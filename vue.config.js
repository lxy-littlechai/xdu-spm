module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mock.apifox.cn/m1/2570916-0-default',
        // 是否允许跨域
        changeOrigin: true,
        secure: true, // 如果是https接口，需要配置这个参数
        //ws: true, //如果要代理 websockets，配置这个参数
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}