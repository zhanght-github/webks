<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  width: 80%;
  margin-left: 8%;
  margin-bottom: 30px;
  font-size: 19px;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}
.column {
  width: 25%;
}
.item-wrapper {
  float: left;
  width: 80%;
  font-size: 19px;
}
.totalnum {
width: 60%;
padding-left: 45%;
  float: left;
}
.totalprice{
  float: left;
  margin-right: 50px;
}
td,
th {
  font-size: 1em;
  border: 1px solid #98bf21;
  padding: 3px 7px 2px 7px;
  text-align: center;
}
th {
  font-size: 1.1em;
  padding-top: 5px;
  padding-bottom: 4px;
  background-color: #a7c942;
  color: #ffffff;
}

/* hidestate是false时不隐藏按钮 */
.hiddren {
  display: none;
}
</style>
<template>
        <div>
            <table  class="table">
                <thead>
                    <tr>
                        <th class="column head">序号</th>
                        <th class="column head" >菜名</th>
                        <th class="column head">单价(/元)</th>
                        <th class="column head">操作(/份数)</th>
                    </tr>
                </thead>
                  <tbody>
                    <tr v-for ="(item,index) in this.datas">
                      <td>{{index+1}}</td>
                      <td>{{item.foodname}}</td>
                      <td>{{item.foodprice}}元</td>
                      <td><input style="width:50px;" type="text"  id="name" v-model="item.buynum"/>份</td>
                      <td ><Button :class="{ hiddren : !hidestate}" style="width:50px" type="info" v-on:click="reset(index)">重置</button></td>
                    </tr>
                    <!-- <tr>
                      <td></td>
                      <td><input type="text"  id="name" v-model="user.name"/></td>
                      <td><input type="text" id="age"v-model="user.age"/></td>
                      <td><input type="text" id="school"v-model="user.school"/></td>
                      <td><button @click="insert">insert</button></td>
                    </tr> -->
                </tbody>
            </table>

        <div class="item-wrapper">
          
            <div class='totalnum'>
                总数：
                <strong>{{totalNum}}份</strong>
            </div>
            <div class='totalprice'>
                总价：
                <strong>{{totalPrice}}元</strong>
            </div>
            房间号：
                 <Select v-model="roomid" style="width:100px">
        <Option v-for="item in rooms" :value="item.roomid" :key="item.roomid">{{ item.roomid }}号{{ item.roomname }}</Option>
    </Select>
         
        </div>
        <Button :class="{ hiddren : hidestate}" style="font-size:18px" type="success" @click='paySelect'>结算</Button>
         <Button style="font-size:18px" type="warning" @click='isOk'>下单</Button>
        </div>

</template>

<script>

import { setCookie,getCookie } from '../../js/cookie'
export default {
  name: "hello",
  data() {
    //全局需要用的变量
    return {
      //订单信息
      order:{"orderid": '',"staffid": '', "ordermoney": '', "roomid": '',"createdate":''},
      //是否隐藏某些按钮
      hidestate: false,
      rooms: [],
      //房间号
      roomid: 0,
      //总价
      totalPrice: 0,
      //存放获取到的数据
      datas: [],
      //总数
      totalNum: 0,
    };
  },

   mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.order.staffid = uname;
        },
  beforeRouteEnter(to, from, next) {
    next();
  },
  //加载此.vue先加载的方法
  created() {
    this.getData();
    this.getroom();
  },
  methods: {
    //获取数据的方法
    getData() {
      this.$http.get("/apis/food/getfoods").then(response => {
        if(response.data.status == "OK"){
          this.datas = JSON.parse(response.data.data);
        }else{
 //消息提醒结算结果
        this.$Notice.open({
          title: "消息提醒",
          desc: response.data.message,
          duration: 2
        });
        }
       
      });
    },

    getroom(){
      this.$http.get("/apis/room/getroom").then(response => {
        
       if(response.data.status == "OK"){
          this.rooms = JSON.parse(response.data.data);
        }else{
 //消息提醒结算结果
        this.$Notice.open({
          title: "消息提醒",
          desc: response.data.message,
          duration: 2
        });
        }
       
      });
    },

    //每一行重置的方法
    reset(index) {
      this.totalPrice = 0;
      this.totalNum = 0;
      this.datas[index].buynum = undefined;
      this.hidestate = false;
    },
    //结算
    paySelect() {
      for (let i = 0; i < this.datas.length; i++) {
        if (this.datas[i].buynum != undefined) {
          this.totalPrice +=
            parseInt(this.datas[i].foodprice) * parseInt(this.datas[i].buynum);
          this.totalNum += parseInt(this.datas[i].buynum);
        }

        this.hidestate = true;
      }
    },
    //下单
    isOk() {
      //这个orderid必须要有，要不然后端转不成order对象，数据库把orderid设成自增长，这个0并不会存到库里，只为了orderid不为空。
      this.order.orderid = 0;
        this.order.ordermoney = this.totalPrice;
        this.order.roomid = this.roomid;
        this.order.createdate = new Date();
      this.$http.post("/apis/order/addorder",this.order).then(response => {
       this.noticeMessage = response.data.message;
       //消息提醒结算结果
       this.$Notice.open({
                    title: '消息提醒',
                    desc : response.data.message,
                    duration: 1
                });
      });
      //对表格的每一行进行数据重置
      for (let i = 0; i < this.datas.length; i++) {
        this.datas[i].buynum = undefined;
        this.totalNum = 0;
        this.totalPrice = 0;
        this.hidestate = false;
      }
    
      this.roomid = 0;
      
    }
  }
};
</script>

