<template>
    <Header :style="{padding:'0 16px',background: '#fff',borderBottom:'1px solid #eee'}">
      <Row>
        <Col span="12" :style="{textAlign:'left'}">
          <router-link :to="{ path: '/' }">
            <img src="/src/assets/logo.png" style="width:auto;height:32px;vertical-align:middle;"/>
            <span style="color:#495060;">{{ user.username }}</span>
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
export default {
    data(){
        return {
            user: {
                username: 'admin'
            }
        }
    },
  methods: {
      logout(){
        return false;
      }
  }
};
</script>