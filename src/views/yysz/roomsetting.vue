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
    <p class="food-text">房间编号：</p>
    <Input class="input-style" v-model="room.roomid" size="large" placeholder="编号"></Input><br>
     <Select v-model="room.roomstate" style="width:300px">
        <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

     <Button style="font-size:18px" type="success" @click='roomset'>修改</Button>
    </div>

</template>

<script>
export default {
  data() {
    //全局需要用的变量
    return {
      states: [
        {
          value: "1",
          label: "1、可以使用"
        },
        {
          value: "0",
          label: "0、不可使用"
        }
      ],
      room: {
        roomid: "",
        roomstate: ""
      },
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
    roomset() {
      this.$http.post("/apis/setting/roomsetting", this.room).then(response => {
        //消息提醒结算结果
        this.$Notice.open({
          title: "消息提醒",
          desc: response.data.message,
          duration: 1
        });

        this.room.roomid = undefined;
        this.roomstate = undefined;
      });
    }
  }
};
</script>

