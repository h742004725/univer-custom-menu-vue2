const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
        }
    },
    chainWebpack: config => {
        // 只处理Univer相关的ES模块
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

        // 处理TypeScript文件（不再需要React preset）
        config.module
            .rule('typescript')
            .test(/\.tsx?$/)
            .use('ts-loader')
            .loader('ts-loader')
            .options({
                transpileOnly: true,
                appendTsSuffixTo: ['\\.vue$']
            })
            .end()
    }
})