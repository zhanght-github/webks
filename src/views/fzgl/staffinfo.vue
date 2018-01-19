
<style scoped>
</style>

<template>
<div style="width:88%;margin-left:30px">
     <Table height="500" stripe :columns="tablecolumns" :data="tabledata"></Table>
</div>

</template>
<script>
export default {
  data() {
    return {
      tablecolumns: [
        {
          title: "员工编号",
          key: "userid"
        },
        {
          title: "员工名字",
          key: "username"
        },
        {
          title: "员工角色",
          key: "role"
        }
      ],
      tabledata: []
    };
  },
    created() {
    this.getAllUser();
  },
  methods: {
    getAllUser() {
      this.$http.get("/apis/user/getalluser")
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
  }
};
</script>