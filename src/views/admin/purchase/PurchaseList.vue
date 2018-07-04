<template>
    <div>

        <!-- START 搜索表单 -->
        <Form ref="searchForm" :model="form.data" :rules="form.rules" :label-width="80" inline>
            <FormItem label="采购单号:" prop="outboundNo">
                <Input type="text" v-model="form.data.outboundNo" placeholder="请输入出库单号"></Input>
            </FormItem>
            <FormItem label="选择仓库:" prop="warehouseName">
               <Select v-model="form.data.warehouseName" filterable clearable placeholder="请选择仓库">
                   <Option v-for="item in warehouses" :value="item.warehouseName" :key="item.warehouseId">{{ item.warehouseName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="选择门店:" prop="storeName">
                <Select v-model="form.data.storeName" filterable clearable placeholder="请选择门店">
                   <Option v-for="item in stores" :value="item.storeName" :key="item.storeId">{{ item.storeName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="采购时间:">
              <Row>
                  <Col span="11">
                      <DatePicker v-model="beginDate_for_reset" type="date" placeholder="选择起始日期" @on-change="handleBeginDateChange"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker v-model="endDate_for_reset" type="date" placeholder="选择截止日期" @on-change="handleEndDateChange"></DatePicker>
                  </Col>
              </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('searchForm')">搜索</Button>
                <Button type="ghost" @click="handleReset('searchForm')" style="margin: 0 8px;">重置</Button>
            </FormItem>
        </Form>
        <!-- /END 搜索表单 -->

        <!-- START DATA TABLE -->
        <Table :height="$breakpoint.tableHeight" style="margin-bottom:24px;" size="large" stripe :loading="table.loading" :columns="table.columns" :data="table.data"></Table>
        <!-- /END DATA TABLE -->

        <!-- START PAGESIZE-->
        <Select class="page-size-selector" v-model="pagination.pageSize" style="width:80px; display: inline-block;" @on-change="handlePageSizeChange">
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
import { baseParams, parseAmount } from "../../../utils/base";
import { breakpoint } from "../../../mixins/break_table_point";
import {
  getAllStore,
  getAllwarehouse,
  managerPurchase
} from "../../../api/admin/purchase";
import { SEARCH_PURCHASE_LIST_FORM_VALIDATION } from "../../../validations/admin";
export default {
  mixins: [breakpoint],
  data() {
    return {
      warehouses: [],
      stores: [],
      beginDate_for_reset: "",
      endDate_for_reset: "",
      form: {
        data: {
          buylistNo: "",
          warehouseName: "",
          storeName: "",
          buyTimeStar: "",
          buyTimeEnd: ""
        },
        rules: SEARCH_PURCHASE_LIST_FORM_VALIDATION
      },
      table: {
        loading: false,
        data: [],
        columns: [
          {
            title: "采购单号",
            key: "procureNo",
            render: (h, params) => {
              return h(
                "a",
                {
                  attrs: {
                    title: `点击查看详情`,
                    href: `#/purchase/detail/${params.row.procureNo}`
                  }
                },
                params.row.procureNo
              );
            }
          },
          { title: "发起门店", key: "initiateStore" },
          { title: "指定仓库", key: "specifiedWarehouse" },
          {
            title: "采购时间",
            key: "procureTime",
            render: (h, params) => {
              return h("span", params.row.procureTime.replace(".0", ""));
            }
          },
          {
            title: "出库时间",
            key: "procureTime",
            render: (h, params) => {
              return h("span", params.row.procureTime.replace(".0", ""));
            }
          },
          {
            title: "状态",
            key: "procureStatus",
            render: (h, params) => {
              let status = params.row.procureStatus;
              let text = "";
              switch (status) {
                case "-1":
                  text = "已拒绝";
                  break;
                case "1":
                  text = "待确认";
                  break;
                case "2":
                  text = "已付款";
                  break;
                case "3":
                  text = "待发货";
                  break;
                case "4":
                  text = "待收货";
                  break;
                case "5":
                  text = "已完成";
                  break;
                case "6":
                  text = "待付款";
                  break;
                default:
                  text = "";
              }
              return text
                ? h("Tag", { props: { type: "border" } }, [text])
                : "";
            }
          },
          {
            title: "采购金额",
            key: "purchaseMoney",
            render: (h, params) => {
              let number = parseAmount(params.row.purchaseMoney);
              return h("strong", number);
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
  created() {
    getAllwarehouse()
      .then(response => {
        this.warehouses = response;
      })
      .catch();
    getAllStore()
      .then(response => {
        this.stores = response;
      })
      .catch();
  },
  methods: {
    handleBeginDateChange(date) {
      this.form.data.buyTimeStar = date;
    },
    handleEndDateChange(date) {
      this.form.data.buyTimeEnd = date;
    },
    loadData() {
      this.table.loading = true;
      let page = this.pagination.current;
      let rows = this.pagination.pageSize;
      let options = Object.assign({}, baseParams, { page, rows });
      let params = Object.assign({}, options, this.form.data);
      managerPurchase(params)
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
      this.beginDate_for_reset = "";
      this.endDate_for_reset = "";
    }
  }
};
</script>

