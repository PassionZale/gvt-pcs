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
                <Button type="primary" @click="handleSubmit('searchForm')" :loading="btnLoading">搜索</Button>
                <Button type="ghost" @click="handleReset('searchForm')" style="margin: 0 8px;">重置</Button>
            </FormItem>
        </Form>
        <!-- /END 搜索表单 -->

        <!-- START TABS -->
        <Tabs :value="currentTab" :animated="false" @on-click="handleTabClick">
            <!-- START 绑定门店申请 -->
            <TabPane label="仓库绑定门店申请" name="store">
                <Table style="margin-bottom:24px;" stripe :loading="storeTable.loading" :data="storeTable.data" :columns="storeTable.columns"></Table>
                <Select v-model="storePagination.pageSize" style="width:80px; display: inline-block;" @on-change="handleStorePageSizeChange">
                  <Option v-for="item in storePagination.pageSizeOpts" :value="item" :key="item">{{ `${item} 条/页` }}</Option>
                </Select>
                <hr>
                <Page 
                    :current.sync="storePagination.current"
                    :total="storePagination.total"
                    :page-size="storePagination.pageSize"
                    show-total
                    show-elevator 
                    @on-change="handleStorePageChange"
                    >
                </Page> 
            </TabPane>
            <!-- /END 绑定门店申请 -->

            <!-- START 促销商品申请 -->
            <TabPane label="促销商品推送申请" name="pros">
                <Table style="margin-bottom:24px;" stripe :loading="prosTable.loading" :data="prosTable.data" :columns="prosTable.columns"></Table>
                <Select v-model="prosPagination.pageSize" style="width:80px; display: inline-block;" @on-change="handleProsPageSizeChange">
                  <Option v-for="item in prosPagination.pageSizeOpts" :value="item" :key="item">{{ `${item} 条/页` }}</Option>
                </Select>
                <hr>
                <Page 
                    :current.sync="prosPagination.current"
                    :total="prosPagination.total"
                    :page-size="prosPagination.pageSize"
                    show-total
                    show-elevator 
                    @on-change="handleProsPageChange"
                    >
                </Page> 
            </TabPane>
            <!-- /END 促销商品申请 -->
        </Tabs>
        <!-- /END TABS -->

        <Modal
          v-model="prosModal.show"
          title="促销商品设置"
          @on-ok="comfirmDetailPros"
          @on-cancel="cancelDetailPros">
          <p>商品名称: {{ prosModal.data.whProTitle }}</p>
          <p>商品条码: {{ prosModal.data.whSkuNo }}</p>
          <p>商品特价: {{ prosModal.data.whProValue }}</p>
          <p>特价数量: {{ prosModal.data.whProQuantityAble }}</p>
          <p>商品有效期: {{ prosModal.data.whProBatch }}</p>
          <!-- TODO 操作按钮需根据几种情况分别显示对应的文案及API调用 -->
          <!-- 有点迷... 暂时挂起 -->
        </Modal>

    </div>
</template>

<script>
import { baseParams } from "../../../utils/base";
import { SEARCH_SYSTEM_NOTIFY_FORM_VALIDATION } from "../../../validations/admin";
import {
  storeNotices,
  goodsNotices,
  getGoodsDetail
} from "../../../api/admin/system";
export default {
  data() {
    return {
      currentTab: "store",
      tabs: ["store", "pros"],
      beginDate_for_reset: "",
      endDate_for_reset: "",
      prosModal: {
        show: false,
        data: {}
      },
      btnLoading: false,
      form: {
        data: {
          userName: "",
          userType: "",
          noticeTimeStar: "",
          noticeTimeEnd: ""
        },
        rules: SEARCH_SYSTEM_NOTIFY_FORM_VALIDATION
      },
      storePagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOpts: [10, 25, 50, 100]
      },
      storeTable: {
        loading: false,
        data: [],
        columns: [
          { title: "发起用户", key: "applyName" },
          { title: "用户类型", key: "userType" },
          { title: "申请对象", key: "applyObjectName" },
          { title: "通知内容", key: "content" },
          { title: "通知时间", key: "createTime" },
          {
            title: "操作",
            key: "CRUD",
            render: (h, params) => {
              if (params.row.state === 0) {
                // 同意 & 拒绝 按钮 SHOW
                // TODO 交互
                return h('div', [
                  h('Button', {style: {marginRight: "5px"}, props:{type:'success',size:'small',icon:'checkmark', on:{click:() => {}}}}, '同意'),
                  h('Button', {props:{type:'error',size:'small',icon:'close-round', on:{click:() => {}}}}, '拒绝')
                ])
              }else if(params.row.state === 1){
                // 已同意 按钮 DISABLED
                return h('Button', {props:{type:'success',size:'small',icon:'checkmark', disabled:true}}, '已同意')
              }else{
                // 已拒绝 按钮 DISABLED
                return h('Button', {props:{type:'error',size:'small',icon:'close-round', disabled:true}}, '已拒绝')
              }
            }
          }
        ]
      },
      prosPagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOpts: [10, 25, 50, 100]
      },
      prosTable: {
        loading: false,
        data: [],
        columns: [
          { title: "发起用户", key: "applyName" },
          { title: "用户类型", key: "userType" },
          { title: "申请对象", key: "applyObjectName" },
          { title: "通知内容", key: "content" },
          { title: "通知时间", key: "createTime" },
          {
            title: "操作",
            key: "CRUD",
            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "ios-eye"
                  },
                  on: {
                    click: () => {
                      this.detailPros(params.row.id);
                    }
                  }
                },
                "详情"
              );
            }
          }
        ]
      }
    };
  },
  created() {
    this.initTab();
  },
  methods: {
    initTab() {
      let tab = this.$route.query.tab;
      if (this.tabs.indexOf(tab) >= 0) {
        this.currentTab = tab;
      }
    },
    handleTabClick(name) {
      this.currentTab = name;
    },
    handleBeginDateChange(date) {
      this.form.data.noticeTimeStar = date;
    },
    handleEndDateChange(date) {
      this.form.data.noticeTimeEnd = date;
    },
    loadStoreData() {
      this.btnLoading = true;
      this.storeTable.loading = true;
      let page = this.storePagination.current;
      let rows = this.storePagination.pageSize;
      let options = Object.assign({}, baseParams, { page, rows });
      let params = Object.assign({}, options, this.form.data);
      storeNotices(params)
        .then(response => {
          this.storePagination.total = response.result.total;
          this.storeTable.data = response.result.rows;
          this.$nextTick(function() {
            this.storeTable.loading = false;
            this.btnLoading = false;
          });
        })
        .catch(error => {
          this.storeTable.loading = false;
          this.btnLoading = false;
        });
    },
    handleStorePageChange(page) {
      this.loadStoreData();
    },
    handleStorePageSizeChange() {
      this.storePagination.current = 1;
      this.loadStoreData();
    },
    loadProsData() {
      this.prosTable.loading = true;
      this.btnLoading = true;
      let page = this.prosPagination.current;
      let rows = this.prosPagination.pageSize;
      let options = Object.assign({}, baseParams, { page, rows });
      let params = Object.assign({}, options, this.form.data);
      goodsNotices(params)
        .then(response => {
          this.prosPagination.total = response.result.total;
          this.prosTable.data = response.result.rows;
          this.$nextTick(function() {
            this.prosTable.loading = false;
            this.btnLoading = false;
          });
        })
        .catch(error => {
          this.prosTable.loading = false;
          this.btnLoading = false;
        });
    },
    handleProsPageChange(page) {
      this.loadProsData();
    },
    handleProsPageSizeChange() {
      this.prosPagination.current = 1;
      this.loadProsData();
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.currentTab === "store") {
            this.storePagination.current = 1;
            this.loadStoreData();
          } else {
            this.prosPagination.current = 1;
            this.loadProsData();
          }
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.beginDate_for_reset = "";
      this.endDate_for_reset = "";
    },
    detailPros(id) {
      getGoodsDetail({ id, sortOrder: "desc" })
        .then(response => {
          this.prosModal.show = true;
          this.prosModal.data = response.result.rows;
        })
        .catch();
    },
    comfirmDetailPros() {},
    cancelDetailPros() {}
  }
};
</script>