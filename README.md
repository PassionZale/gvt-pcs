# gvt-pcs
purchase system for GVT

./node_modules/iview/src/components/page/page.vue 261 Line

``` javascript
// 太BUG了... 我特么...哎
onSize (pageSize) {
    this.currentPageSize = pageSize;
    this.$emit('on-page-size-change', pageSize);
    this.changePage(1);
},
```

## FEATURES
1. views/admin/store/StoreCreate.vue 创建门店的交互待完成
2. views/admin/system/SystemNotify.vue 促销商品推送申请, 点击详情按钮后的"同意"、"拒绝"等操作交互待完成
3. views/admin/system/SystemNotify.vue 仓库绑定门店申请, "同意"、"拒绝"等操作交互待完成


## TODOS
1. 编写 mixins 全局注入, 监听 window.resize
2. 在 window.resize 中动态计算 Table 的高度及宽度
3. 后面考虑优化表格中是否固定某一列或几列

## TIPS
1. 在组件中调用路由方法时,使用 this.$router, 例如: this.$router.push({path: '/'})
2. 在组件中获取路由的 query 或 params 时, 使用 this.$route, 例如: this.$route.params.tab || this.$route.query.tab