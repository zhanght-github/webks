
<template>
    <Row :gutter="16">
        <Col span="6" v-for="(item, index) in items" v-bind:key="index">
            <div>
                <Card style="width:220px">
                    <div style="text-align:center">
                        <img src="../assets/logo.png">
                        <h3>{{ item.foodname}}</h3>
                        <h3 id="foodprice">{{ item.foodprice+"元"}}</h3>
                    </div>
                </Card>
            </div>
        </Col>
    </Row>
    
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/apis/food/getfoods").then(response => {
        this.items = JSON.parse(response.data.data); 
      });
    }
  }
};
</script>