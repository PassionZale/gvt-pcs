import Vue from 'vue'
import router from '../../routers/admin'
import App from './App.vue'
import * as filters from '../../filters/'

// 注入全部过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


// Let's Rock :P
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
