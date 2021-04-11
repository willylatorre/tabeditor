import Vue from 'vue'
import Vuex from 'vuex'
import createMutationsSharer from 'vuex-shared-mutations'
import createPersistedState from 'vuex-persistedstate'
import { v4 } from 'uuid';
import dayjs from 'dayjs'
import { version } from '../../package.json'

Vue.use(Vuex)

const STORAGE_KEY = `tabeditor-${version}`

const defaultStore = {
  example: {
    uuid: 'example',
    title: 'Example Tab',
    editTitle: false,
    content: `<h2>
                Hi there,
              </h2>
              <p>
                this is a very <em>basic</em> example of content.
              </p>
              <pre><code>body { display: none; }</code></pre>
              <ul>
                <li>
                  A regular list
                </li>
                <li>
                  With regular items
                </li>
              </ul>
              <blockquote>
                It's amazing 👏
                <br />
                – mom
              </blockquote>`
  }
}

export default new Vuex.Store({
  state: {
    tabs: defaultStore
  },
  mutations: {
    SAVE_CONTENT(state, { uuid, content }) {
      state.tabs[uuid].content = content
    },
    CREATE_TAB(state, tab) {
      Vue.set(state.tabs, tab.uuid, tab)
    },
    REMOVE_TAB(state, uuid) {
      Vue.delete(state.tabs, uuid)
    },
    EDIT_TAB_TITLE_MODE(state, {uuid, isEdit}) {
      Vue.set(state.tabs[uuid], 'editTitle', isEdit)
    },
    EDIT_TAB_TITLE(state, {uuid, name}) {
      Vue.set(state.tabs[uuid], 'title', name)
    },
  },
  actions: {
    saveContent({ commit }, { uuid, content }) {
      commit('SAVE_CONTENT', { uuid, content })
    },
    createTab({ commit }) {
      let tab = {
        uuid: v4(),
        title: dayjs().format('DD-MM HH:mm'),
        content: ``,
        editTitle: false
      }
      commit('CREATE_TAB', tab)
      return tab
    },
    removeTab({ commit }, uuid) {
      commit('REMOVE_TAB', uuid)
    },
    editTabNameMode({ commit }, {uuid, isEdit}) {
      commit('EDIT_TAB_TITLE_MODE', {uuid, isEdit})
    },
    editTabName({ commit }, {uuid, name}) {
      commit('EDIT_TAB_TITLE', {uuid, name})
    }
  },
  getters: {
    tabs: state => Object.values(state.tabs),
    tab: (state, uuid) => state.tabs[uuid]
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: STORAGE_KEY,
      overwrite: true
    }),
    createMutationsSharer({
      predicate: ['SAVE_CONTENT', 'CREATE_TAB', 'REMOVE_TAB']
    })
  ]
})
