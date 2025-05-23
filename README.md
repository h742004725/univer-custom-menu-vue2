# univer-custom-menu-vue2
univer使用vue2和js引入react和ts来实现扩展右键

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 在Vue2项目中集成React组件

本文档记录了在Vue2项目中集成React组件（特别是Univer库）时遇到的问题及其解决方案。

### 问题描述

在Vue2项目中引入了使用TypeScript编写的组件，这些组件最初是以React JSX/TSX语法编写的。在集成过程中遇到了以下错误：

1. **h函数未定义错误**：
```
ButtonIcon.tsx:4 Uncaught ReferenceError: h is not defined
    at ButtonIcon (ButtonIcon.tsx:4:1)
```

2. **React与Vue混用错误**：
```
react-dom.development.js:4614 Uncaught TypeError: Cannot read properties of undefined (reading '_init')
    at VueComponent (vue.runtime.esm.js:5573:12)
```

### 原因分析

这些错误的核心原因是：

1. Univer库在内部使用了React组件，而项目本身是Vue2架构。
2. 在尝试将React组件转换为Vue组件时，使用了不兼容的组件定义方式。
3. 构建配置未正确设置，无法同时处理Vue和React组件。

### 解决方案

#### 1. 正确使用React组件格式

不要尝试将React组件转换为Vue组件，而是在Vue2项目中保持React组件的原始格式：

**错误的方式**（尝试转换为Vue风格）:
```typescript
// 错误方式1：直接使用h函数
export function ButtonIcon(h: CreateElement) {
    return h('svg', {...}, [...]);
}

// 错误方式2：使用Vue.extend
export const ButtonIcon = Vue.extend({
  functional: true,
  render(h) {
    return h('svg', {...}, [...]);
  }
});
```

**正确的方式**（保持React组件格式）:
```typescript
import React from 'react';

export const ButtonIcon = React.memo(() => {
    return React.createElement('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24"
    }, 
    React.createElement('path', {
        fill: "currentColor",
        d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m.16 14a6.981 6.981 0 0 0-5.147 2.256A7.966 7.966 0 0 0 12 20a7.97 7.97 0 0 0 5.167-1.892A6.979 6.979 0 0 0 12.16 16M12 4a8 8 0 0 0-6.384 12.821A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634A8 8 0 0 0 12 4m0 1a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4"
    }));
});
```

#### 2. 安装必要的依赖

确保项目中安装了React相关的依赖：

```bash
# 添加React核心依赖
npm install --save react react-dom

# 添加React相关Babel预设
npm install --save-dev @babel/preset-react @babel/preset-typescript
```

#### 3. 更新构建配置

修改`vue.config.js`文件，添加对React和TypeScript的支持：

```javascript
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, 
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
    },
    plugins: []
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
```

### 文件扩展名考虑

虽然可以使用`.tsx`扩展名，但在某些环境中可能会导致混淆。在某些情况下，将React组件保存为`.ts`文件但使用React API可能会更安全。

### 最终架构

在最终架构中：
- Vue2作为主框架用于整体应用
- React组件被嵌入到Vue2应用中
- Univer库通过React API读取和渲染这些组件
- Babel负责转译所有内容以确保正确运行

### 注意事项

1. 在Vue2项目中使用React组件是一种特殊情况，通常应该避免混用框架。
2. 这种方案主要适用于集成第三方库（如Univer）时，该库内部使用了React组件。
3. 确保组件注册时使用的格式与组件定义一致。

### 总结

在Vue2项目中集成React组件需要：
1. 保持React组件的原始格式，使用`React.createElement`或JSX
2. 安装React相关依赖
3. 正确配置构建工具以支持React和TypeScript
4. 理解并接受两个框架共存的复杂性

正确配置后，Vue2和React可以在同一项目中和平共存，允许使用Univer等复杂库，即使它们在内部使用了不同的框架。
