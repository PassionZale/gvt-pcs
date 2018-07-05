const _import = file => () =>
  import ('../../views/admin/' + file + '.vue');

const purchaseRouter = {
  path: 'purchase',
  name: 'purchase',
  component: _import('purchase/Index'),
  redirect: '/purchase/list',
  meta: {
    title: '采购管理'
  },
  children: [{
    path: 'list',
    name: "purchase-list",
    component: _import('purchase/PurchaseList'),
    meta: {
      title: '采购列表'
    }
  }, {
    path: 'detail/:procureNo',
    name: "purchase-detail",
    component: _import('purchase/PurchaseDetail'),
    meta: {
      title: '采购详情'
    }
  }, ]
};

export default purchaseRouter;
