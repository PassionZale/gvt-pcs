<template>
    <!-- START 搜索表单 -->
    <Form ref="form" :model="form.data" :rules="form.rules" :label-width="80">
        <FormItem label="管理员名称:" prop="adminUserName">
            <Input type="text" v-model="form.data.adminUserName" placeholder="请输入管理员名称" style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="管理员密码:" prop="adminPassword">
            <Input type="password" v-model="form.data.adminPassword" placeholder="请输入管理员密码" style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="确认密码:" prop="confirm_password">
            <Input type="password" v-model="form.data.confirm_password" placeholder="请再次输入密码" style="width: 300px;"></Input>
        </FormItem>
        <FormItem>
            <Button :loading="btnLoading" type="primary" @click="handleSubmit('form')">确定</Button>
        </FormItem>
    </Form>
    <!-- /END 搜索表单 -->
</template>

<script>
export default {
  data() {
    return {
      btnLoading: false,
      form: {
        data: {
          adminUserName: "",
          adminPassword: "",
          confirm_password: ""
        },
        rules: {}
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.btnLoading = true;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.btnLoading = false;
        }
      });
    }
  }
};
</script>