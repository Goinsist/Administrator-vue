<template>

	<div class="login">
    <div id="web_bg" ></div>
		<div class="login-container">

			<el-form :model="loginForm" :style="loginVisible"  status-icon :rules="loginRules" ref="loginForm" class="card-box login-form">
			    <h1 class="title">登 录</h1>
			    <el-form-item prop="email" class="item userItem" :label-width="formLabelWidth">

			    <el-input suffix-icon="el-icon-edit" auto-complete="off" name="userName" type="text" v-model="loginForm.email"  placeholder="邮箱" class="input-content"></el-input>
			    </el-form-item>
			    <el-form-item prop="password" class="item" :label-width="formLabelWidth">


             <el-input suffix-icon="el-icon-edit" name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="密码" class="input-content"></el-input>
			    </el-form-item>
<el-form-item :label-width="formLabel">
  <el-input suffix-icon="el-icon-edit" name="verify" type="text"  v-model="loginForm.verifyCode" placeholder="验证码" class="input-content"></el-input><img class="image" src="http://gongyu91.cn/o2o/images/captcha" />
</el-form-item>
			    <el-form-item>
			        <el-button type="primary" class="submit" @click="handleLogin">
			            确定
			        </el-button>
            <el-button type="primary" @click="handleRegist">
              注册
            </el-button>

			    </el-form-item>
			</el-form>
            <regist :formVisible="formVisible"></regist>
		</div>
		<router-view></router-view>
	</div>
</template>
<style scoped>
.input-content{
  margin-left: -180px;
  margin-top: 10px;
}
.login:hover{
  border-radius: 8px;
  -webkit-box-shadow: #ccc 0px 10px 10px;

  -moz-box-shadow: #ccc 0px 10px 10px;

  box-shadow: #ccc 0px 10px 10px;  }
  .title{
    font-size: 22px;
   font-family: 新宋体;
    margin-top: 90px;
  }
.image{
  margin-bottom: -15px;
}
.submit{
  margin-right: 50px;
}

  #web_bg{

    background-image: url("../assets/1550214272903.jpg");
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    min-width: 1000px;
    z-index:-10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }
	.login {
		position: relative;
		width: 600px;
		height: 550px;
		margin: 15% auto;
		background:#FCFCFC;

		text-align: center;
		border-radius: 1px;
	}
  .login-form{

 }

</style>
<script>
	import Home from '@/components/home.vue';
import Regist from './regist.vue';

export default{
  components:{Regist},
		// mounted:function(){
		// 	this.$http.get('../../static/login.json').then(function(response){
		// 		this.username=response.data;
		// 		console.log("数组",this.username);
		// 	});
		// },
		data(){
			var validateEmail=(rule, value, callback) =>{

				if(!value){
				return	callback(new Error("请输入邮箱!"));
				}
				else{
          if (value !== '') {
            var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!reg.test(value)) {
              callback(new Error('请输入有效的邮箱!'));
            }
            }else{
						callback();
					}
					// this.$http.get('../../static/login.json').then(function(response){
						// var flag=0;
						// for(let i=0;i<this.username.length;i++){
						// 	if(value === this.username[i].username){
						// 		flag=1;
						// 		this.loginForm.psw=this.username[i].password;
						// 		break;
						// 	}
						// }
						// if(flag !=1){
						// 	callback(new Error("用户名不存在"));
						// }
					// });
				}


			};
			var validatePass = (rule, value, callback) => {
	    	    if (value === '') {
	    	        callback(new Error('请输入密码'));
	    	    }
	    	    else if(value.length<6){
	    	        callback(new Error('密码不能少于6位'));
	    	    }
	    	    else if(value != "123456")
	    	    // else if(value != this.loginForm.psw){
	    	    	callback(new Error('密码错误'));
	    	    // }
	    	    else{
	    	    	callback();
	    	    }
    		};
			return{
			  loginVisible:'display:inline',
   formVisible:'display:none',
        formLabel:'246px',
        formLabelWidth:'180px',
				loginForm:{
          email:'',
          password:'',

        },
        username:[],
        loginRules:{
          email:[
            {validator: validateEmail, trigger: 'blur' }
          ],
          password:[
            {validator: validatePass, trigger: 'blur' }
          ]
        }
			};

		},
		methods:{
      handleRegist:function(){
        this.loginVisible='display:none';
        this.formVisible='display:inline';
      },
			handleLogin:function(){
				 this.$refs.loginForm.validate((valid) => {
		          	if (valid) {
		           		this.$router.push({ path: '/home',component:Home});
		       		} else {
		            	console.log('error submit!!');
		            	return false;
		        	}
		      	});
			}
		},
		mounted:function(){
	  	console.log("stor内容" );
	  }
	}
</script>
