const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
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
    }
})