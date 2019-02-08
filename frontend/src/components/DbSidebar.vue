<template>
<div>
    <li class="el-menu-item is-active" style="">{{rotationChart}}</li>
  <li class="el-menu-item is-active" style="">{{shopAuthority}}</li>
</div>
</template>

<script>

    export default {
        name: 'db-sidebar',
        data() {
            return {
              rotationChart:'首页图片管理',
                shopAuthority:'商铺审核'
            }
        }
    }

</script>

<style>
    li {
        padding-left: 10px;
    }
</style>
