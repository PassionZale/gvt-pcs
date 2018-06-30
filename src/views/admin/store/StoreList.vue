<template>
    <div>
        <!-- START 搜索表单 -->
        <Form ref="searchForm" :model="searchForm.data" :rules="searchForm.validation" inline>
            <FormItem prop="storeName">
                <Input type="text" v-model="searchForm.data.storeName" placeholder="请输入门店名称"></Input>
            </FormItem>
            <FormItem prop="storeNo">
                <Input type="text" v-model="searchForm.data.storeNo" placeholder="请输入门店编号"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('searchForm')">搜索</Button>
                <Button type="ghost" @click="handleReset('searchForm')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <!-- /END 搜索表单 -->

        <!-- START 数据展示 -->
        <Table style="margin-bottom:24px;" :loading="table.loading" :columns="table.columns" :data="table.data"></Table>

        <Select v-model="pagination.pageSize" style="width:80px; display: inline-block;" @on-change="handlePageSizeChange">
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
import { baseParams } from "../../../utils/base";
import { managerStore } from "../../../api/admin/store";
import { SEARCH_STORE_FORM_VALIDATION } from "../../../validations/admin";

export default {
  data() {
    return {
      searchForm: {
        data: { storeName: "", storeNo: "" },
        validation: SEARCH_STORE_FORM_VALIDATION
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
          { title: "门店名称", key: "storeName" },
          { title: "门店编号", key: "userNo" },
          { title: "门店地址", key: "warehouseAddress" },
          { title: "创建时间", key: "bindAddtime" },
          { title: "门店状态", key: "signingStatus" }
          //   { title: "绑定仓库", key: "warehouseName" },
          //   { title: "操作", key: "CRUD" }
        ]
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.table.loading = true;
      let page = this.pagination.current;
      let rows = this.pagination.pageSize;
      let params = Object.assign({}, { page, rows }, this.searchForm.data);
      managerStore(params)
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
    handlePageSizeChange(){
      this.pagination.current = 1
      this.loadData()
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
