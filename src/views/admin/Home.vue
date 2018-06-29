<template>
    <div>

        <!-- START 快捷入口 -->
        <Row>
            <Col span="11">
                <Card>
                    <p slot="title">
                        <Icon type="flag"></Icon>
                        快速入口
                    </p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                </Card>
            </Col>
            <Col span="11" offset="2">
                <Card>
                    <p slot="title">
                        <Icon type="arrow-graph-up-right"></Icon>
                        最新消息
                    </p>
                    <Button 
                        type="text" 
                        slot="extra" 
                        @click="refresh" 
                        icon="ios-loop-strong" 
                        :loading="btnLoading"
                        style="color:#2d8cf0;">
                        刷新
                    </Button>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
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
      btnLoading: false
    };
  },
  created() {
    API.systemIndex()
      .then()
      .catch();
    API.getAllStoreOrder()
      .then()
      .catch();
    API.getAllWarehouseOrder()
      .then()
      .catch();
  },
  methods: {
    refresh() {
      this.btnLoading = true;
    }
  }
};
</script>

