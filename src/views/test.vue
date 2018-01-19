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
  padding-left: 60%;
  width: 70%;
  float: left;
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
                      <td>{{item.foodid}}</td>
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
        </div>
        <Button :class="{ hiddren : hidestate}" style="font-size:18px" type="success" @click='paySelect'>结算</Button>
         <Button style="font-size:18px" type="warning" @click='isOk'>下单</Button>
        </div>

</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      hidestate: false,
      totalPrice: 0,
      datas: [],
      totalNum: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  created() {
    this.getData();
  },
  methods: {
    // insert: function() {
    //   this.users.push(this.user);
    // },
    getData() {
      this.$http.get("/apis/food/getfoods").then(response => {
        this.datas = JSON.parse(response.data.data);
      });
    },
    reset(index) {
      //    this.totalPrice = this.totalPrice - parseInt(this.datas[index].foodprice)*parseInt(this.datas[index].buynum);
      // this.totalNum = this.totalNum - parseInt(this.datas[index].buynum);
      this.totalPrice = 0;
      this.totalNum = 0;
      this.datas[index].buynum = undefined;
      this.hidestate = false;
    },
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
    isOk() {
      for (let i = 0; i < this.datas.length; i++) {
        this.datas[i].buynum = undefined;
        this.totalNum = 0;
        this.totalPrice = 0;
        this.hidestate = false;
      }
    }
  }
};
</script>

