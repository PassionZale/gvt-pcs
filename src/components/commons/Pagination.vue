<template>
    <Page 
        :current.sync="tmp_current_page"
        :total="total"
        :page-size="pageSize"
        show-total
        show-elevator 
        >
    </Page>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default: function() {
        return [10, 25, 50, 100];
      }
    },
  },

  data() {
    return {
      tmp_current_page: this.currentPage
    };
  },

  watch: {
    tmp_current_page: {
      handler: "updateCurrentPage"
    }
  },

  methods: {
    updateCurrentPage(newValue) {
      this.$emit("update:currentPage", newValue);
    }
  }
};
</script>

