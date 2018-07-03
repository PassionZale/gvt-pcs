<template>
    <div>
      <!-- START 搜索表单 -->
      <Form ref="searchForm" :model="searchForm.data" :rules="searchForm.validation" inline>
          <FormItem prop="warehouseName">
              <Input type="text" v-model="searchForm.data.warehouseName" placeholder="请输入仓库名称"></Input>
          </FormItem>
          <FormItem prop="warehouseNo">
              <Input type="text" v-model="searchForm.data.warehouseNo" placeholder="请输入仓库编号"></Input>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('searchForm')">搜索</Button>
              <Button type="ghost" @click="handleReset('searchForm')" style="margin: 0 8px;">重置</Button>
              <Button type="ghost" @click="handleCreate" icon="plus">仓库创建</Button>
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
import { managerWarehouse } from "../../../api/admin/warehouse";
import { SEARCH_WAREHOUSE_FORM_VALIDATION } from "../../../validations/admin";

export default {
  mixins: [breakpoint],
  data() {
    return {
      searchForm: {
        data: { warehouseName: "", warehouseNo: "" },
        validation: SEARCH_WAREHOUSE_FORM_VALIDATION
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
            title: "仓库名称",
            key: "warehouseName",
            render: (h, params) => {
              return h(
                "a",
                {
                  attrs: {
                    title: `点击查看${params.row.warehouseName}门店商品列表`,
                    href: `#/warehouse/pros/${params.row.warehouseName}`
                  }
                },
                params.row.warehouseName
              );
            }
          },
          { title: "仓库编号", key: "warehouseNo" },
          { title: "仓库地址", key: "warehouseAddress" },
          {
            title: "创建时间",
            key: "warehouseAddtime",
            render: (h, params) => {
              let time = "";
              try {
                time = params.row.warehouseAddtime.replace(".0", "");
              } catch (error) {}
              return h("span", time);
            }
          },
          {
            title: "仓库状态",
            key: "warehouseStatus",
            render: (h, params) => {
              let len = params.row.bindedStoreList.length;
              let text = len > 0 ? "已签约" : "未签约";
              let color = len > 0 ? "green" : "default";
              return h("Tag", { props: { color: color } }, [text]);
            }
          },
          {
            title: "关联门店",
            key: "bindedStoreList",
            render: (h, params) => {
              return h(
                "div",
                params.row.bindedStoreList.map(item => {
                  return h("Tag", [item.storeName]);
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
                          desc: "获取指定仓库数据 API MISSING"
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
      managerWarehouse(params)
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
      this.$router.push({ name: "warehouse-create" });
    }
  }
};
</script>
