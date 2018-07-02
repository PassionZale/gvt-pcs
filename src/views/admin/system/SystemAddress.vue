<template>
    <div>
        
        <!-- START 搜索表单 -->
        <Form ref="searchForm" :model="form.data" :rules="form.rules" :label-width="80" inline>
            <FormItem label="出库单号:" prop="outboundNo">
                <Input type="text" v-model="form.data.outboundNo" placeholder="请输入出库单号"></Input>
            </FormItem>
            <FormItem label="门店名称:" prop="storeName">
                <Input type="text" v-model="form.data.storeName" placeholder="请输入门店名称"></Input>
            </FormItem>
            <FormItem label="仓库名称:" prop="wareName">
                <Input type="text" v-model="form.data.wareName" placeholder="请输入仓库名称"></Input>
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

<script>
import { baseParams } from "../../../utils/base";
import {
  selectAdminListOfOrders,
  updateConfrimOrder
} from "../../../api/admin/system";
import { SEARCH_SYSTEM_ADDRESS_FORM_VALIDATION } from "../../../validations/admin";
export default {
  data() {
    return {
      form: {
        data: {
          storeName: "",
          wareName: "",
          outboundNo: ""
        },
        rules: SEARCH_SYSTEM_ADDRESS_FORM_VALIDATION
      },
      table: {
        loading: false,
        data: [],
        columns: [
          { title: "出库单号", key: "stockNo" },
          { title: "门店名称", key: "storeName" },
          { title: "门店地址", key: "storeAddress" },
          { title: "仓库名称", key: "warehouseName" },
          { title: "仓库地址", key: "warehouseAddress" },
          { title: "门店经维度", key: "stockLatitude" },
          { title: "仓库经维度", key: "warehouseLatitude" },
          { title: "出库时间", key: "stockCTime" },
          { title: "出库时间", key: "stockCTime" },
          {
            title: "操作",
            key: "CURD",
            render: (h, params) => {
              if (params.row.stockConfirmLibrary === 1) {
                // 确认 按钮
                return h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      icon: "checkmark"
                    },
                    on: {
                      click: () => {
                        this.handleConfirmBtn(params.index);
                      }
                    }
                  },
                  "确认"
                );
              } else {
                //  已确认 按钮 DISABLED
                return h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small",
                      icon: "checkmark",
                      disabled: true
                    }
                  },
                  "已确认"
                );
              }
            }
          }
        ]
      },
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOpts: [10, 25, 50, 100]
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
      selectAdminListOfOrders(params)
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
    },
    handleConfirmBtn(index) {
      let stockNo = this.table.data[index]["stockNo"];
      updateConfrimOrder({ stockNo })
        .then(response => {
          if (response.success) {
            this.$Message.success("操作成功");
            this.table.data[index]["stockConfirmLibrary"] = 2;
          } else {
            this.$Message.success("操作失败");
          }
        })
        .catch();
    }
  }
};
</script>