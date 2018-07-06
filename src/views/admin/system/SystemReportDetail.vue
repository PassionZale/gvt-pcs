<template>
    <div>
        <div v-show="!form.show">
          <Button type="primary" @click="form.show = !form.show">新增-报表详情</Button>
          <hr>
          <Table :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
        </div>

        <div v-show="form.show">
          <Button type="primary">确认</Button>
          <Button type="ghost" @click="form.show = !form.show">取消</Button>
          <hr>
          <Form :model="form.data" :rules="form.rules" :label-width="90">

            <FormItem label="表名">
              <Select placeholder="请选择表名" style="width:300px;">
                <Option :value="product">商品表</Option>
              </Select>
            </FormItem>

            <FormItem label="关联键">
              <Cascader :data="cascadeData" v-modal="selectedData" style="width:300px;"></Cascader>
            </FormItem>
            <FormItem label="关联键">
              <Cascader :data="cascadeData" v-modal="selectedData" style="width:300px;"></Cascader>
            </FormItem>

            <!-- <Table :loading="formTable.loading" :columns="formTable.columns" :data="formTable.data"></Table> -->

          </Form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        show: true,
        data: {},
        rules: {}
      },
      selectedData: [],
      cascadeData: [
        {
          value: "category",
          label: "商品分类表",
          children: [
            {
              value: "id",
              label: "分类 ID"
            },
            {
              value: "name",
              label: "分类名称"
            },
            {
              value: "created_at",
              label: "分类创建时间"
            },
          ]
        },
        {
          value: "sku",
          label: "商品SKU表",
          children: [
            {
              value: "id",
              label: "SKU ID"
            },
            {
              value: "product_id",
              label: "商品 ID"
            },
            {
              value: "name",
              label: "SKU 名称"
            },
          ]
        }
      ],

      formTable: {
        loading: false,
        data: [],
        columns: [
          { title: "列名", key: "" },
          { title: "列号/列顺序", key: "" },
          { title: "表字段", key: "" },
          {
            title: "启用状态",
            key: ""
          },
          { title: "备注", key: "" }
        ]
      },

      table: {
        loading: false,
        data: [],
        columns: [
          { title: "模板名称", key: "name" },
          { title: "组号", key: "dataCategory" },
          { title: "数据组类别", key: "detailCategory" },
          { title: "起始标记列名", key: "type" },
          {
            title: "操作",
            key: "CRUD",
            render: (h, params) => {
              return h("div", [
                h("Button", {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "edit"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "system-report-detail",
                        params: { id: params.row.id }
                      });
                    }
                  }
                }),
                h("Button", {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "document"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.detail(params);
                    }
                  }
                }),
                h("Button", {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "trash-a"
                  },
                  on: {
                    click: () => {}
                  }
                })
              ]);
            }
          }
        ]
      }
    };
  },

  created() {
    this.fetchReport();
  },

  methods: {
    fetchReport() {
      this.table.loading = true;
      axios.get("/src/assets/mock/templateList.json").then(response => {
        this.table.data = response.data;
        this.table.loading = false;
      });
    }
  }
};
</script>

