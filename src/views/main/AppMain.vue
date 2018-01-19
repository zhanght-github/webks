<style>
.index {
  height: 100%;
}
.main {
  padding-top: 30px;
  height: 90%;
  background-color: white;
}
.layout-copy {
    text-align: center;
}
</style>
<template>
  <div class="index">
    <appHead :visible='false' />
    <div class="main" >
      <transition name="fade" mode="out-in">
        <router-view ></router-view>
      </transition>
    </div>
    <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
  </div>
</template>
<script>
import appHead from "./AppHead.vue";
export default {
  components: {
    appHead
  },
  data() {
    return {};
  },
  methods: {}
};
</script>