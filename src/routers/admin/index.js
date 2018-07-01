import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../../components/layouts/admin/Index.vue'
import storeRouter from './storeRouter'
import systemRouter from './systemRouter'
import errorPage from '../../views/404.vue'

Vue.use(VueRouter);

const _import = file => () => import('../../views/admin/' + file + '.vue');

export const RouterMap = [
    { 
        path: '/', 
        component: Layout,
        redirect: '/home',
        children: [
            { path: 'home', name: 'home', component: _import('Home'), meta: {title: '控制台'}},
            storeRouter,
            systemRouter,
            { path: 'warehouse', name: 'warehouse', component: _import('Warehouse'), meta: {title: '仓库管理'} },
            { path: 'purchase', name: 'purchase', component: _import('Purchase'), meta: {title: '采购管理'} },
            { path: 'order', name: 'order', component: _import('Order'), meta: {title:'订单管理'}},
        ] 
    },
    { path: '*', name: '404', component: errorPage },
];

export default new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: RouterMap,
});