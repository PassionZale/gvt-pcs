export const breakpoint = {
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0,
      headerHeight: 0,
      footerHeight: 0,
      tableHeight: 0,
    };
  },
  computed: {
    $breakpoint() {
      let result = {
        'clientWidth': this.clientWidth,
        'clientHeight': this.clientHeight,
        'headerHeight': this.headerHeight,
        'footerHeight': this.footerHeight,
        'tableHeight': this.tableHeight,
      };
      return result;
    },
  },
  methods: {
    _updateDimensions() {
      // Cross-browser support as described in:
      // https://stackoverflow.com/questions/1248081
      this.clientWidth = Math.max(document.documentElement.clientWidth,
        window.innerWidth || 0);
      this.clientHeight = Math.max(document.documentElement.clientHeight,
        window.innerHeight || 0);
      // height of '.ivue-layout-header' & '.ivu-layout-footer'
      this.headerHeight = document.querySelector('.ivu-layout-header').offsetHeight
      this.footerHeight = document.querySelector('.ivu-layout-footer').offsetHeight
      // height of others such like breakcrumb || form || pagination || ...
      let breakcrumbHeight = document.querySelector('.ivu-breadcrumb').offsetHeight
      let formHeight = document.querySelector('.ivu-form').offsetHeight
      let pageHeight = document.querySelector('.ivu-page').offsetHeight
      let pageSizeHeight = document.querySelector('.page-size-selector').offsetHeight

      let tableHeight = this.clientHeight - (this.headerHeight + this.footerHeight) - (breakcrumbHeight + formHeight + pageHeight + pageSizeHeight)
      this.tableHeight = tableHeight;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._updateDimensions();
      // {'passive': true} tells the browser that the event handler will never call event.preventDefault()
      window.addEventListener('resize', this._updateDimensions, {
        'passive': true
      });
    });
  },
  destroyed() {
    window.removeEventListener('resize', this._updateDimensions);
  },
};
