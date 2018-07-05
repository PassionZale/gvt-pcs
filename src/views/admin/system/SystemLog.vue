<template>
    <div>

        <!-- START 搜索表单 -->
        <Form ref="searchForm" :model="form.data" :rules="form.rules" :label-width="80" inline>
            <FormItem label="用户名:" prop="userName">
                <Input type="text" v-model="form.data.userName" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="用户类型:" prop="userType">
                <Input type="text" v-model="form.data.userType" placeholder="请输入用户类型"></Input>
            </FormItem>
            <FormItem label="通知时间:">
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
        <Table style="margin-bottom:24px;" size="large" stripe :loading="table.loading" :columns="table.columns" :data="table.data"></Table>

        <Row type="flex">
          <Col span="2">
            <Select v-model="pagination.pageSize" @on-change="handlePageSizeChange">
              <Option v-for="item in pagination.pageSizeOpts" :value="item" :key="item">{{ `${item} 条/页` }}</Option>
            </Select>
          </Col>
          <Col span="22">
            <Page 
              :current.sync="pagination.current"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              show-total
              show-elevator 
              @on-change="handlePageChange"
              >
            </Page> 
          </Col>
        </Row>
        <!-- /END DATA TABLE -->
        
    </div>
</template>

<script>
import { baseParams } from "../../../utils/base";
import { managerSystemUserLogs } from "../../../api/admin/system";
import { SEARCH_SYSTEM_LOG_FORM_VALIDATION } from "../../../validations/admin";
export default {
  data() {
    return {
      beginDate_for_reset: "",
      endDate_for_reset: "",
      form: {
        data: {
          userName: "",
          userType: "",
          noticeTimeStar: "",
          noticeTimeEnd: ""
        },
        rules: SEARCH_SYSTEM_LOG_FORM_VALIDATION
      },

      table: {
        loading: false,
        data: [],
        columns: [
          { title: "用户", key: "userName" },
          { title: "用户类型", key: "userType" },
          { title: "日志信息", key: "logContent" },
          {
            title: "日志时间",
            key: "logTime",
            render: (h, params) => {
              return h("span", params.row.logTime.replace(".0", ""));
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
      managerSystemUserLogs(params)
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
    },
    handleBeginDateChange(date) {
      this.form.data.noticeTimeStar = date;
    },
    handleEndDateChange(date) {
      this.form.data.noticeTimeEnd = date;
    }
  }
};
</script>