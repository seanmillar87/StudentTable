<template>
  <div id="app">
    <CarbonVue />
  </div>
</template>

<script>
import CarbonVue from './components/CarbonVue.vue'

export default {
  name: 'App',
  components: {
    CarbonVue
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
