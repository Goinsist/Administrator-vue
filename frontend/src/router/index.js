import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home.vue';

// 登录
import Login from '@/components/login.vue'




Vue.use(Router);


export default new Router({
  routes: [
    {path:'/',component: Login},

    { path: '/home',component: Home},


  ]
})
