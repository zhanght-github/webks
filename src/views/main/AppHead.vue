<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  float: right;
  width: 220px;
  margin: 0 auto;
}
.layout-assistant {
  float: left;
  width: 600px;
  margin: 0 50px;
  height: inherit;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" @on-select='signSelect'>
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="0">
                    <Icon type="ios-navigate"></Icon>
                   {{username}}
                </MenuItem>
                <MenuItem name="1">
                    <Icon type="ios-keypad"></Icon>
                    退出
                </MenuItem>
            </div>
        </Menu>
        <Menu mode="horizontal" active-name="0"  @on-select='onNavSelect'>
            <div class="layout-assistant">
                <MenuItem name="0">前台营业</MenuItem>
                <MenuItem name="1">营业设置</MenuItem>
                <MenuItem name="2">营业分析</MenuItem>
                <MenuItem name="3">订单查询</MenuItem>
                <MenuItem name="4">辅助管理</MenuItem>
            </div>
        </Menu>
    </div>
</template>
<script>
/*引入公共方法*/
import { setCookie,getCookie,delCookie } from '../../js/cookie'
export default {
  name: "AppHead",
  data() {
    return {
        username: ''
    };
  },
  mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.username = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.push('/login')
            }
        },
  methods: {
    onNavSelect(name) {
      var navRouters = this.$router.options.routes[1].children;
      var router = navRouters[parseInt(name)];
      this.$router.push({ path: "/" + router.path });
    },
    signSelect(name){
        if(parseInt(name) == 1){
            delCookie('username');
            this.$router.push({ path: "/login"});
        } 
    }
  }
};
</script>