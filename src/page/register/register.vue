<template>
  <div class="loginContainer">
    <head-top :head-title="'注册'" goBack="true">
      <!-- <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div> -->
    </head-top>
    <form class="loginForm">
      <section class="input_container phone_number">
        <input type="text" placeholder="输入手机号码" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
        <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>

      <section class="input_container">
        <input v-if="!showPassword" type="password" placeholder="密码"  v-model="passWord">
        <input v-else type="text" placeholder="密码"  v-model="passWord">
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
          <!--<span>abc</span>-->
          <!--<span>...</span>-->
        </div>
      </section>


      <section class="input_container">
        <input v-if="!showPassword2" type="password" placeholder="重复密码"  v-model="repassWord">
        <input v-else type="text" placeholder="重复密码"  v-model="repassWord">
        <div class="button_switch" :class="{change_to_text: showPassword2}">
          <div class="circel_button" :class="{trans_to_right: showPassword2}" @click="changePassWordType2"></div>
          <!--<span>abc</span>-->
          <!--<span>...</span>-->
        </div>
      </section>

      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>

    </form>

    <p class="login_tips">
      <!--温馨提示：未注册过的账号，登录时将自动注册-->
    </p>
    <p class="login_tips">
      <!--注册过的用户可凭账号密码登录-->
    </p>
    <div class="login_container" @click="mobileLogin">登录</div>
    <router-link to="/login" class="to_forget"  >已有账号？立刻登录</router-link>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import alertTip from '../../components/common/alertTip'
  import {localapi, proapi, imgBaseUrl} from 'src/config/env'
  import {mapState, mapMutations} from 'vuex'
  import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData'
  import Request from '../../service/api'
  export default {
    data(){
      return {
        loginWay: true, //登录方式，默认短信登录
        showPassword: false, // 是否显示密码
        showPassword2: false, // 是否显示密码
        phoneNumber: null, //电话号码
        mobileCode: null, //短信验证码
        validate_token: null, //获取短信时返回的验证值，登录时需要
        computedTime: 0, //倒数记时
        userInfo: null, //获取到的用户信息
        UserInfo:null,
        userAccount: null, //用户名
        passWord: null, //密码
        repassWord: null,
        captchaCodeImg: null, //验证码地址
        codeNumber: null, //验证码
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        token:null,
      }
    },
    created(){
                this.token = this.$route.query.token;

      //        自动添加问号(?)
      //        自动把分隔符由#!变成#
      //        分隔符后面，自动判断是否为斜杠(/)，没有则添加上
//                let paths = window.location.href.split('#')
//                paths[1] = paths[1] || '/'
//                // 老式的#!分隔跳转
//                if (paths[0].charAt(paths[0].length - 1) !== '?') {
//                  paths[0] = `${paths[0]}?`
//                }
//                if (paths[1].charAt(0) === '!') {
//                  paths[1] = paths[1].substr(1)
//                }
//                let url = `${paths[0]}#${paths[1]}`
//                if (window.location.href !== url) {
//          //            window.location.replace(url);
//                  window.location.href = url
//                }
      //        唯一不好的是会对页面进行强行刷新，该代码放在页面渲染完后，所有的数据set进本地缓存，确保数据能加载

                this.initData();

    },
    components: {
      headTop,
      alertTip,
    },
    computed: {
      //判断手机号码
      rightPhoneNumber: function (){
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO','RECORD_USERTOKEN','RECORD_WETOKEN'
      ]),

      async initData(){
        // 对授权的token进行验证
//        alert(this.token);
        Request.Post('check_token', {token:this.token })
          .then((res) => {
//          console.log(res);
            if(res.msg == 'Ok'){
              this.userTkoen = this.token;
              this.RECORD_USERTOKEN(this.userTkoen);
              this.$router.push('/profile');
            }else {
              this.RECORD_WETOKEN(this.token);
            }
          })
      },

      //改变登录方式
//      changeLoginWay(){
//        this.loginWay = !this.loginWay;
//      },
      //是否显示密码
      changePassWordType(){
        this.showPassword = !this.showPassword;
      },

      changePassWordType2(){
        this.showPassword2 = !this.showPassword2
      },

      //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
//      async getCaptchaCode(){
//        let res = await getcaptchas();
//        this.captchaCodeImg = res.code;
//      },

      //获取短信验证码
      async getVerifyCode(){
        if (this.rightPhoneNumber) {
          this.computedTime = 30;
          this.timer = setInterval(() => {
            this.computedTime --;
            if (this.computedTime == 0) {
              clearInterval(this.timer)
            }
          }, 1000)

          //判读用户是否存在
//          let exsis = await checkExsis(this.phoneNumber, 'mobile');
//          if (exsis.message) {
//            this.showAlert = true;
//            this.alertText = exsis.message;
//            return
//          }else if(!exsis.is_exists) {
//            this.showAlert = true;
//            this.alertText = '您输入的手机号尚未绑定';
//            return
//          }



          //发送短信验证码

//          console.log(this.phoneNumber);

          Request.Post('reg_sms', {phone:this.phoneNumber})
            .then((res) => {
//              console.log(res)

            })


//          let res = await mobileCode(this.phoneNumber);
//          if (res.message) {
//            this.showAlert = true;
//            this.alertText = res.message;
//            return
//          }
//          this.validate_token = res.validate_token;



        }
      },
      //发送登录信息
      async mobileLogin(){
          if (!this.rightPhoneNumber) {
            this.showAlert = true;
            this.alertText = '手机号码不正确';
            return
          }else if(!this.passWord){
            this.showAlert = true;
            this.alertText = '请输入密码';
            return
          }else if(!this.repassWord){
            this.showAlert = true;
            this.alertText = '重复密码错误';
            return
          }else if(!this.mobileCode){
            this.showAlert = true;
            this.alertText = '短信验证码不能为空';
            return
          }
          //手机号登录

//        console.log(this.phoneNumber,this.passWord,this.repassWord,this.mobileCode);

        Request.Post('reg', {username:this.phoneNumber,password:this.passWord,repassword:this.repassWord,sms_code:this.mobileCode,token:this.token})
          .then((res) => {
//            console.log(res)
            alert(res.msg);
            if(res.code === 200){
              this.$router.push('/login');
            }else {
              this.showAlert = true;
              this.alertText = res.msg;
            }

          })

//          this.userInfo = await sendLogin(:this.mobileCode, this.phoneNumber, this.validate_token);

        //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
//        if (!this.userInfo.user_id) {
//          this.showAlert = true;
//          this.alertText = this.userInfo.message;
//          if (!this.loginWay) this.getCaptchaCode();
//        }else{
//          this.RECORD_USERINFO(this.userInfo);
//          this.$router.go(-1);
//        }
      },
      closeTip(){
        this.showAlert = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .loginContainer{
    padding-top: 1.95rem;
    p, span, input{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .change_login{
    position: absolute;
    @include ct;
    right: 0.75rem;
    @include sc(.7rem, #fff);
  }
  .loginForm{
    background-color: #fff;
    margin-top: .6rem;
    .input_container{
      display: flex;
      justify-content: space-between;
      padding: .6rem .8rem;
      border-bottom: 1px solid #f1f1f1;
      input{
        @include sc(.7rem, #666);
      }
      button{
        @include sc(.65rem, #fff);
        font-family: Helvetica Neue,Tahoma,Arial;
        padding: .28rem .4rem;
        border: 1px;
        border-radius: 0.15rem;
      }
      .right_phone_number{
        background-color: #4cd964;
      }
    }
    .phone_number{
      padding: .3rem .8rem;
    }
    .captcha_code_container{
      height: 2.2rem;
      .img_change_img{
        display: flex;
        align-items: center;
        img{
          @include wh(3.5rem, 1.5rem);
          margin-right: .2rem;
        }
        .change_img{
          display: flex;
          flex-direction: 'column';
          flex-wrap: wrap;
          width: 2rem;
          justify-content: center;
          p{
            @include sc(.55rem, #666);
          }
          p:nth-of-type(2){
            color: #3b95e9;
            margin-top: .2rem;
          }
        }
      }
    }
  }
  .login_tips{
    @include sc(.5rem, red);
    padding: .4rem .6rem;
    line-height: .5rem;
    a{
      color: #3b95e9;
    }
  }
  .login_container{
    margin: 0 .5rem 1rem;
    @include sc(.7rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }
  .button_switch{
    background-color: #ccc;
    display: flex;
    justify-content: center;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    .circel_button{
      transition: all .3s;
      position: absolute;
      top: -0.2rem;
      z-index: 1;
      left: -0.3rem;
      @include wh(1.2rem, 1.2rem);
      box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
      background-color: #f1f1f1;
      border-radius: 50%;
    }
    .trans_to_right{
      transform: translateX(1.3rem);
    }
    span{
      @include sc(.45rem, #fff);
      transform: translateY(.05rem);
      line-height: .6rem;
    }
    span:nth-of-type(2){
      transform: translateY(-.08rem);
    }
  }
  .change_to_text{
    background-color: #4cd964;
  }
  .to_forget{
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
  }
</style>
