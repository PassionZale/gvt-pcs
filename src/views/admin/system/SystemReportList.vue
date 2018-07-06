<template>
    <div>

        <div v-show="!form.show">
          <Button type="primary" @click="form.show = !form.show">新增解析模板</Button>
          <hr>
          <Table :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
        </div>

        <div v-show="form.show">
          <strong>接口解析模板-新增</strong>
          <hr>
          <Form ref="addForm" :model="form.data" :rules="form.rules" :label-width="100" inline>
            
            <FormItem label="解析模板名称" required prop="parseModelName">
              <Input required type="text" v-model="form.data.parseModelName" placeholder="请输入解析模板名称" style="width:300px"></Input>
            </FormItem>

            <FormItem label="文件类型" required prop="fileType">
              <Select placeholder="请选择文件类型" v-model="form.data.fileType" disabled style="width:300px">
                <Option value="TXT">TXT</Option></Option>
                <Option value="EXCEL">EXCEL</Option></Option>
                <Option value="WORLD">WORLD</Option></Option>
              </Select>
            </FormItem>
            <br>

            <FormItem label="起始页" prop="startPage">
              <Input type="text" v-model="form.data.startPage" placeholder="请输入起始页" style="width:300px"></Input>
            </FormItem>
            <FormItem label="结束页" prop="endPage">
              <Input type="text" v-model="form.data.endPage" placeholder="请输入结束页" style="width:300px"></Input>
            </FormItem>
            <br>

            <FormItem label="起始列" prop="startRow">
              <Input type="text" v-model="form.data.startRow" placeholder="请输入起始列" style="width:300px"></Input>
            </FormItem>
            <FormItem label="结束列" prop="endRow">
              <Input type="text" v-model="form.data.endRow" placeholder="请输入结束列" style="width:300px"></Input>
            </FormItem>
            <br>

            <FormItem label="起始行" prop="startColumn">
              <Input type="text" v-model="form.data.startColumn" placeholder="请输入起始行" style="width:300px"></Input>
            </FormItem>
            <FormItem label="结束行" prop="endColumn">
              <Input type="text" v-model="form.data.endColumn" placeholder="请输入结束行" style="width:300px"></Input>
            </FormItem>
            <br>

            <FormItem label="文件名称" prop="fileName">
              <Input type="text" v-model="form.data.fileName" placeholder="请输入文件名称" style="width:300px"></Input>
            </FormItem>
            <FormItem label="文件路径" prop="filePath">
              <Input type="text" v-model="form.data.filePath" placeholder="请输入文件路径" style="width:300px"></Input>
            </FormItem>
            <br>
                        
            <FormItem label="启用状态" prop="enabledStatus"> 
              <RadioGroup v-model="form.data.enabledStatus"  style="width:300px">
                <Radio label="0">启用</Radio>
                <Radio label="1">禁用</Radio>
              </RadioGroup>
            </FormItem>
            <br>
            <FormItem label="备注" prop="remark">
              <Input type="textarea" v-model="form.data.remark" style="width:600px" :rows="4" placeholder="请输入内容" ></Input>
            </FormItem>
            <br>
            <FormItem>
              <Button :loading="btnLoading" type="primary" @click="handleSubmit('addForm')">确认</Button>
              <Button type="ghost" @click="form.show = !form.show">取消</Button>
            </FormItem>
          </Form>
          
        </div>
    
    </div>
</template>

<script>
import { addParseModelInfo } from "../../../api/admin/system";
export default {
  data() {
    return {
      btnLoading: false,
      form: {
        show: true,
        data: {
          parseModelName: "",
          fileType: "EXCEL",
          fileName: "",
          filePath: "",
          startPage: "",
          endPage: "",
          startRow: "",
          endRow: "",
          startColumn: "",
          endColumn: "",
          enabledStatus: "0",
          remark: ""
        },
        rules: {
          parseModelName: [
            { required: true, trigger: "blur", message: "解析模板名称不能为空" }
          ]
        }
      },

      table: {
        loading: false,
        data: [],
        columns: [
          {
            title: "模板名称",
            key: "name",
            render: (h, params) => {
              return h(
                "a",
                {
                  attrs: {
                    title: `点击查看${params.row.name}解析模板详情`,
                    href: `#/system/report/detail/${params.row.name}`
                  }
                },
                params.row.name
              );
            }
          },
          { title: "数据分类", key: "dataCategory" },
          { title: "明细分类", key: "detailCategory" },
          { title: "文件格式", key: "type" },
          {
            title: "操作",
            key: "CRUD",
            render: (h, params) => {
              return h("div", [
                h("Button", {
                  prop: {
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
                  prop: {
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
                  prop: {
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

  created() {},

  methods: {

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          addParseModelInfo(this.form.data)
            .then(response => {
              this.btnLoading = false;
              this.$Message.success(`${this.form.data.parseModelName} 创建成功`);
              this.form.show = false;
            })
            .catch(error => {
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>

