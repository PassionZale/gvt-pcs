<template>
<Sider :style="{position: 'fixed', height: '100vh',background:'#fff', left: 0, overflow: 'auto'}">
    <Menu width="200px" theme="light" :active-name="active_route_name" :style="{height: '100%'}">

        <!--控制台-->
        <router-link :to="{ path: '/' }" exact>
            <MenuItem name="home">
                <Icon type="home"></Icon>
                控制台
            </MenuItem>
        </router-link>

        <!--门店管理-->
        <MenuGroup title="门店管理">
            <router-link :to="{path: '/store'}">
                <MenuItem name="store">
                    <Icon type="ios-list"></Icon>
                    门店列表
                </MenuItem>
            </router-link>
        </MenuGroup>

        <!--仓库管理-->
        <MenuGroup title="仓库管理">
            <router-link :to="{path: '/warehouse'}">
                <MenuItem name="warehouse">
                    <Icon type="ios-list"></Icon>
                    仓库列表
                </MenuItem>
            </router-link>
        </MenuGroup>

        <!--采购管理-->
        <MenuGroup title="采购管理">
            <router-link :to="{path: '/purchase'}">
                <MenuItem name="purchase">
                    <Icon type="ios-list"></Icon>
                    采购列表
                </MenuItem>
            </router-link>
        </MenuGroup>

        <!--订单管理-->
        <MenuGroup title="订单管理">
            <router-link :to="{path: '/order'}">
                <MenuItem name="order">
                    <Icon type="ios-list"></Icon>
                    订单列表
                </MenuItem>
            </router-link>
        </MenuGroup>

        <!--系统管理-->
        <MenuGroup title="系统管理">
            <router-link :to="{path: '/system-param'}">
                <MenuItem name="system-param">
                    <Icon type="gear-a"></Icon>
                    系统参数
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/system-notify'}">
                <MenuItem name="system-notify">
                    <Icon type="android-warning"></Icon>
                    系统通知
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/system-address'}">
                <MenuItem name="system-address">
                    <Icon type="location"></Icon>
                    送货地址
                </MenuItem>
            </router-link>
            <router-link :to="{path: '/system-log'}">
                <MenuItem name="system-log">
                    <Icon type="ionic"></Icon>
                    系统日志
                </MenuItem>
            </router-link>
        </MenuGroup>

    </Menu>
</Sider>
</template>

<script>
export default {
  data() {
    return {
      active_route_name: ""
    };
  },
  created() {
    this.active_route_name = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.active_route_name = to.name;
    }
  }
};
</script>

<style lang="less">
// reset a tag's font color
.ivu-menu {
  a {
    color: #495060;
  }
}
</style>