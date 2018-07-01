<template>
    <div>
        <Tabs :value="currentTab" :animated="false">
            <TabPane label="仓库绑定门店申请" name="warehouse">
                门店绑定仓库申请
            </TabPane>
            <TabPane label="促销商品推送申请" name="pros">
                促销商品推送申请
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: "warehouse",
      tabs: ["warehouse", "pros"]
    };
  },
  created() {
    let tab = this.$route.query.tab;
    if (this.tabs.indexOf(tab) >= 0) {
      this.currentTab = tab;
    }
  },
  mounted() {}
};
</script>