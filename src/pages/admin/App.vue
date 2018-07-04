<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
a:focus,
button:focus,
input:focus,
textarea:focus {
  outline: none;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}
.router-link-active {
  li {
    color: #2d8cf0 !important;
    border-right: 2px solid #2d8cf0 !important;
    z-index: 2 !important;
  }
}
</style>