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
    <Menu active-name="yjfx" @on-select="onItemClick" :accordion="true"
     theme="light" class="navbar">
      <MenuItem name="yjfx">
        <Icon type="gear-a"></Icon>
        业绩分析
      </MenuItem>
      <MenuItem name="ftfx">
        <Icon type="ios-home"></Icon>
        房台分析
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
          path: '/yyfx/yjfx'
        });
    },
    methods: {

      onItemClick(name) {
        this.$router.push({
          path: '/yyfx/' + name
        });
      }
    }
  };
</script>