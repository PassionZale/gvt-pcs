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


    </div>
</template>

<script>
import * as API from "../../api/admin/index";
export default {
  data() {
    return {
      btnLoading: false,
      entryData: {}
    };
  },
  created() {
    this.initHomeNews();
    API.getAllStoreOrder()
      .then()
      .catch();
    API.getAllWarehouseOrder()
      .then()
      .catch();
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

