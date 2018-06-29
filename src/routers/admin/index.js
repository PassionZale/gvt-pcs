import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../../components/layouts/admin/Index.vue'
import errorPage from '../../views/404.vue'

Vue.use(VueRouter);

const _import = file => () => import('../../views/admin/' + file + '.vue');

export const RouterMap = [
    { 
        path: '/', 
        component: Layout,
        redirect: '/home',
        children: [
            { path: 'home', name: 'home', component: _import('Home'), meta: {title: '首页'}},
            { path: 'store', name: 'store', component: _import('Store'), meta: {title: '门店管理'} },
            { path: 'warehouse', name: 'warehouse', component: _import('Warehouse'), meta: {title: '仓库管理'} },
            { path: 'purchase', name: 'purchase', component: _import('Purchase'), meta: {title: '采购管理'} },
            { path: 'order', name: 'order', component: _import('Order'), meta: {title:'订单管理'}},
            { path: 'system-param', name: 'system-param', component: _import('SystemParam'), meta: {title:'系统参数'}},
            { path: 'system-notify', name: 'system-notify', component: _import('SystemNotify'), meta: {title:'系统通知'}},
            { path: 'system-address', name: 'system-address', component: _import('SystemAddress'), meta: {title:'送货地址'}},
            { path: 'system-log', name: 'system-log', component: _import('SystemLog'), meta: {title:'系统日志'}},

        ] 
    },
    { path: '*', name: '404', component: errorPage },
];

export default new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: RouterMap,
});