const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 完全禁用 ESLint
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
    },
    plugins: [

    ]
  },
  chainWebpack: config => {
    // 处理Univer相关的ES模块
    config.module
        .rule('univerjs')
        .test(/\.m?js$/)
        .include
        .add(/node_modules\/@univerjs/)
        .end()
        .use('babel-loader')
        .loader('babel-loader')
        .options({
          presets: ['@babel/preset-env']
        })
        
    // 添加React和TypeScript处理
    config.module
        .rule('typescript')
        .test(/\.tsx?$/)
        .use('babel-loader')
        .loader('babel-loader')
        .options({
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        })
        .end()
  }
})