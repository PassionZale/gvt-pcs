const _import = file => () =>
  import ('../../views/admin/' + file + '.vue');

const warehouseRouter = {
  path: 'warehouse',
  name: 'warehouse',
  component: _import('warehouse/Index'),
  redirect: '/warehouse/list',
  meta: {
    title: '仓库管理'
  },
  children: [{
      path: 'list',
      name: "warehouse-list",
      component: _import('warehouse/WarehouseList'),
      meta: {
        title: '仓库列表'
      }
    },
    {
      path: 'edit/:id',
      name: "warehouse-edit",
      component: _import('warehouse/WarehouseEdit'),
      meta: {
        title: '仓库编辑'
      }
    },
    {
      path: 'create',
      name: "warehouse-create",
      component: _import('warehouse/WarehouseCreate'),
      meta: {
        title: '仓库创建'
      }
    },
    {
      path: 'pros/:warehouseName',
      name: "warehouse-pros",
      component: _import('warehouse/WarehousePros'),
      meta: {
        title: '仓库商品'
      }
    },
  ]
};

export default warehouseRouter;
