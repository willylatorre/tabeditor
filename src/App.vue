<template>
  <div id="app" style="height:100vh;width:100vw;">
    <div class="p-4">
      <tab-editor />
    </div>
  </div>
</template>

<script>
import TabEditor from './components/TabEditor'

export default {
  name: 'app',
  components: {
    TabEditor
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input:focus,
textarea,
*:focus {
  outline: none !important;
}


</style>
