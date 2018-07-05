import middlewares from './middlewares'
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import randomImages from './modules/randomImages'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    randomImages,
  },
  getters,
  strict: process.env.NODE_ENV !== 'production',
  plugins: middlewares,
});
