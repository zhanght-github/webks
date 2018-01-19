<style scoped>
  .startIndex {
    height: 100% !important;
    width: 100%;
  }
  .startIndex  .navbar {
      height: 100%;
    }
</style>
<template>
  <Row class="startIndex">
    <Col span="4" style="height:100%">
    <Menu active-name="staffinfo" @on-select="onItemClick" :accordion="true"
     theme="light" class="navbar">
      <MenuItem name="staffinfo">
        <Icon type="gear-a"></Icon>
        员工信息
      </MenuItem>
      <MenuItem name="roleset">
        <Icon type="ios-home"></Icon>
        权限管理
      </MenuItem>
    </Menu>
    </Col>
    <Col span="20" style="height:100%">
    <router-view ></router-view>
    </Col>
  </Row>
</template>
<script>
  export default {
    components: {},
    data() {
      return {};
    },
    beforeRouteEnter(to, from, next) {
      next();
    },
    mounted() {
        this.$router.push({
          path: '/fzgl/staffinfo'
        });
    },
    methods: {

      onItemClick(name) {
        this.$router.push({
          path: '/fzgl/' + name
        });
      }
    }
  };
</script>