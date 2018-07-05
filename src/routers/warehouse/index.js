
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../../components/layouts/warehouse/Index.vue'
import storeRouter from './storeRouter'
import goodsRouter from './goodsRouter'
import orderRouter from './orderRouter'
import systemRouter from './systemRouter'
import errorPage from '../../views/404.vue'

Vue.use(VueRouter)

const _import = file => () => import('../../views/warehouse/' + file + '.vue');

export const RouterMap = [
    {
        path: '/',
        components: Layout,
        redirect: '/home',
        children: [
            { path: 'home', name: 'home', components: _import('Home'), meta: {title: '控制台'}},
            storeRouter,
            goodsRouter,
            systemRouter,
            orderRouter,
            { path: 'exwarehouse', name: 'exwarehouse', components: _import('Exwarehouse'), meta: {title: '出库管理'}},
            
        ]
    },
    { path: '*', name: '404', component: errorPage },
];

export default new VueRouter({
    mode: 'hash',
    scrollBehavior: () =>({ y: 0 }),
    routes: RouterMap,
});
