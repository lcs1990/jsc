<template>
  <div id="app">
    <router-view style="height: 100%;overflow: hidden;width: 100%;"/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
html, body ,#app {
  height: 100%;
  width: 100%;
  /*overflow: scroll;*/
  background: #ebebeb;
}
</style>
