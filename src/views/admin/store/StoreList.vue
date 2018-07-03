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
              <Button type="ghost" @click="handleReset('searchForm')" style="margin: 0 8px;">重置</Button>
              <Button type="ghost" @click="handleCreate" icon="plus">门店创建</Button>
          </FormItem>
      </Form>
      <!-- /END 搜索表单 -->

      <!-- START 数据展示 -->
      <Table :height="$breakpoint.tableHeight" style="margin-bottom:24px;" stripe :loading="table.loading" :columns="table.columns" :data="table.data"></Table>

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
import { baseParams } from "../../../utils/base";
import { breakpoint } from "../../../mixins/break_table_point";
import { managerStore } from "../../../api/admin/store";
import { SEARCH_STORE_FORM_VALIDATION } from "../../../validations/admin";

export default {
  mixins: [breakpoint],
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
          {
            title: "门店名称",
            key: "storeName",
            render: (h, params) => {
              return h(
                "a",
                {
                  attrs: {
                    title: `点击查看${params.row.storeName}门店商品列表`,
                    href: `#/store/pros/${params.row.storeName}`
                  }
                },
                params.row.storeName
              );
            }
          },
          { title: "门店编号", key: "userNo" },
          { title: "门店地址", key: "warehouseAddress" },
          {
            title: "创建时间",
            key: "bindAddtime",
            render: (h, params) => {
              return h("span", params.row.bindAddtime.replace(".0", ""));
            }
          },
          {
            title: "门店状态",
            key: "signingStatus",
            render: (h, params) => {
              let len = params.row.bindedWarehouseList.length;
              let text = len > 0 ? "已签约" : "未签约";
              let color = len > 0 ? "green" : "default";
              return h("Tag", { props: { color: color } }, [text]);
            }
          },
          {
            title: "绑定仓库",
            key: "bindedWarehouseList",
            render: (h, params) => {
              return h(
                "div",
                params.row.bindedWarehouseList.map(item => {
                  return h("Tag", { props: { color: "green" } }, [
                    item.warehouseName
                  ]);
                })
              );
            }
          },
          {
            title: "操作",
            key: "CRUD",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      icon: "android-refresh"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Notice.warning({
                          title: "TODO",
                          desc: "同步数据交互暂未完成"
                        });
                        // this.refresh(params.row.id);
                      }
                    }
                  },
                  "同步数据"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      icon: "edit"
                    },
                    on: {
                      click: () => {
                        this.$Notice.warning({
                          title: "TODO",
                          desc: "获取指定门店数据 API MISSING"
                        });
                        //this.edit(params);
                      }
                    }
                  },
                  "编辑"
                )
              ]);
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
      let params = Object.assign({}, options, this.searchForm.data);
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
    handleCreate() {
      this.$router.push({ name: "store-create" });
    }
  }
};
</script>
