<template>
  <div class="profile_page">
    <head-top go-back='true' :head-title="profiletitle"></head-top>
    <section>
      <section class="profile-number">
        <!--<router-link :to="userInfo? '/profile/info' : '/login'" class="profile-link">-->

        <!--<div  class="profile-link" @click="profileLink">-->
        <div  class="profile-link">
          <img :src="avatar" class="privateImage" v-if="userToken">
          <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>

          <div class="user-info">
            <p>{{username}}</p>
          </div>

          <!--<span class="arrow">-->
          <!--<svg class="arrow-svg" fill="#fff">-->
          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
          <!--</svg>-->
          <!--</span>-->
        </div>
        <!--</router-link>-->
      </section>

      <div class="user-order-box">
        <dl @click="allOrder">
          <dt>
            <strong>全部订单</strong>
            <span>查看全部订单</span>
          </dt>
        </dl>
        <ul>
          <li @click="allOrder">
            <div class="user_order">
              <i class="iconfont">&#xe605;</i>
            </div>
            <span>待付款</span>
          </li>
          <li @click="allOrder">
            <div class="user_order">
              <i class="iconfont">&#xe61f;</i>
            </div>
            <span>待发货</span>
          </li>
          <li @click="allOrder">
            <div class="user_order">
              <i class="iconfont">&#xe70b;</i>
            </div>
            <span>待收货</span>
          </li>
        </ul>
      </div>


      <!--zx我的订单-->
      <section class="profile-1reTe">

        <!-- 我的订单 -->
        <!--<router-link to='/order' class="myorder">-->
        <!--<aside>-->
        <!--<svg fill="#4aa5f0">-->
        <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>-->
        <!--</svg>-->
        <!--</aside>-->
        <!--<div class="myorder-div">-->
        <!--<span>我的订单</span>-->
        <!--<span class="myorder-divsvg">-->
        <!--<svg fill="#bbb">-->
        <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
        <!--</svg>-->
        <!--</span>-->
        <!--</div>-->
        <!--</router-link>-->
        <!-- 优惠券 -->

        <li class="myorder">
          <aside>
            <svg fill="#fc7b53">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>优惠券</span>
            <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
          </div>
        </li>


        <!-- 收货地址 -->

        <router-link to="/profile/info/address" tag="li" class="myorder">
          <aside>
            <svg fill="#fc7b53">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>收货地址</span>
            <span class="myorder-divsvg">
                    <svg fill="#bbb">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                  </span>
          </div>
        </router-link>



        <!-- 联系客服 -->
        <router-link to='/service' class="myorder">
          <aside>
            <svg fill="#fc7b53">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>联系客服</span>
            <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
          </div>
        </router-link>
      </section>

      <!--<section class="profile-1reTe">-->
      <!--&lt;!&ndash; 服务中心 &ndash;&gt;-->
      <!--<router-link to='/service' class="myorder">-->
      <!--<aside>-->
      <!--<svg fill="#4aa5f0">-->
      <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>-->
      <!--</svg>-->
      <!--</aside>-->
      <!--<div class="myorder-div">-->
      <!--<span>服务中心</span>-->
      <!--<span class="myorder-divsvg">-->
      <!--<svg fill="#bbb">-->
      <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
      <!--</svg>-->
      <!--</span>-->
      <!--</div>-->
      <!--</router-link>-->
      <!--&lt;!&ndash; 下载饿了么APP &ndash;&gt;-->
      <!--<router-link to='/download' class="myorder">-->
      <!--<aside>-->
      <!--<svg fill="#3cabff">-->
      <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>-->
      <!--</svg>-->
      <!--</aside>-->
      <!--<div class="myorder-div" style="border-bottom:0;">-->
      <!--<span>下载饿了么APP</span>-->
      <!--<span class="myorder-divsvg">-->
      <!--<svg fill="#bbb">-->
      <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
      <!--</svg>-->
      <!--</span>-->
      <!--</div>-->
      <!--</router-link>-->
      <!--</section>-->

    </section>
    <foot-guide></foot-guide>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import {mapState, mapMutations} from 'vuex'
  import {imgBaseUrl} from 'src/config/env'
  import {getImgPath} from 'src/components/common/mixin'
  import Request from '../../service/api'
  export default {
    data(){
      return{
        profiletitle: '我的',
        username: '登录/注册',    //用户名
        avatar: '',              //头像地址
        imgBaseUrl,
        token:null,
      }
    },
    mounted(){
      if(!(this.userInfo)){
        this.initData();
      }else {
        this.userData();
      }
    },
    mixins: [getImgPath],
    components:{
      headTop,
      footGuide,
    },
    created(){
//      this.token = this.$route.query.token;
      this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhdHpjbCIsImlhdCI6MTUwODI1Mzk3NiwibmJmIjoxNTA4MjUzOTc2LCJleHAiOjE1MDgyNjExNzYsInJlZl90dGwiOjE1MTAwNjgzNzYsInN1YiI6eyJpZCI6NCwib3BlbmlkIjoib0RRU1kwb2sydnh2YzlCVml5TEFiTW1aU1ZEQSIsIm5pY2tuYW1lIjoiXHU1ZWI3XHU1ZmQ3XHU3OTY1Iiwic2V4IjoxLCJwcm92aW5jZSI6Ilx1NWU3Zlx1NGUxYyIsImNpdHkiOiJcdTRmNWJcdTVjNzEiLCJoZWFkaW1ndXJsIjoiaHR0cDpcL1wvd3gucWxvZ28uY25cL21tb3BlblwvdmlfMzJcL0RZQUlPZ3E4M2VxbkZDQXhLcUVpYTFhd2xWREJib3FsQmlhZG9iVFJqSG41SEFBdkNKYzB6Sm5nSU9WVDI1SG1WUUlyelNpYTBEdzVNcFZ0bTg3Z281S3VBXC8wIiwibWVtYmVyIjpudWxsfX0.E3M7iXplGr-Z9RCVTUrqWSuKYTe7O8oSs47N3NBWz_AdLCLdcdvhEKeRG9KsZUfV_q6337p6LtLPJJqC_MKZ8cOLrOKgsUiFqZ0ex26HJInXMO0gvkR-2kXmhNGwD84Mq8_0d1q_svo-j7ALKwdipwQU_iapXQFfFSxEbXsZFmI";
    },
    computed:{
      ...mapState([
        'userInfo',
        'token',
        'userToken'
      ]),
      //后台会返回两种头像地址格式，分别处理
//        imgpath:function () {
//            let path;
//            if(this.avatar.indexOf('/') !==-1){
//                path = imgBaseUrl +　this.avatar;
//            }else{
//                path = this.getImgPath(this.avatar)
//            }
//            this.SAVE_AVANDER(path);
//            return path;
//        }
    },
    methods:{
      ...mapMutations([
        'RECORD_USERINFO','RECORD_USERTOKEN','RECORD_WETOKEN','SAVE_AVANDER'
      ]),
      async initData(){
        // 对授权的token进行验证
        //        alert(this.token);
        Request.Post('check_token', {token:this.token })
          .then((res) => {
//              console.log(res);
            if(res.msg === 'Ok'){
              this.userTkoen = this.token;
              this.RECORD_USERINFO(res.data);
              this.RECORD_USERTOKEN(this.userTkoen);
//                console.log(res.data);
              this.avatar = res.data.headimgurl;
              this.username = res.data.nickname;
            }else {
              console.log("======token验证失败======")
            }
          });
      },
      userData(){
        this.avatar = this.userInfo.headimgurl;
        this.username = this.userInfo.nickname;
      },
//        profileLink(){
//          if (this.userToken) {
//            this.$router.push('/profile/info');
//          }else{
//            window.location.href='https://master.fstuis.com/api/v1/oauth/oauth_call?url_call=' + encodeURIComponent('?#/register');
//          }
//        },
      allOrder(){
        if (this.userToken) {
          this.$router.push('/order');
        }else{
          alert("用户没登录");
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .profile_page{
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  }
  .profile-number{
    padding-top:1.95rem;
  .profile-link{
    display:block;
    display:flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background:$blue;
    padding: .666667rem .6rem;
  .privateImage{
    display:inline-block;
  @include wh(2.5rem,2.5rem);
    border-radius:50%;
    vertical-align:middle;
  .privateImage-svg{
    background:$fc;
    border-radius:50%;
  @include wh(2.5rem,2.5rem);
  }
  }
  .user-info{
    margin-left:.48rem;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  p{
    font-weight:700;
  @include sc(.8rem,$fc);
  .user-icon{
  @include wh(0.5rem,0.75rem);
    display:inline-block;
    vertical-align:middle;
    line-height:0.75rem;
  .icon-mobile{
  @include wh(100%,100%);
  }
  }
  .icon-mobile-number{
    display:inline-block;
  @include sc(.57333rem,$fc);
  }
  }
  }
  .arrow{
  @include wh(.46667rem,.98rem);
    display:inline-block;
  svg{
  @include wh(100%,100%);
  }
  }
  }
  }
  .info-data{
    width:100%;
    background:$fc;
    box-sizing: border-box;
  ul{
  .info-data-link{
    float:left;
    width:33.33%;
    display:inline-block;
    border-right:1px solid #f1f1f1;
  span{
    display:block;
    width:100%;
    text-align:center;
  }
  .info-data-top{
  @include sc(.55rem,#333);
    padding: .853333rem 0 .453333rem;
  b{
    display:inline-block;
  @include sc(1.2rem,#f90);
    font-weight:700;
    line-height:1rem;
    font-family: Helvetica Neue,Tahoma;
  }
  }
  .info-data-bottom{
  @include sc(.57333rem,#666);
    font-weight:400;
    padding-bottom:.453333rem;
  }
  }
  .info-data-link:nth-of-type(2){
  .info-data-top{
  b{
    color:#ff5f3e;
  }
  }
  }
  .info-data-link:nth-of-type(3){
    border:0;
  .info-data-top{
  b{
    color:#6ac20b;
  }
  }
  }
  }
  }
  .profile-1reTe{
    margin-top:.4rem;
    background:$fc;
  .myorder{
    padding-left:1.6rem;
    display:flex;
    align-items: center;
  aside{
  @include wh(.7rem,.7rem);
    margin-left:-.866667rem;
    margin-right:.266667rem;
    display:flex;
    align-items: center;
  svg{
  @include wh(100%,100%);
  }
  }
  .myorder-div{
    width:100%;
    border-bottom:1px solid #f1f1f1;
    padding:.433333rem .266667rem .433333rem 0;
  @include sc(.7rem,#333);
    display:flex;
    justify-content:space-between;
  span{
    display:block;
  }
  .myorder-divsvg{
  @include wh(.46667rem,.466667rem);
  svg{
  @include wh(100%,100%);
  }
  }
  }
  }
  .myorder:nth-of-type(3) .myorder-div{
    border:0;
  }
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  /*用户中心首页-我的订单模块*/
  .user-order-box{ width:100%; background:#fff; overflow:hidden;margin-top:10px; position:relative;}
  .user-order-box dl{ width:100%; height:50px; line-height:50px; position:relative;}
  .user-order-box dl dt{ width:100%;}
  .user-order-box dl dt strong{display: block;float: left;font-size:16px;color: #222;font-weight: normal;margin-left: 3%;}
  .user-order-box dl dt span{ display:block;float: right;background-size: auto 18px;padding-right: 15px;font-size: 14px;color: #999;margin-right: 10px;}
  .user-order-box ul{ width:100%; height:75px; padding:10px 0; border-top:1px solid #e4e4e4}
  .user-order-box ul li{ width:33%; float:left;}
  .user-order-box ul li .user_order{width: 35px;margin: auto;position: relative;}
  .user-order-box ul li .user_order i{position: relative;display: block;width: 35px;height: 35px; line-height:35px;margin: auto;color:#999; font-size:1.2em; text-align:center;}
  .user-order-box ul li .user_order em{display: block;min-width:15px;height: 15px;position: absolute;font-size:0.5rem;line-height: 15px;text-align: center;border-radius: 50%; top:2px;right:-2px;color: #fff;vertical-align:middle;}
  .user-order-box ul li span {display: block;width: 50px; height:20px;margin: auto;font-size: 14px;line-height:20px;color: #222;text-align: center;}
</style>
