<template>
  <div class="confirmOrderContainer">
    <section v-if="!showLoading">
      <head-top head-title="确认订单" goBack="true" ></head-top>

      <router-link :to='{path: "/confirmOrder/chooseAddress"}' class="address_container">
        <div class="address_empty_left">
          <svg class="location_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <div class="add_address" v-if="!choosedAddress">请选择一个收货地址</div>
          <div v-else class="address_detail_container">
            <header>
              <span>{{choosedAddress.name}}</span>
              <span>{{choosedAddress.phone}}</span>
            </header>
            <div class="address_detail">
              <p>{{choosedAddress.address}}</p>
            </div>
          </div>
        </div>
        <svg class="address_empty_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <!--<section class="delivery_model container_style">
        <p class="deliver_text">送达时间</p>
        <section class="deliver_time">
          <p>尽快送达 | 预计 今天送达</p>-->
          <!--<p v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>-->
        <!--</section>
      </section>-->
      <section class="pay_way container_style">
        <header class="header_style">
          <span style="font-size:0.6rem;">支付方式</span>
          <div class="more_type" @click="showPayWayFun">
            <span>在线支付</span>
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </header>
        <!--<section class="hongbo">-->
          <!--<span>红包</span>-->
          <!--<span>暂时没开放</span>-->
        <!--</section>-->
      </section>
      <section class="food_list">
        <header >
          <span style="font-size:0.6rem;">商品信息</span>
        </header>
        <ul class="food_list_ul" >
          <li class="food_item_style" v-for="item in details">
            <img :src="item.thumb" style="width:2rem;height:2rem;" />
            <p class="food_name ellipsis">{{item.title}}</p>
            <div class="num_price">
              <span style="width:30px;">x {{item.num}}</span>
              <span style="width:60px;">¥ {{item.price}}</span>
            </div>
          </li>
        </ul>
        <!--<div class="food_item_style">-->
        <!--<div class="food_item_style" v-if="checkoutData.cart.extra">-->
        <!--<p class="food_name ellipsis">餐盒</p>-->
        <!--<div class="num_price">-->
        <!--<span></span>-->
        <!--<span>¥ 0</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="food_item_style">-->
        <!--<p class="food_name ellipsis">配送费</p>-->
        <!--<div class="num_price">-->
        <!--<span></span>-->
        <!--<span>¥ 0</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="food_item_style total_price">
          <p class="food_name ellipsis"></p>
          <div class="num_price">
            <span>支付 ¥{{totalPrice}}</span>
          </div>
        </div>-->
      </section>
      <section class="pay_way container_style">
        <router-link :to='{path: "/confirmOrder/remark"}' class="header_style">
          <span style="font-size:0.7rem;">订单备注</span>
          <div class="more_type">
            <span class="ellipsis">{{remarkText||inputText? remarklist: '口味、偏好等'}}</span>
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </router-link>
        <!--<router-link :to=" '/confirmOrder/invoice'" class="hongbo" >-->
          <!--<span>发票抬头</span>-->
          <!--<span>-->
                        <!--&lt;!&ndash;{{checkoutData.invoice.status_text}}&ndash;&gt;-->
                        <!--<svg class="address_empty_right">-->
                            <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>-->
                        <!--</svg>-->
                    <!--</span>-->
        <!--</router-link>-->
      </section>
      <section class="confrim_order">
        <p>共{{goodnums}}件&nbsp;<span style="color:#fd5138">¥{{totalPrice}}</span></p>
        <p @click="confrimOrder" id="confrimOrder" style="color:#fff;">支付订单</p>
      </section>
      <transition name="fade">
        <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
      </transition>
      <transition name="slid_up">
        <div class="choose_type_Container" v-if="showPayWay">
          <header>支付方式</header>
          <ul>
            <li  :class="{choose: payWayId == 1}">
              <span>在线支付</span>
              <svg class="address_empty_right">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
            </li>
            <li>
              <span>货到付款<span>（商家不支持货到付款）</span></span>
              <svg class="address_empty_right">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
            </li>
          </ul>
        </div>
      </transition>
    </section>
    <loading v-if="showLoading"></loading>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import headTop from 'src/components/header/head'
  import alertTip from 'src/components/common/alertTip'
  import loading from 'src/components/common/loading'
  import {imgBaseUrl} from 'src/config/env'
  import Request from '../../service/api'
  export default {
    data(){
      return {
        shopId: null, //商店id值
        showLoading: false, //显示加载动画
        checkoutData: null,//数据返回值
        showPayWay: false,//显示付款方式
        payWayId: 1, //付款方式
        showAlert: false, //弹出框
        alertText: null, //弹出框内容
        foodID: null,
        foodIndex: null,
        foodPrice: null,
        numCounter: null,
        title: null,
        orders:null,
        getaddress:[],
        current:1,
        size:15,
        appId:'',
        details:null,
        goodsOrder:null,
        totalPrice:0,
        goodnums:0,
      }
    },
    created(){
//        this.SAVE_SHOPID(this.shopId);
//        获取当前商铺购物车信息
//        this.shopCart = this.cartList[this.shopId];
      this.foodID = this.$route.query.foodID;
      this.foodIndex = this.$route.query.foodIndex;
      this.foodPrice = this.$route.query.foodPrice;
      this.numCounter = this.$route.query.numCounter;
      this.goodsOrder = this.$route.query.data;
      this.details=this.$route.query.details;

      let total = 0;
      let _goodnums = 0;
      var _this = this;
      this.details.forEach(function(good){
        total += good.price * good.num;
        _this.totalPrice = total;
        _goodnums ++;
      });
      this.goodnums = _goodnums;
      return total;

      if(!(this.userToken)) {
        window.location.href='https://master.fstuis.com/api/v1/oauth/oauth_call?url_call=' + encodeURIComponent('?#/profile');
      }
    },
    mounted(){
      //判断当前用户是否登录
      if (!(this.userToken)) {
        this.showAlert = true;
        this.alertText = '您还没有登录';
      }else {
        this.initAddress();
      }
//            this.$router.push('/login');
    },
    components: {
      headTop,
      alertTip,
      loading,
    },
    computed: {
      ...mapState([
        'cartList', 'remarkText', 'inputText', 'invoice', 'choosedAddress', 'userInfo','userToken','newAddress'
      ]),
      //备注页返回的信息进行处理
      remarklist: function (){
        return  this.inputText;
      },
    },
    methods: {
      ...mapMutations([
        'INIT_BUYCART', 'SAVE_GEOHASH', 'CHOOSE_ADDRESS', 'NEED_VALIDATION', 'SAVE_CART_ID_SIG', 'SAVE_ORDER_PARAM', 'ORDER_SUCCESS', 'SAVE_SHOPID'
      ]),
      //初始化数据
      async initAddress(){
        if (this.userToken) {
//            请求用户的收货地址
          Request.Get('address', {current:this.current,size:this.size,token:this.userToken})
            .then((res) => {
              this.getaddress= res.data;
              this.CHOOSE_ADDRESS({address: this.getaddress[0], index: 0});
            });
        }
      },
      //显示付款方式
      showPayWayFun(){
        this.showPayWay = !this.showPayWay;
      },
      //选择付款方式
//          choosePayWay(is_online_payment, id){
//            if (is_online_payment) {
//              this.showPayWay = !this.showPayWay;
//              this.payWayId = id;
//            }
//          },
//            确认订单
      async confrimOrder(){
        //用户未登录时弹出提示框
        if (!(this.userToken)) {
          this.showAlert = true;
          this.alertText = '请登录';
          return
          //未选择地址则提示
        } else if (!this.choosedAddress) {
          this.showAlert = true;
          this.alertText = '请添加一个收获地址';
          return
        }
//        else if(!this.foodID){
//          this.showAlert = true;
//          this.alertText = '订单信息有误，请返回重新下单';
//          return
//        }else if(!this.foodIndex){
//          this.showAlert = true;
//          this.alertText = '订单信息有误，请返回重新下单';
//          return
//        }else if(!this.foodPrice){
//          this.showAlert = true;
//          this.alertText = '订单信息有误，请返回重新下单';
//          return
//        }
        //保存订单
        this.SAVE_ORDER_PARAM({
          user_id: this.userToken,
          address_id: this.choosedAddress.id,
          description: this.remarklist,
          orders: {goods_id: this.foodID, sku_spec_id: this.foodIndex, num: this.numCounter},
        });
//            发送订单信息
        Request.Post('order', {token:this.userToken,address_id:this.choosedAddress.id,orders:this.goodsOrder,content:this.remarklist})
          .then((res) => {
            if(res.code === 200){
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest',JSON.parse(res.data.jsapi),
                function(result){
                  console.log(result);
                  if(result.err_msg == "get_brand_wcpay_request:ok" ) {
                  }else {
                  }
                }
              );
            }else if(res.code === 404){
              this.showAlert = true;
              this.alertText =res.msg;
            }
          });
      }
    },
    watch: {
      userInfo: function (value) {
        console.log(121212123123);
        if (value) {
          this.initAddress();
        }
      },

    newAddress: function (value) {
      this.initAddress();
    },

    },
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .confirmOrderContainer{
    padding-top: 1.95rem;
    padding-bottom: 3rem;
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  }
  .container_style{
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .7rem;
  }
  .address_container{
    min-height: 3.5rem;
  @include fj;
    align-items: center;
    padding: 0 0.6rem;
    background: url(../../images/address_bottom.png) left bottom repeat-x;
    background-color: #fff;
    background-size: auto .12rem;
  .address_empty_left{
    display: flex;
    align-items: center;
  .location_icon{
  @include wh(.8rem, .8rem);
    fill: $blue;
    margin-right: .2rem;
  }
  .add_address{
  @include sc(.7rem, #333);
  }
  .address_detail_container{
    margin-left: .2rem;
  header{
  @include sc(.65rem, #333);
  span:nth-of-type(1){
    font-size: .8rem;
    font-weight: bold;
  }
  }
  .address_detail{
    width: 100%;
    display: flex;
    align-items: center;
  span{
  @include sc(.5rem, #fff);
    border-radius: .15rem;
    background-color: #ff5722;
    height: .6rem;
    line-height: .6rem;
    padding: 0 .2rem;
    margin-right: .3rem;
  }
  p{
  @include sc(.55rem, #777);
  }
  }
  }
  }
  }
  .address_empty_right{
  @include wh(.6rem, .6rem);
    fill: #999;
  }
  .delivery_model{
    border-left: .2rem solid $blue;
    min-height: 4rem;
  @include fj;
    align-items: center;
  .deliver_text{
  @include sc(.8rem, #333);
    font-weight: bold;
    padding-left: .3rem;
  }
  .deliver_time{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  p:nth-of-type(1){
  @include sc(.7rem, $blue);
  }
  p:nth-of-type(2){
  @include sc(.5rem, #fff);
    background-color: $blue;
    width: 2.4rem;
    margin-top: .5rem;
    text-align: center;
    border-radius: 0.12rem;
    padding: .1rem;
  }
  }
  }
  .pay_way{
  .header_style{
  @include fj;
    line-height: 2rem;
  span:nth-of-type(1){
  @include sc(.7rem, #666);
  }
  .more_type{
  span:nth-of-type(1){
  @include sc(.6rem, #aaa);
    width: 10rem;
    display: inline-block;
    text-align: right;
    vertical-align: middle;
  }
  svg{
  @include wh(.5rem, .5rem);
    fill: #ccc;
  }
  }
  }
  .hongbo{
  @include fj;
    border-top: 0.025rem solid #f5f5f5;
  span{
  @include sc(.6rem, #aaa);
    line-height: 2rem;
  svg{
  @include wh(.5rem, .5rem);
    vertical-align: middle;
    fill: #ccc;
  }
  }
  span:nth-of-type(2){
    color: #aaa;
  }
  }
  .support_is_available{
  span{
    color: #666;
  }
  }
  }
  .food_list{
    background-color: #fff;
    margin-top: .4rem;
  header{
    padding: .7rem;
    border-bottom: 0.025rem solid #f5f5f5;
  img{
  @include wh(1.2rem, 1.2rem);
    vertical-align: middle;
  }
  span{
  @include sc(.8rem, #333);
  }
  }
  .food_list_ul{
    padding-top: .5rem;
  }
  .food_item_style{
  @include fj;
    line-height: 1.8rem;
    padding: 5px 0 5px 5px;
  span,p{
  @include sc(.65rem, #666);
  }
  .food_name{
    padding: 0 0 0 10px;
    width: 10rem;
  }
  .num_price{
    flex: 1;
  @include fj;
    /*align-items: center;*/
  span:nth-of-type(1){
    color: #f60;
  }
  }
  }
  .total_price{
    border-top: 0.025rem solid #f5f5f5;
  }
  }
  .confrim_order{
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2rem;
  p{
    line-height: 2rem;
  @include sc(.75rem, #000);
  }
  p:nth-of-type(1){
    background-color: #fff;
    flex: 5;
    padding-left: .7rem;
  }
  p:nth-of-type(2){
    flex: 2;
    background-color: #fd5138;
    text-align: center;
  }
  }
  .cover{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 203;
  }
  .choose_type_Container{
    min-height: 10rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 204;
  header{
    background-color: #fafafa;
  @include sc(.7rem, #333);
    text-align: center;
    line-height: 2rem;
  }
  ul{
  li{
  @include fj;
    padding: 0 .7rem;
    line-height: 2.5rem;
    align-items: center;
  span{
  @include sc(.7rem, #ccc);
  }
  svg{
  @include wh(.8rem, .8rem);
    fill: #eee;
  }
  }
  .choose{
  span{
    color: #333;
  }
  svg{
    fill: #4cd964;
  }
  }
  }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .slid_up-enter-active, .slid_up-leave-active {
    transition: all .3s;
  }
  .slid_up-enter, .slid_up-leave-active {
    transform: translate3d(0,10rem,0)
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
