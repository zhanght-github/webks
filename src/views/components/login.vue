<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
}
.dialog {
  width: 100%;
  height: 100%;
background: url(../../assets/background.png) no-repeat fixed center;
background-size: 100% 100%;
}
.loginPage {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -175px;
  width: 270px;
  min-height: 250px;
  padding: 30px 20px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fff;
}
.loginPage p {
  color: red;
  text-align: left;
}
</style>
<template>
<div class="dialog">
    <div class="loginPage">
        <p style="color:red" v-show="showTishi">{{tishi}}</p>
        <h1>登录</h1>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem><br>
        <FormItem>
            <Button style="margin-left:130px" type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
    </Form>
    </div>
    </div>
</template>
<script>
import { setCookie, getCookie } from "../../js/cookie";
export default {
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if(getCookie('username')){
        this.$router.push('/qtyy')
    }
  },
  data() {
    return {
      showTishi: false,
      tishi: "",
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 1,
            message: "密码长度不符合要求！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(formInline) {
      let username = this.formInline.user;
      let password = this.formInline.password;
      this.$http
        .post("/apis/user/login?username=" + username + "&password=" + password)
        .then(response => {
          if (response.data.status == "OK") {
            this.tishi = response.data.message;
            this.showTishi = true;
            setCookie("username", username, 1000 * 60);
            setTimeout(
              function() {
                this.$router.push("/qtyy");
              }.bind(this),
              1000
            );
          } else {
            this.showTishi = true;
            this.tishi = response.data.message;
          }
        });
    }
  }
};
</script>