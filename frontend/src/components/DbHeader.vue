<template>
    <header style="background-color: #545c64;">

           <div class="text-logo" >{{msg}}<p class="meta">用于管理校园商铺头条图片，商店权限等</p></div>


    </header>

</template>

<script>
    export default {
        name: 'db-header',
        data () {
            return {
                msg: '校园商铺超级管理员'
            }
        }
    }
</script>

<style scoped>
    header {
        height: 70px;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        padding: 0 20px;
        z-index: 1;
        box-sizing: border-box;

    }

    .text-logo {
        display: inline-block;
        vertical-align: middle;
        border-style: none;
        position: relative;
        top: 16px;
        right: -20px;
        font-size: 25px;
        color: white;

    }

    .meta {
        color: #7e95c5;
        width: 300px;
        display: block;
        margin: -20px 0 0 255px;
        font-weight: 700;
        font-size: 0.3rem;
    }

</style>
