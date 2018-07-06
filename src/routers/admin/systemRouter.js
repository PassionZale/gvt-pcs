const _import = file => () =>
  import ('../../views/admin/' + file + '.vue');

const systemRouter = {
  path: 'system',
  name: 'system',
  component: _import('system/Index'),
  meta: {
    title: '系统管理'
  },
  children: [{
      path: 'report',
      name: 'system-report',
      redirect: '/system/report/list',
      component: _import('system/SystemReportIndex'),
      meta: {
        title: '接口报表'
      },
      children: [{
        path: 'list',
        name: 'system-report-list',
        component: _import('system/SystemReportList'),
        meta: {
          title: '接口报表列表'
        }
      }, {
        path: 'detail/:id',
        name: 'system-report-detail',
        component: _import('system/SystemReportDetail'),
        meta: {
          title: '接口报表详情'
        }
      }]
    },
    {
      path: 'param',
      name: 'system-param',
      component: _import('system/SystemParam'),
      meta: {
        title: '系统参数'
      }
    },
    {
      path: 'notify/',
      name: 'system-notify',
      component: _import('system/SystemNotify'),
      meta: {
        title: '系统通知'
      }
    },
    {
      path: 'address',
      name: 'system-address',
      component: _import('system/SystemAddress'),
      meta: {
        title: '送货地址'
      }
    },
    {
      path: 'log',
      name: 'system-log',
      component: _import('system/SystemLog'),
      meta: {
        title: '系统日志'
      }
    },
  ]
};

export default systemRouter;
