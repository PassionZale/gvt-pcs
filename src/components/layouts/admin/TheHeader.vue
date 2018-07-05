<template>
    <Header :style="{padding:'0 16px',background: '#fff',borderBottom:'1px solid #eee'}">
      <Row>
        <Col span="12" :style="{textAlign:'left'}">
          <router-link :to="{ path: '/' }">
            <img :src="logoIcon" style="width:auto;height:32px;vertical-align:middle;"/>
            <span style="color:#495060;margin-left: 10px;">{{ '欢迎你, ' + user.username }}</span>
          </router-link>
        </Col>
        <Col span="12" :style="{textAlign:'right'}">
          <Button type="primary" icon="log-out" @click="logout">
            注销
          </Button>
        </Col>
      </Row>
    </Header>
</template>

<script>
import { mapGetters } from "vuex";
import logoIcon from "../../../assets/logo.png";
export default {
  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      logoIcon
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("LogOut")
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.$router.push("/login");
        });
    }
  }
};
</script> 