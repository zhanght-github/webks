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
    <p class="food-text">酒菜名称：</p>
    <Input class="input-style" v-model="food.foodname" size="large" placeholder="名称"></Input><br>
    <p class="food-text">价格：</p>
    <Input class="input-style" v-model="food.foodprice" size="large" placeholder="价格"></Input>

     <Button style="font-size:18px" type="success" @click='addfood'>添加</Button>
    </div>

</template>

<script>
export default {
  data() {
    //全局需要用的变量
    return {
      //酒菜信息
      food: {
        foodid: 0,
        foodname: "",
        foodprice: ""
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  //加载此.vue先加载的方法
  created() {
  
  },
  methods: {
    //提交数据的方法
    addfood() {
      this.$http.post("/apis/setting/addfood", this.food).then(response => {
        //消息提醒结算结果
        this.$Notice.open({
          title: "消息提醒",
          desc: response.data.message,
          duration: 1
        });

        this.food.foodname = undefined;
        this.food.foodprice = undefined;
      });
    }
  }
};
</script>

