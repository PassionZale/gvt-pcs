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