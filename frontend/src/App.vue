<template>

    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>

</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style >
  html{
    height:100%;
  }
  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    height: 100%;
  }

</style>
