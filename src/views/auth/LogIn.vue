<template>
  <div>
    <c-random-images></c-random-images>  
    <Row type="flex" justify="center" class="login-container">
        <Col span="8" class="wrapper">
          <h1>采购系统</h1>
          <Form ref="loginForm" :model="form.data" :rules="form.rules">
            <FormItem prop="username">
                <Input type="text" v-model="form.data.username" size="large" clearable placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="form.data.password" size="large" clearable placeholder="请输入密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="code">
                <Row type="flex">
                  <Col span="18" class="verify-code-wrapper">
                    <Input type="text" v-model="form.data.code" size="large" clearable placeholder="请输入验证码">
                      <Icon type="code" slot="prepend"></Icon>
                    </Input>
                  </Col>
                  <Col span="6" class="verify-img-wrapper">
                    <img class="verify-img" :src="pic" @click="fetchCodeImg"/>
                  </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleSubmit('loginForm')">登录</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>

  </div>
</template>
<script>
import cRandomImages from "../../components/commons/TheRandomImages.vue";
import { LOGIN_FORM_VALIDATION } from "../../validations/auth";
import { fetchVerificationCode } from "../../api/auth";
export default {
  components: { cRandomImages },
  data() {
    return {
      form: {
        data: {
          username: "",
          password: "",
          code: ""
        },
        rules: LOGIN_FORM_VALIDATION
      },
      pic: "",
      btnText: "登录",
      btnLoading: false
    };
  },
  created() {
    this.fetchCodeImg();
  },
  mounted() {
    document.querySelector("body").style.backgroundColor = "#f3f3f4";
  },
  destroyed() {
    document.querySelector("body").style = "";
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login()
        }
      });
    },

    login() {
      this.btnLoading = true;
      this.$store
        .dispatch("LogIn", this.form.data)
        .then(response => {
          console.log(3)
          console.log(response)
          this.btnText = "登录成功，正在跳转...";
          this.$nextTick(() => {
            this.$router.push("/");
          });
        })
        .catch(error => {
          this.$Message.error(error.msg)
          this.btnLoading = false;
        });
    },

    fetchCodeImg() {
      fetchVerificationCode().then(response => {
        let reader = new FileReader();
        reader.onload = e => {
          this.pic = e.target.result;
        };
        reader.readAsDataURL(response);
      });
    }
  }
};
</script>

<style lang="less" scoped>
body {
  background: #fff;
}
.logo-container {
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
}
.login-container {
  margin-top: 200px;
  .wrapper {
    h1 {
      text-align: center;
      margin: 10px 0;
      color: #fff;
    }
    padding: 20px;
    .verify-img-wrapper {
      text-align: center;
      cursor: pointer;
      img {
        vertical-align: bottom;
      }
    }
  }
}
</style>
