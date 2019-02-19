<template>

  <li  class="el-menu-item is-active el-icon-picture" style="">{{rotationChart}}</li>


</template>

<script>

    export default {
        name: 'db-sidebar',
        data() {
            return {
              rotationChart:'   首页轮播图管理',

            }
        }
    }

</script>

<style scoped>
    li {
        padding-left: 10px;
    }
</style>
