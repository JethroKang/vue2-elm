<template>
  <div class="order_detail_page">
    <head-top head-title="订单详情" go-back='true'></head-top>
    <section v-if="!showLoading" id="scroll_section" class="scroll_container">
      <section class="scroll_insert">
        <section class="order_titel">
          <p>{{orderData.order_no}}</p>
          <p>{{orderData.status}}</p>
        </section>
        <section class="food_list">
          <div class="food_list_header" @click="payOrder" >
            <div class="shop_name">
              <span>{{orderData.pay_status}}</span>
            </div>
            <svg fill="#333" class="arrow_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
          <ul class="food_list_ul">
            <li v-for="item in orderData.goods">
              <p class="food_name ellipsis">{{item.name}}</p>
              <div class="quantity_price">
                <span>X{{item.goods_num}}</span>
                <span>¥{{item.price}}</span>
              </div>
            </li>
          </ul>
          <div class="deliver_fee">
            <span>配送费</span>
            <span>{{orderData.shipping_price}}</span>
          </div>
          <div class="pay_ment">实付{{orderData.real_payment}}</div>
        </section>
        <section class="order_detail_style">
          <header>配送信息</header>
          <section class="item_style">
            <p class="item_left">送货地址：</p>
            <div class="item_right">
              <p>{{orderData.address.name}}</p>
              <p>{{orderData.address.phone}}</p>
              <p>{{orderData.address.province}}{{orderData.address.city}}{{orderData.address.area}}{{orderData.address.street}}{{orderData.address.address}}</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">配送方式：</p>
            <div class="item_right">
              <p>商家派送</p>
            </div>
          </section>
        </section>
        <section class="order_detail_style">
          <header>订单信息</header>
          <section class="item_style">
            <p class="item_left">订单号：</p>
            <div class="item_right">
              <p>{{orderData.order_no}}</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">支付方式：</p>
            <div class="item_right">
              <p>在线支付</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">下单时间：</p>
            <div class="item_right">
              <p>{{orderData.create_time}}</p>
            </div>
          </section>

        </section>

        <div class="determine" @click="addAddress" v-if="yiquxiao" >取消订单</div>
      </section>
    </section>
    <transition name="loading">
      <loading v-if="showLoading"></loading>
    </transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import headTop from 'src/components/header/head'
  import {getImgPath} from 'src/components/common/mixin'
  import loading from 'src/components/common/loading'
  import Request from 'src/service/api'
  import alertTip from 'src/components/common/alertTip'
  export default {
    data(){
      return{
        showLoading: true, //显示加载动画
        orderData: null,
        id:null,
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        yiquxiao:true
      }
    },
    mounted(){
      this.initData();
    },
    mixins: [getImgPath],
    components: {
      headTop,
      loading,
      alertTip,
    },
    computed: {
      ...mapState([
        'orderDetail', 'userInfo','userToken'
      ]),
    },
    methods: {
      async initData(){
        let id = this.orderDetail;
        if (this.userToken) {
          Request.Get('order/'+id, {token:this.userToken})
            .then((res) => {
              this.orderData = res.data;
              console.log(this.orderData);
              if(res.data.status === '已取消'){
                  this.yiquxiao = false
              }

            });
          this.showLoading = false;
        }
      },
      addAddress(){
        let id = this.orderDetail;
//        this.showAlert = true;
//        this.alertText ="取消订单成功";
        if (this.userToken) {
          Request.Put('cancel_order/'+id, {token:this.userToken})
            .then((res) => {
            console.log(res);
              if(res.code === 200){
                this.showAlert = true;
                this.alertText ="取消订单成功";
              }
            });
        }

      },


      payOrder(){
        if (this.userToken) {
          let id = this.orderDetail;
          Request.Post('order_afresh_pay/'+id, {token:this.userToken})
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

      closeTip(){
        this.showAlert = false;
        this.$router.go(-1);
      }


    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .order_detail_page{
    background-color: #f1f1f1;
    padding-top: 1.95rem;
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  }
  .scroll_container{
    height: 100%;
  }
  .scroll_insert{
    /*padding-bottom: 3rem;*/
  }
  .order_titel{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .7rem;
    background-color: #fff;
    margin-bottom: 0.5rem;
  img{
    border: 0.05rem solid $blue;
    border-radius: 50%;
  @include wh(3rem, 3rem);
  }

  p:nth-of-type(1){
  @include sc(.9rem, #333);
    font-weight: bold;
    margin-top: .4rem;
  }
  p:nth-of-type(2){
  @include sc(.55rem, #999);
    width: 10rem;
    margin-top: .3rem;
    text-align: center;
  }
  .order_again{
  @include sc(.6rem, $blue);
    margin-top: .5rem;
    border: 0.025rem solid $blue;
    padding: .15rem .4rem;
    border-radius: .1rem;
  }
  }
  .food_list{
    background-color: #fff;
  .food_list_header{
  @include fj;
    align-items: center;
    padding: .2rem .5rem;
    border-bottom: 1px solid #f5f5f5;
  .shop_name{
  img{
  @include wh(1.2rem, 1.2rem);
    vertical-align: middle;
    margin-right: .2rem;
  }
  span{
  @include sc(.75rem, #333);
    font-weight: bold;
  }
  }
  svg{
  @include wh(.6rem, .6rem);
    fill: #666;
  }
  }
  .food_list_ul{
  li{
  @include fj;
    align-items: center;
    padding: 0 .5rem;
    line-height: 2rem;
  .food_name{
  @include sc(.6rem, #666);
    flex: 4;
  }
  .quantity_price{
    flex: 1;
  @include fj;
    align-items: center;
  span:nth-of-type(1){
  @include sc(.6rem, #ccc);
  }
  span:nth-of-type(2){
  @include sc(.6rem, #666);
  }
  }
  }
  }
  .deliver_fee{
  @include fj;
    align-items: center;
    padding: 0 .5rem;
    line-height: 2rem;
    border-top: 1px solid #f5f5f5;
  span{
  @include sc(.6rem, #666);
  }
  }
  .pay_ment{
  @include sc(.6rem, #fb6b23);
    border-top: 1px solid #f5f5f5;
    font-weight: bold;
    line-height: 2rem;
    text-align: right;
    padding-right: .5rem;
  }
  }
  .order_detail_style{
    background-color: #fff;
    margin-top: 0.5rem;
  header{
  @include sc(.75rem, #333);
    padding: .5rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .item_style{
    display: flex;
    padding: .5rem;
  p{
  @include sc(.65rem, #666);
    line-height: 1rem;
  }
  }
  }
  .loading-enter-active, .loading-leave-active {
    transition: opacity .7s
  }
  .loading-enter, .loading-leave-active {
    opacity: 0
  }
  .determine{
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: .6rem;
  }
</style>
