<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-content {
  margin: 0 20%;
}
.input-style {
  width: 300px;
}
.food-text {
  width: 200px;
  font-size: 17px;
}
</style>
<template>
    <div class="main-content">
    <p class="food-text">员工编号：</p>
    <Input class="input-style" v-model="user.userid" size="large" placeholder="编号"></Input><br>
     <Select v-model="user.userrole" style="width:300px">
        <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

     <Button style="font-size:18px" type="success" @click='roleset'>修改</Button>
    </div>

</template>

<script>

import { setCookie, getCookie } from "../../js/cookie";
export default {
  data() {
    //全局需要用的变量
    return {
      states: [
        {
          value: "p1",
          label: "p1、普通员工"
        },
        {
          value: "p2",
          label: "p2、高级员工"
        },
         {
          value: "p3",
          label: "p3、管理员"
        }
      ],
      user: {
        userid: "",
        userrole: ""
      },
      loginUsername:''
    };
  },
    mounted() {
    /*页面挂载获取cookie*/
    if(getCookie('username')){
        this.loginUsername = getCookie('username');
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  //加载此.vue先加载的方法
  created() {
  },
  methods: {
    //提交数据的方法
    roleset() {
      this.$http.get("/apis/user/setuserrole?loginusername="+this.loginUsername+"&userid="+this.user.userid+"&role="+this.user.userrole).then(response => {
        //消息提醒结算结果
        this.$Notice.open({
          title: "消息提醒",
          desc: response.data.message,
          duration: 3
        });

        this.user.userid = undefined;
        this.user.userrole = undefined;
      });
    }
  }
};
</script>

