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

## TODOS
1. 编写 mixins 全局注入, 监听 window.resize
2. 在 window.resize 中动态计算 Table 的高度及宽度
3. 后面考虑优化表格中是否固定某一列或几列