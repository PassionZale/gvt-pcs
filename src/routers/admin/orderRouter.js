const _import = file => () =>
  import ('../../views/admin/' + file + '.vue');

const orderRouter = {
  path: 'order',
  name: 'order',
  component: _import('order/Index'),
  redirect: '/order/list',
  meta: {
    title: '订单管理'
  },
  children: [{
    path: 'list',
    name: "order-list",
    component: _import('order/OrderList'),
    meta: {
      title: '订单列表'
    }
  }, {
    path: 'detail',
    name: "order-detail",
    component: _import('order/OrderDetail'),
    meta: {
      title: '订单详情'
    }
  }, ]
};

export default orderRouter;
