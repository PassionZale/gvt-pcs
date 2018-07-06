import Vue from 'vue'
import router from '../../routers/admin'
import store from '../../vuex/store'
import App from './App.vue'
import iView from 'iview'
import * as filters from '../../filters/'

Vue.use(iView);

// 注入全部过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  // TODO 用户信息拉取 & 登录拦截器
  next();
});

router.afterEach(router => {
  let title = '采购系统';
  if (router.meta.title) {
    title += `-${router.meta.title}`;
  }
  document.title = title;
  iView.LoadingBar.finish();
});

// Let's Rock :P
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
