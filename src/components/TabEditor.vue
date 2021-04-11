<script>
import Editor from './Editor'

export default {
  components: {
    Editor
  },
  data() {
    return {
      isDark: false,
    }
  },
  computed: {
    tabs() {
      return this.$store.getters.tabs
    },
    closeIcon() {
      const icon = this.isDark ? 'close-dark' : 'close';
      return require(`@/assets/images/icons/${icon}.svg`)
    }
  },
  watch: {
    tabs() {
      this.focusLastTab()
    }
  },
  created() {
    this.isDark = window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  },
  mounted() {
    this.focusLastTab()
  },
  methods: {
    editTabNameMode(uuid, isEdit) {
      this.$store.dispatch('editTabNameMode', { uuid, isEdit })
    },
    editTabName(uuid, $e) {
      const name = $e.target.value
      setTimeout(() => {
        this.$store.dispatch('editTabName', { uuid, name })
        this.editTabNameMode(uuid, false)
      }, 20000)
    },
    removeTab(uuid) {
      this.$store.dispatch('removeTab', uuid)
    },
    updateContent(uuid, content) {
      this.$store.dispatch('saveContent', { uuid, content })
    },
    // Hacky 'activate Tab method as it's not supported
    focusLastTab() {
      this.$nextTick(() => {
        let lastTab = this.tabs[this.tabs.length - 1]

        let tabId = `t-${lastTab.title}`
        let tabEl = document.getElementById(tabId)
        tabEl.click()
        tabEl.scrollIntoView()
      })
    },
    addTab() {
      this.$store.dispatch('createTab')
    }
  }
}
</script>

<template>
  <div>
    <vue-tabs
      class="tabtabs relative"
      active-tab-color="#f2a365" 
      active-text-color="#ececec"
    >
      <button
        id="add-tab"
        @click="addTab"
        class="absolute flex items-center tab-title top-0 right-0"
        style="max-width:120px;"
      >
        <img
          @click.stop="removeTab(tab.uuid)"
          style="transform:rotate(45deg);"
          class="mr-1"
          width="15"
          :src="closeIcon"
          alt="close"
        />
        Add tab
      </button>
      <v-tab
        class="h-full border border-border dark:border-borderDark"
        :title="tab.title"
        v-for="tab in tabs"
        :key="tab.uuid"
      >
        <div slot="title">
          <div class="relative tab-title bg-bg text-primary dark:bg-bgDark dark:text-primaryDark" @dblclick="editTabNameMode(tab.uuid, true)">
            <input class="mr-3 tab-input" :readonly="!tab.editTitle" :value="tab.title" @input="($e) => editTabName(tab.uuid, $e)"  />

            <img
              @click.stop="removeTab(tab.uuid)"
              class="tab-close absolute cursor-pointer"
              width="15"
              :src="closeIcon"
              alt="close"
            />
          </div>
        </div>
        <editor
          class="h-full py-4"
          :tab="tab"
          @content-update="newContent => updateContent(tab.uuid, newContent)"
        />
      </v-tab>
    </vue-tabs>
  </div>
</template>

<style lang="scss">
.tabtab.nav-tabs {
  .nav-tabs-navigation {
    margin-bottom: 0;
  }
}

.tabtabs.vue-tabs .nav-tabs {
  overflow: auto;
  width: calc(100% - 200px);
  /* padding-right: 200px; */
  display: flex;
  border-bottom: 0;

  a {
    background-color: theme('colors.bg')!important;
  }
}

.tab.active .tab-title {
  background-color: theme('colors.highlight');
  opacity: 0.8;

  @media (prefers-color-scheme: dark) {
    background-color: theme('colors.highlight');
    color: theme('colors.bgDark')
  }
}

.tab-title {
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid theme('colors.border');
  border-bottom: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  @media (prefers-color-scheme: dark) {
    border: 1px solid theme('colors.borderDark');
  }
}


.tab-input {
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}

.tab-close {
  top: 5px;
  right: 5px;
}
.tab-close:hover {
  transform: rotate(7deg);
}
</style>
