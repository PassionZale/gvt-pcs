import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../../components/layouts/admin/Index.vue'
import storeRouter from './storeRouter'
import systemRouter from './systemRouter'
import purchaseRouter from './purchaseRouter'
import orderRouter from './orderRouter'
import warehouseRouter from './warehouseRouter'

import authLogin from '../../views/auth/LogIn'
import authLogout from '../../views/auth/LogOut'
import errorPage from '../../views/404.vue'

Vue.use(VueRouter);

const _import = file => () =>
  import ('../../views/admin/' + file + '.vue');

export const RouterMap = [{
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
        path: 'home',
        name: 'home',
        component: _import('Home'),
        meta: {
          title: '控制台'
        }
      },
      storeRouter,
      systemRouter,
      purchaseRouter,
      orderRouter,
      warehouseRouter,
    ]
  },
  {
    path: '/login',
    name: 'auth-login',
    component: authLogin,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/logout',
    name: 'auth-logout',
    component: authLogout,
    meta: {
      title: '注销'
    }
  },
  {
    path: '*',
    name: '404',
    component: errorPage
  },
];

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: RouterMap,
});
