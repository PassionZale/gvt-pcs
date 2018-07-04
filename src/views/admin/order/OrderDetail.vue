<template>
    <div>

        <!-- START 搜索表单 -->
        <Form ref="searchForm" :model="form.data" :rules="form.rules" :label-width="80" inline>
            <FormItem label="商品品牌:" prop="proBrand">
                <Input type="text" v-model="form.data.proBrand" placeholder="请输入商品品牌"></Input>
            </FormItem>
            <FormItem label="商品类别:" prop="proCategoryName">
                <Input type="text" v-model="form.data.proCategoryName" placeholder="请选择商品类别"></Input>
            </FormItem>
            <FormItem label="商品名称:" prop="proName">
                <Input type="text" v-model="form.data.proName" placeholder="请输入商品名称"></Input>
            </FormItem>
            <FormItem label="商品条码:" prop="proBarcode">
                <Input type="text" v-model="form.data.proBarcode" placeholder="请输入商品条码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('searchForm')">搜索</Button>
                <Button type="ghost" @click="handleReset('searchForm')" style="margin: 0 8px;">重置</Button>
            </FormItem>
        </Form>
        <!-- /END 搜索表单 -->


        <!-- START 数据展示 -->
        <Table :height="$breakpoint.tableHeight" style="margin-bottom:24px;" size="large" stripe :loading="table.loading" :columns="table.columns" :data="table.data"></Table>

        <Select class="page-size-selector" v-model="pagination.pageSize" style="width:80px; display: inline-block;" @on-change="handlePageSizeChange">
        <Option v-for="item in pagination.pageSizeOpts" :value="item" :key="item">{{ `${item} 条/页` }}</Option>
        </Select>
        <hr>
        <Page 
            :current.sync="pagination.current"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            show-total
            show-elevator 
            @on-change="handlePageChange"
            >
        </Page> 
        <!-- /END 数据展示 -->

    </div>
</template>

<script>
import { baseParams, parseAmount } from "../../../utils/base";
import { breakpoint } from "../../../mixins/break_table_point";
import { managerListOrderPros } from "../../../api/admin/order";
import { SEARCH_STORE_PROS_FORM_VALIDATION } from "../../../validations/admin";
export default {
  mixins: [breakpoint],
  data() {
    return {
      form: {
        data: {
          proBrand: "",
          proCategoryName: "",
          proName: "",
          proBarcode: "",
          // TODO 此参数待确定
          orderNo: this.$route.params.orderNo
        },
        rules: SEARCH_STORE_PROS_FORM_VALIDATION
      },

      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOpts: [10, 25, 50, 100]
      },

      table: {
        loading: false,
        data: [],
        columns: [
          { title: "商品名称", key: "proName" },
          { title: "商品条码", key: "proBarcode" },
          { title: "商品品牌", key: "proBrand" },
          { title: "商品类别", key: "proCategoryName" },
          { title: "采购数量", key: "storeNum" },
          { title: "商品有效期", key: "whProBatch" },
          {
            title: "采购单价",
            key: "proPrice",
            render: (h, params) => {
              return h("strong", parseAmount(params.row.proPrice));
            }
          },
          {
            title: "商品Gst",
            key: "stPchGst",
            render: (h, params) => {
              return h("strong", parseAmount(params.row.stPchGst));
            }
          }
        ]
      }
    };
  },
  methods: {
    loadData() {
      this.table.loading = true;
      let page = this.pagination.current;
      let rows = this.pagination.pageSize;
      let options = Object.assign({}, baseParams, { page, rows });
      let params = Object.assign({}, options, this.form.data);
      managerListOrderPros(params)
        .then(response => {
          this.pagination.total = response.total;
          this.table.data = response.rows;
          this.$nextTick(function() {
            this.table.loading = false;
          });
        })
        .catch(error => {
          this.table.loading = false;
        });
    },
    handlePageChange(page) {
      this.loadData();
    },
    handlePageSizeChange() {
      this.pagination.current = 1;
      this.loadData();
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.pagination.current = 1;
          this.loadData();
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

