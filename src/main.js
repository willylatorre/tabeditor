import Vue from 'vue'
import App from './App.vue'
import VueTabs from 'vue-nav-tabs'
import store from './store'

import 'modern-normalize/modern-normalize.css'
import './assets/sass/main.scss'
import './assets/css/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueTabs)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
