import Vue from 'vue'
import Router from 'vue-router'



// 注册
import Register from '@/view/register'
// 登录
import Login from '@/view/login'
// 首页内容
import Hello from '@/view/home_content/hello'
// 个人信息
import Personal from '@/view/information/personal'



Vue.use(Router)


export default new Router({
  routes: [
    {path:'/',component: Login},
    { path: '/register',component: Register},
    { path: '/home',component: Home,name:'',
        children:[
            {path:'personal',component: Personal ,name:'个人信息'},
            {path:'hello',component: Hello ,name:'子首页'},
            {path:'Inquiry',component: Inquiry,name:'问诊' },
            {path:'Noinquiry',component: InquiryNone,name:'无问诊' },
            {path: 'arrange',component: Arrange,name:'排班',
                children:[
                   {path:'new_add_work',component: AddWork}
                ]
            },
            {path:'members',component: members,name:'会员',
                children:[
                  {path:'mem_package',component: mem_package,name:'会员套餐'},
                  {path:'account',component: account,name:'会员帐号'},
                  {path:'integral',component: integral,name:'会员积分'},
                  {path:'style',component: style,name:'会员类型'},
                  {path: '/', redirect: 'account' }//在子路由定向到account
                ]
            },
            {path:'project',component: project,name:'项目',
                children:[
                  {path:'smallproject',component: smallproject,name:'子项目'},
                  {path:'package',component: Package,name:'套餐'},
                  {path:'registration',component: registration,name:'挂号费'},
                  {path: '/', redirect: 'smallproject' }//在子路由定向到smallproject
                ]
            },
            {path:'reservation',component: Reservation,name:'预约',
                children:[
                  {path:'Mrliu',component: Mrliu,name:'今日预约',
                      children:[
                        {path:'Visdoctor',component: Visdoctor,name:'出诊医生'},
                        {path:'liuContent',component: LiuContent,name:'刘医生'},
                        {path: '/', redirect: 'Visdoctor' }
                      ]

                  },
                  {path:'Vdetails',component: Vdetails,name:'详情页'},
                  {path: '/', redirect: 'Mrliu' },
                  {path: 'appointreport', component: Appointreport,name:'预约报备' }
                ]
            },

        ]
}
  ]
})
