import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import requestPlugin from '@/plugins/request.js'

Vue.config.productionTip = false

const plugin = {
  install () {
    Vue.prototype.$request = requestPlugin
  }
}
Vue.use(plugin)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
