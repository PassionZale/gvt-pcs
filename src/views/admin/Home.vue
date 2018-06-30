<template>
    <div>
        <!-- START 快捷入口 -->
        <Row>
            <Col span="11">
                <Card style="height: 285px;">
                    <p slot="title">
                        <Icon type="flag"></Icon>
                        快速入口
                    </p>
                    <Badge :count="entryData.storeNum">
                        <Button type="primary">门店绑定仓库申请</Button>
                        <a href="#" class="demo-badge"></a>
                    </Badge>
                    <Badge :count="entryData.warehouseNum">
                        <Button type="primary">促销商品推送申请</Button>
                    </Badge>
                </Card>
            </Col>
            <Col span="11" offset="2">
                <Card style="height: 285px;">
                    <p slot="title">
                        <Icon type="arrow-graph-up-right"></Icon>
                        最新消息
                    </p>
                    <Button 
                        type="text" 
                        slot="extra" 
                        @click="initHomeNews" 
                        icon="ios-loop-strong" 
                        :loading="btnLoading"
                        style="color:#2d8cf0;">
                        刷新
                    </Button>

                    <Timeline style="height: 200px;overflow: auto;">
                        <TimelineItem 
                            v-for="row in entryData.rows" 
                            :key="row.id"
                            color="red">
                            <p class="time">
                                {{ row.createTime | timeAgo }}
                            </p>
                            <p class="content">
                                <a href="javascript:;">{{ row | parseHomeNews }}</a>
                            </p>
                        </TimelineItem>
                    </Timeline>
                </Card>
            </Col>
        </Row>        
        <!-- /END 快捷入口 -->
        <hr>
        <!-- START 门店订单信息统计 -->
        <h3>门店订单信息统计</h3>
        <Table stripe :columns="storeTable.columns" :data="storeTable.data" :loading="storeTable.loading"></Table>
        <!-- /END 门店订单信息统计 -->
        <hr>
        <!-- START 仓库订单信息统计 -->
        <h3>仓库订单信息统计</h3>
        <Table stripe :columns="storeTable.columns" :data="warehouseTable.data" :loading="storeTable.loading"></Table>
        <!-- /END 仓库订单信息统计 -->
    </div>
</template>

<script>
import * as API from "../../api/admin/home";
export default {
  data() {
    return {
      btnLoading: false,
      entryData: {},
      storeTable: {
        loading: true,
        data: [],
      columns: [
        { title: "门店名称", key: "storeName" },
        { title: "订单总数", key: "proBarcode" },
        { title: "采购单总数", key: "stPchSum" },
        { title: "订单销售额", key: "proClass" },
        { title: "采购单销售额", key: "stPchTotal" },
        { title: "订单商品总数", key: "storeValidity" },
        { title: "采购商品总数", key: "stPchNumber" }
      ],

      },
      warehouseTable: {
        loading: true,
        data: [],
      columns: [
        { title: "仓库名称", key: "waehouseName" },
        { title: "订单总数", key: "proBarcode" },
        { title: "采购单总数", key: "stPchSum" },
        { title: "订单销售额", key: "proClass" },
        { title: "采购单销售额", key: "stPchTotal" },
        { title: "订单商品总数", key: "storeValidity" },
        { title: "采购商品总数", key: "stPchNumber" }
      ],

      }
    };
  },
  created() {
    this.initHomeNews();
    API.getAllStoreOrder()
      .then(response => {
        this.storeTable.loading = false;
        this.storeTable.data = response.rows;
      })
      .catch(error => {
        this.storeTable.loading = false;
      });
    API.getAllWarehouseOrder()
      .then(response => {
        this.storeTable.loading = false;
        this.warehouseTable.data = response.rows;
      })
      .catch(error => {
        this.warehouseTable.loading = false;
      });
  },
  methods: {
    initHomeNews() {
      this.btnLoading = true;
      API.systemIndex()
        .then(response => {
          this.entryData = Object.assign({}, this.entryData, response.result);
          this.$nextTick(function() {
            this.btnLoading = false;
          });
        })
        .catch(error => {
          this.btnLoading = false;
        });
    }
  }
};
</script>

