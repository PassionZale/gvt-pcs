<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import * as API from "../../api/admin/index";
export default {
  data() {
    return {};
  },
  created() {
    API.systemIndex();
    API.getAllStoreOrder();
    API.getAllWarehouseOrder();
  }
};
</script>

