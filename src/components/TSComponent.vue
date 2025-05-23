<template>
  <div class="ts-component">
    <h2>{{ title }}</h2>
    <div>{{ message }}</div>
    <button @click="handleClick">点击我</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class TSComponent extends Vue {
  @Prop({ default: '这是TypeScript组件' }) 
  readonly title!: string;
  
  // 数据属性
  message: string = '通过TypeScript在Vue2中定义的组件';
  clickCount: number = 0;
  
  // 方法
  handleClick(): void {
    this.clickCount += 1;
    this.message = `你点击了 ${this.clickCount} 次`;
  }
  
  // 生命周期钩子
  mounted(): void {
    console.log('TypeScript组件已加载');
  }
}
</script>

<style scoped>
.ts-component {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
  background-color: #f9f9f9;
}
</style> 