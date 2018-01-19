
<style scoped>
#myChart{
    margin-left: 10%;
}
</style>

<template>
  <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      staffdata: "",
      chartXdata: [],
      chartYdata: []
    };
  },
  mounted() {
    this.getRoomData();
  },
  methods: {
    getRoomData() {
      //提交数据的方法
      this.$http.get("/apis/analyse/analysebystaff").then(response => {
        if (response.data.status != "FAILURE") {
          //json字符串转json对象
          this.staffdata = eval("(" + response.data.data + ")");

          for (let i = 0; i < this.staffdata.length; i++) {
            this.chartXdata[i] = this.staffdata[i].staffid + "号员工";

            this.chartYdata[i] = this.staffdata[i].salemoney;
          }
        }
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: { text: "业绩分析" },
          tooltip: {},
          xAxis: {
            data: this.chartXdata
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: this.chartYdata
            }
          ]
        });
      });
    }
  }
};
</script>

