import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../../components/layouts/admin/Index.vue'
import storeRouter from './storeRouter'
import systemRouter from './systemRouter'
import purchaseRouter from './purchaseRouter'
import orderRouter from './orderRouter'
import warehouseRouter from './warehouseRouter'
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
