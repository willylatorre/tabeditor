<script>
import Editor from './Editor'

export default {
  components: {
    Editor
  },
  data() {
    return {}
  },
  computed: {
    tabs() {
      return this.$store.getters.tabs
    }
  },
  watch: {
    tabs() {
      this.focusLastTab()
    }
  },
  mounted() {
    this.focusLastTab()
  },
  methods: {
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
    <vue-tabs class="tabtabs relative">
      <v-tab
        class="h-full border border-grey "
        :title="tab.title"
        v-for="tab in tabs"
        :key="tab.uuid"
      >
        <div slot="title">
          <div class="relative tab-title">
            <span class="mr-3">
              {{ tab.title }}
            </span>

            <img
              @click.stop="removeTab(tab.uuid)"
              class="tab-close absolute top-0 cursor-pointer"
              style="right:-5px"
              width="15"
              src="@/assets/images/icons/close.svg"
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
      <!-- <v-tab title="Add tab" class="h-full border border-grey border-t-0 ">
        <div slot="title">
          <div class="tab-title">
            Add tab
          </div>
        </div>
      </v-tab> -->
      <button
        id="add-tab"
        @click="addTab"
        class="absolute flex items-center"
        style="top: 10px; right:10px;"
      >
        <img
          @click.stop="removeTab(tab.uuid)"
          style="transform:rotate(45deg);"
          class="mr-1"
          width="15"
          src="@/assets/images/icons/close.svg"
          alt="close"
        />
        Add tab
      </button>
    </vue-tabs>
  </div>
</template>

<style lang="scss" >
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
}

.tab-title {
  height: 30px;
  flex: 0 0 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-close {
  float: right;
}
.tab-close:hover {
  transform: rotate(7deg);
}
</style>
