<template>
  <div id="app">
    <UniverSheet/>
    <TSComponent title="我的TS组件示例"/>
  </div>
</template>

<script>
import UniverSheet from "@/components/UniverSheet.vue";
import TSComponent from "@/components/TSComponent.vue";

export default {
  name: 'App',
  components: {
    UniverSheet,
    TSComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
