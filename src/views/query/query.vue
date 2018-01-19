
<style scoped>
.date-control {
  text-align: center;
  margin-bottom: 50px;
}
</style>

<template>
<div>
    <div class="date-control">
        <DatePicker
        @on-ok="handleOk" 
        @on-change="handleChange"
        type="datetimerange" 
        :value="datevalue" 
        confirm 
        placement="bottom-end" 
        placeholder="Select date" 
        style="width: 420px"></DatePicker>
    </div>
     <Table width="80%" height="500" stripe :columns="tablecolumns" :data="tabledata"></Table>
</div>

</template>
<script>
export default {
  data() {
    return {
      resData: [],
      datevalue: [],
      tablecolumns: [
        {
          title: "订单编号",
          key: "orderid"
        },
        {
          title: "员工编号",
          key: "staffid"
        },
        {
          title: "订单金额",
          key: "ordermoney"
        },
        {
          title: "房间号",
          key: "roomid"
        },
        {
          title: "订单时间",
          key: "createdate"
        }
      ],
      tabledata: [
        // {
        //   name: "John Brown",
        //   age: 18,
        //   address: "New York No. 1 Lake Park",
        //   date: "2016-10-03"
        // },
        // {
        //   name: "Jim Green",
        //   age: 24,
        //   address: "London No. 1 Lake Park",
        //   date: "2016-10-01"
        // },
        // {
        //   name: "Joe Black",
        //   age: 30,
        //   address: "Sydney No. 1 Lake Park",
        //   date: "2016-10-02"
        // },
        // {
        //   name: "Jon Snow",
        //   age: 26,
        //   address: "Ottawa No. 2 Lake Park",
        //   date: "2016-10-04"
        // }
      ]
    };
  },
  methods: {
    handleOk() {
      this.$http
        .get(
          "/apis/query/queryorder?startdate=" +
            this.datevalue[0] +
            "&enddate=" +
            this.datevalue[1]
        )
        .then(response => {
             this.tabledata = [];
          //消息提醒结算结果
           if (response.data.status == "FAILURE") {
            this.$Notice.open({
              title: "消息提醒",
              desc: response.data.message,
              duration: 1
            });
           
           } else {
            this.tabledata = eval('(' + response.data.data + ')');
           }
        });
    },
    handleChange(date) {
      this.datevalue = date;
    }
  }
};
</script>