const _import = file => () => import('../../views/admin/' + file + '.vue');

const storeRouter = {
        path: 'store', 
        name: 'store', 
        component: _import('store/Index'),
        redirect: '/store/list',
        meta: {title: '门店管理'},
        children: [
            {path: 'list', name:"store-list", component: _import('store/StoreList'), meta: {title: '门店列表'}},
            {path: 'edit/:id', name:"store-edit", component: _import('store/StoreEdit'), meta: {title: '门店编辑'}},
            {path: 'create', name:"store-create", component: _import('store/StoreCreate'), meta: {title: '门店创建'}},
        ]
};

export default storeRouter;