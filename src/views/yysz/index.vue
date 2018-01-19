<style>
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
    <Menu active-name="food" @on-select="onItemClick" :accordion="true"
     theme="light" class="navbar">
      <MenuItem name="food">
        <Icon type="gear-a"></Icon>
        酒菜设置
      </MenuItem>
      <MenuItem name="room">
        <Icon type="ios-home"></Icon>
        房间设置
      </MenuItem>
      <MenuItem name="paystyle">
        <Icon type="card"></Icon>
        付款方式
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
          path: '/yysz/food'
        });
    },
    methods: {

      onItemClick(name) {
        this.$router.push({
          path: '/yysz/' + name
        });
      }
    }
  };
</script>