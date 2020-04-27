import Vue from 'vue'
import Vuex from 'vuex'
import createMutationsSharer from 'vuex-shared-mutations'
import createPersistedState from 'vuex-persistedstate'
import uuid from 'uuid'
import dayjs from 'dayjs'
import { version } from '../../package.json'

Vue.use(Vuex)

const STORAGE_KEY = `tabeditor-${version}`

const defaultStore = {
  example: {
    uuid: 'example',
    title: 'Example Tab',
    content: `<h2>
                Hi there,
              </h2>
              <p>
                this is a very <em>basic</em> example of tiptap.
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
  // Waiting for PR https://github.com/robinvdvleuten/vuex-persistedstate/pull/160
  state: {
    tabs: localStorage.getItem(STORAGE_KEY, false) ? {} : defaultStore
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
    }
  },
  actions: {
    saveContent({ commit }, { uuid, content }) {
      commit('SAVE_CONTENT', { uuid, content })
    },
    createTab({ commit }) {
      let tab = {
        uuid: uuid.v4(),
        title: dayjs().format('DD-MM HH:mm'),
        content: ``
      }
      commit('CREATE_TAB', tab)
      return tab
    },
    removeTab({ commit }, uuid) {
      commit('REMOVE_TAB', uuid)
    }
  },
  getters: {
    tabs: state => Object.values(state.tabs),
    tab: (state, uuid) => state.tabs[uuid]
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: STORAGE_KEY
    }),
    createMutationsSharer({
      predicate: ['SAVE_CONTENT', 'CREATE_TAB', 'REMOVE_TAB']
    })
  ]
})
