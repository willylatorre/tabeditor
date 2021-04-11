<template>
  <div id="app" class="w-full min-h-screen bg-bg dark:bg-bgDark">
    <div class="p-4">
      <tab-editor />
    </div>
    <div
      id="credits"
      class="flex flex-col items-center text-primary dark:text-primaryDark"
    >
      <div class="text-sm">Hint: double click a tab to change its name</div>
      <div class="flex items-center mt-4">
        <img
          src="@/assets/images/tabeditor.svg"
          alt="logo"
          style="height: 40px"
        />
        ·
        <a href="https://github.com/willylatorre/tabeditor"> Github </a>
      </div>
    </div>
  </div>
</template>

<script>
import TabEditor from './components/TabEditor'

export default {
  name: 'app',
  components: {
    TabEditor,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

input:focus,
textarea,
*:focus {
  outline: none !important;
}
</style>
