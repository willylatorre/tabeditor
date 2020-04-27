<template>
  <div id="app" class="w-full min-h-screen">
    <div class="p-4">
      <tab-editor />
    </div>
    <div id="credits" class="flex justify-center items-center">
      <img src="@/assets/images/tabeditor.svg" alt="logo" style="height:40px" />
      ·
      <a href="https://github.com/willylatorre"> Github </a>
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
