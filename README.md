# gvt-pcs
purchase system for GVT

./node_modules/iview/src/components/page/page.vue 261 Line

``` javascript
// 太BUG了... 我特么...哎
onSize (pageSize) {
    this.currentPageSize = pageSize;
    this.$emit('on-page-size-change', pageSize);
    this.changePage(1);
},
```

## FEATURES
1. views/admin/store/StoreCreate.vue 创建门店的交互待完成
2. views/admin/system/SystemNotify.vue 促销商品推送申请, 点击详情按钮后的"同意"、"拒绝"等操作交互待完成
3. views/admin/system/SystemNotify.vue 仓库绑定门店申请, "同意"、"拒绝"等操作交互待完成


## TODOS
1. 编写 mixins 全局注入, 监听 window.resize
2. 在 window.resize 中动态计算 Table 的高度及宽度
3. 后面考虑优化表格中是否固定某一列或几列

## TIPS
1. 在组件中调用路由方法时,使用 this.$router, 例如: this.$router.push({path: '/'})
2. 在组件中获取路由的 query 或 params 时, 使用 this.$route, 例如: this.$route.params.tab || this.$route.query.tab

### 1. baseParams
baseParams 是搜索的公共条件, page:默认当前页页码, rows:默认每页显示条数, sortOrder:默认排序方式 

```json
{
  "page": 1,
  "rows": 10,
  "sortOrder": "desc"
}
```

### 2. API
在 ./src/api/* 对应目录中编写 API 请求. API 是当前视图所需要的接口请求, 返回一个 Promise. 例如:

```javascript
export function selectAdminListOfOrders(data = baseParams) {
  let api = '/store/managerStore';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  });
}
```

### 3. VALIDATION
在 ./src/validations/ 中编写表单验证规则 **若视图中包含表单**, 例如:

```javascript
export const SEARCH_SYSTEM_ADDRESS_FORM_VALIDATION = {
  'storeName': [default_max_rule],
  'wareName': [default_max_rule],
  'outboundNo': [default_max_rule]
}
```

### 4. import 1 2 3

```javascript
import { baseParams } from "../../../utils/base";
import { selectAdminListOfOrders } from "../../../api/admin/system";
import { SEARCH_SYSTEM_ADDRESS_FORM_VALIDATION } from "../../../validations/admin";
```

### 5. FORM.DATA & FORM.RULES
定义表单的 **模型** & **验证规则**

``` javascript
export default {
  data() {
    return {
      form: {
        data: {
            storeName:'',
            wareName:'',
            outboundNo:''
        },
        rules: SEARCH_SYSTEM_ADDRESS_FORM_VALIDATION
      }
    };
  }
};
```

### 6. TABLE.LOADING & TABLE.DATA & TABLE.COLUMNS
定义数据表格的 **加载状态** & **数据模型** & **列模型**

```javascript
export default {
  data() {
    return {
      table: {
          loading: false,
          data: [],
          columns: [
            {title: '', key: ''},
            // ... other column object
          ]
      }
    };
  }
};
```

### 7. PAGINATION
定义分页模型

```javascript
export default {
  data() {
    return {
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOpts: [10, 25, 50, 100]
      }
    };
  }
};
```

### 8. METHODS
编写 **逻辑** || **业务** || **其他** 等函数

```javascript
export default {
  methods: {
    loadData(){
      // 打开 data table loading 状态
      this.table.loading = true;
      // 封装请求参数的数据结构
      let page = this.pagination.current;
      let rows = this.pagination.pageSize;
      let options = Object.assign({}, baseParams, { page, rows });
      let params = Object.assign({}, options, this.form.data);
      // 调用 API 加载数据
       selectAdminListOfOrders(params)
       .then(response => {
         // 初始化 table & pagination MODEL
          this.pagination.total = response.total;
          this.table.data = response.rows;
          this.$nextTick(function() {
            // DOM 更新后, 关闭 data table loading 状态
            this.table.loading = false;
          });
       })
       .catch(error => {
          // 捕捉 Promise error
          // 关闭 data table loading 状态
          this.table.loading = false;
       })
    },
    handlePageChange(page){
      // 当前页改变时, 触发此函数, 重新加载数据
      this.loadData();
    },
    handlePageSizeChange(){
      // 每页条数改变时, 触发此函数, 将当前页置为 1, 并重新加载数据
      this.pagination.current = 1;
      this.loadData();
    },
    handleSubmit(name){
      // 提交表单时, 触发此函数, 数据校验后, 将当前页置为 1, 并重新加载数据
      this.$refs[name].validate(valid => {
        if (valid) {
          this.pagination.current = 1;
          this.loadData();
        }
      });
    },
    handleReset(name){
      // 表单重置, 某些组件如: datapicker, select 等需要额外编写 reset 逻辑
      this.$refs[name].resetFields();
    },
  }
}
```

### 9. TEMPLATE
编写视图模板

```html
<template>
    <div>
        
        <!-- START 搜索表单 -->
        <Form ref="searchForm" :model="form.data" :rules="form.rules" inline>
            <FormItem prop="storeName">
                <Input type="text" v-model="form.data.storeName" placeholder="请输入门店名称"></Input>
            </FormItem>
            <FormItem prop="wareName">
                <Input type="text" v-model="form.data.wareName" placeholder="请输入门店编号"></Input>
            </FormItem>
            <FormItem prop="outboundNo">
                <Input type="text" v-model="form.data.outboundNo" placeholder="请输入门店编号"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('searchForm')">搜索</Button>
                <Button type="ghost" @click="handleReset('searchForm')" style="margin: 0 8px;">重置</Button>
            </FormItem>
        </Form>
        <!-- /END 搜索表单 -->

        <!-- START DATA TABLE -->
        <Table style="margin-bottom:24px;" stripe :loading="table.loading" :columns="table.columns" :data="table.data"></Table>
        <!-- /END DATA TABLE -->

        <!-- START PAGESIZE-->
        <Select v-model="pagination.pageSize" style="width:80px; display: inline-block;" @on-change="handlePageSizeChange">
            <Option v-for="item in pagination.pageSizeOpts" :value="item" :key="item">{{ `${item} 条/页` }}</Option>
        </Select>
        <!-- /END PAGESIZE -->

        <hr>

        <!-- START PAGINATION -->
        <Page 
            :current.sync="pagination.current"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            show-total
            show-elevator 
            @on-change="handlePageChange"
            >
        </Page> 
       <!-- /END PAGINATION -->

    </div>
</template>
```