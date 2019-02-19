<template>
  <el-form :model="registForm" :style="formVisible" status-icon :rules="registRules" ref="registForm" >
    <h1 class="title">注 册</h1>
    <el-form-item prop="rEmail"  :label-width="formLabelWidth">

      <el-input suffix-icon="el-icon-edit" auto-complete="off"  type="text" v-model="registForm.rEmail"  placeholder="邮箱" class="input-content" ></el-input>
    </el-form-item>
    <el-form-item prop="emailCode" :label-width="formLabel">
      <el-input suffix-icon="el-icon-edit" type="text"  v-model="registForm.emailCode" placeholder="验证码" class="input-content1"></el-input><el-button  @click="sendEmailCaptcha">发送邮箱验证码</el-button>
    </el-form-item>
    <el-form-item prop="rPassword"  :label-width="formLabelWidth">


      <el-input suffix-icon="el-icon-edit"  type="password" v-model="registForm.rPassword" placeholder="密码" class="input-content"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword"  :label-width="formLabelWidth">


      <el-input suffix-icon="el-icon-edit"  type="password" v-model="registForm.confirmPassword" placeholder="确认密码" class="input-content"></el-input>
    </el-form-item>
    <el-form-item prop="verifyCode" :label-width="formLabel">
      <el-input suffix-icon="el-icon-edit" name="verify" type="text"  v-model="registForm.verifyCode" placeholder="验证码" class="input-content"></el-input><img alt="点击更换" class="image" @click="changeVerifyCode" :src="imgSrc" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit">
        确定
      </el-button>


    </el-form-item>
  </el-form>

</template>
<style scoped>
  .input-content{
    margin-left: -180px;
    margin-top: 10px;
  }
  .input-content1{
    margin-left: -170px;
    margin-top: 10px;
  }
  .image{
    margin-bottom: -15px;
  }
  .title{
    font-size: 22px;
    font-family: 新宋体;

  }













</style>
<script>

  export default {
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
          callback(new Error('请输入密码!'));
        }
        else if(value.length<6){
          callback(new Error('密码不能少于6位!'));
        }
        else if(value != "123456")
        // else if(value != this.loginForm.psw){
          callback(new Error('密码错误'));
        // }
        else{
          callback();
        }
      };
      var validateConfirmPass=(rule,value,callback)=>{
        if(!value){
          callback(new Error('请输入确认密码!'));

        }else if(!(value===this.registForm.rPassword)){
         callback(new Error('两次输入密码不一致!'));
        }else {
          callback();
        }

      };
      var validateVerifyCode=(rule,value,callback)=>{
        if(!value){
          callback(new Error('请输入验证码!'));
        }else{
          callback();
        }
      };
     var validateEmailCode=(rule,value,callback)=>{
       if(!value){
         callback(new Error('请输入验证码!'));
       }else if(!(value===this.randNum)){
        callback(new Error('输入的验证码有误!'));
       }else{
         callback();
       }
     };
      return {
        imgSrc:'http://gongyu91.cn/o2o/images/captcha',
        formLabel: '246px',
        formLabelWidth: '180px',
       randNum:'',
        registForm: {
          rEmail: '',
          rPassword: '',
          confirmPassword:'',
          verifyCode:'',
        },

        registRules: {
          rEmail: [
            {validator: validateEmail, trigger: 'blur'},
          ],
          emailCode:[
            {validator:validateEmailCode,trigger:'blur'}
          ],
          rPassword:[
            {validator: validatePass, trigger: 'blur' }
          ],
          confirmPassword:[
            {validator:validateConfirmPass,trigger:'blur'}
          ],
          verifyCode:[
            {validator:validateVerifyCode,trigger:'blur'}
          ]
        }
      }

    },
    props:['formVisible'],

    methods: {
      sendEmailCaptcha:function(){
        this.$axios.get('http://47.99.54.87/o2o/email/emailcaptcha',{
          params:{
               email: this.registForm.rEmail
          }
        }).then((response)=>{
           this.randNum= response.data.randCaptcha;

        })
      },
      changeVerifyCode:function(){
    this.imgSrc='http://gongyu91.cn/o2o/images/captcha? '+Math.floor(Math.random()*100);
  }




    }
    }






</script>










