
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
  name: 'hello',
  data () {
    return {
      roomdata:'',
      chartXdata: [],
      chartYdata: []
    }
  },
  mounted(){
      this.getRoomData();
  },
  methods: {
      getRoomData(){
           //提交数据的方法
      this.$http.get("/apis/analyse/analysebyroom").then(response => {
       if (response.data.status != 'FAILURE') {
           //json字符串转json对象
            this.roomdata = eval('(' + response.data.data + ')');

       for(let i=0;i<this.roomdata.length;i++){

           if(this.roomdata[i].roomid == 0){
               this.chartXdata[i] = this.roomdata[i].roomid+"号大堂";
           }else{
               this.chartXdata[i] = this.roomdata[i].roomid+"号雅间"
           }
           this.chartYdata[i] = this.roomdata[i].roommoney;

       }
       }
 // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '房台分析' },
            tooltip: {},
            xAxis: {
                 data:this.chartXdata
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: this.chartYdata
            }]
        });

      });
      }
  }
}
</script>

