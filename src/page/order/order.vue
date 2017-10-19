<template>


  <div class="order_page">
    <head-top head-title="订单列表" go-back='true'></head-top>


    <div class="order-box">

      <ul class="order-list-top" ref="chooseOrder">
        <li>
          <span :class='{ordero_on: changeShowType =="order_all"}' @click="changeShowType='order_all'">全部</span>
        </li>
        <li>
          <span :class='{ordero_on: changeShowType =="order_unpayed"}' @click="changeShowType='order_unpayed'">待付款</span>
        </li>
        <li>
          <span :class='{ordero_on: changeShowType =="order_unshipped"}' @click="changeShowType='order_unshipped'">待发货</span>
        </li>
        <li>
          <span :class='{ordero_on: changeShowType =="order_shipped"}' @click="changeShowType='order_shipped'">已收货</span>
        </li>
      </ul>

      <transition name="fade-choose">
        <section v-show="changeShowType =='order_all'" class="order-center-content">
          <ul class="order_list_ul" v-load-more="loaderMore">
            <li class="order_list_li" v-for="item in orderList" :key="item.id" style="display: flex;flex-direction:column" @click="showDetail(item.id)">
              <ul class="order_list_ul" >
                <li class="order_list_li2" v-for="goods in item.goods" :key="item.id">
                <span>
                  <img :src="goods.thumb" class="restaurant_image">
                </span>
                  <section class="order_item_right">
                      <header class="order_item_right_header">
                        <section class="order_header">
                          <h4>
                            <span class="ellipsis">{{goods.name}}</span>
                          </h4>
                        </section>
                        <!--<p class="order_status">-->
                          <!--交易成功-->
                        <!--</p>-->
                      </header>
                      <section class="order_basket">
                        <div>
                          <p class="order_name ellipsis">{{goods.outline}}</p>
                        </div>
                      </section>
                  </section>
                </li>
              </ul>
              <section class="order_item_bottom">
                  <section class="order_basket">
                    <p class="order_amount" style="float: right">¥{{item.real_payment}}</p>
                  </section>
              </section>

            </li>
          </ul>

          <!--<div class="no-data-div" >-->
          <!--<div class="no-data-img">-->
          <!--<img src="../../images/bg_empty_list.png">-->
          <!--</div>-->
          <!--<dl>-->
          <!--<dt>您还没有相关的订单</dt>-->
          <!--<dd>可以去看看哪些想买的</dd>-->
          <!--</dl>-->
          <!--<router-link to="/msite">-->
          <!--<p class="no-data-btn">立即去购买</p>-->
          <!--</router-link>-->
          <!--</div>-->

        </section>
      </transition>


      <transition name="fade-choose">
        <section v-show="changeShowType =='order_unpayed'" class="order-center-content">
          <ul class="order_list_ul" v-load-more="loaderMore">
            <li class="order_list_li" v-for="item in unpaidList" :key="item.id" style="display: flex;flex-direction:column" @click="showDetail(item.id)">
              <ul class="order_list_ul" >
                <li class="order_list_li2" v-for="goods in item.goods" :key="item.id">
                <span>
                  <img :src="goods.thumb" class="restaurant_image">
                </span>
                  <section class="order_item_right">
                    <header class="order_item_right_header">
                      <section class="order_header">
                        <h4>
                          <span class="ellipsis">{{goods.name}}</span>
                        </h4>
                      </section>
                      <!--<p class="order_status">-->
                      <!--交易成功-->
                      <!--</p>-->
                    </header>
                    <section class="order_basket">
                      <div>
                        <p class="order_name ellipsis">{{goods.outline}}</p>
                      </div>
                    </section>
                  </section>
                </li>
              </ul>
              <section class="order_item_bottom">
                <section class="order_basket">
                  <p class="order_amount" style="float: right">¥{{item.real_payment}}</p>
                </section>
              </section>

            </li>
          </ul>


          <!--<div class="no-data-div" v-else>-->
          <!--<div class="no-data-img">-->
          <!--<img src="../../images/bg_empty_list.png">-->
          <!--</div>-->
          <!--<dl>-->
          <!--<dt>您还没有相关的订单</dt>-->
          <!--<dd>可以去看看哪些想买的</dd>-->
          <!--</dl>-->
          <!--<router-link to="/msite">-->
          <!--<p class="no-data-btn">立即去购买</p>-->
          <!--</router-link>-->
          <!--</div>-->
        </section>
      </transition>


      <transition name="fade-choose">
        <section v-show="changeShowType =='order_unshipped'" class="order-center-content">
          <ul class="order_list_ul" v-load-more="loaderMore">
            <li class="order_list_li" v-for="item in unfilledList" :key="item.id" style="display: flex;flex-direction:column" @click="showDetail(item.id)">
              <ul class="order_list_ul" >
                <li class="order_list_li2" v-for="goods in item.goods" :key="item.id">
                <span>
                  <img :src="goods.thumb" class="restaurant_image">
                </span>
                  <section class="order_item_right">
                    <header class="order_item_right_header">
                      <section class="order_header">
                        <h4>
                          <span class="ellipsis">{{goods.name}}</span>
                        </h4>
                      </section>
                      <!--<p class="order_status">-->
                      <!--交易成功-->
                      <!--</p>-->
                    </header>
                    <section class="order_basket">
                      <div>
                        <p class="order_name ellipsis">{{goods.outline}}</p>
                      </div>
                    </section>
                  </section>
                </li>
              </ul>
              <section class="order_item_bottom">
                <section class="order_basket">
                  <p class="order_amount" style="float: right">¥{{item.real_payment}}</p>
                </section>
              </section>

            </li>
          </ul>

          <!--<div class="no-data-div" v-else>-->
          <!--<div class="no-data-img">-->
          <!--<img src="../../images/bg_empty_list.png">-->
          <!--</div>-->
          <!--<dl>-->
          <!--<dt>您还没有相关的订单</dt>-->
          <!--<dd>可以去看看哪些想买的</dd>-->
          <!--</dl>-->
          <!--<router-link to="/msite">-->
          <!--<p class="no-data-btn">立即去购买</p>-->
          <!--</router-link>-->
          <!--</div>-->
        </section>
      </transition>


      <transition name="fade-choose">
        <section v-show="changeShowType =='order_shipped'" class="order-center-content">
          <ul class="order_list_ul" v-load-more="loaderMore">
            <li class="order_list_li" v-for="item in confirmList" :key="item.id" style="display: flex;flex-direction:column" @click="showDetail(item.id)">
              <ul class="order_list_ul" >
                <li class="order_list_li2" v-for="goods in item.goods" :key="item.id">
                <span>
                  <img :src="goods.thumb" class="restaurant_image">
                </span>
                  <section class="order_item_right">
                    <header class="order_item_right_header">
                      <section class="order_header">
                        <h4>
                          <span class="ellipsis">{{goods.name}}</span>
                        </h4>
                      </section>
                      <!--<p class="order_status">-->
                      <!--交易成功-->
                      <!--</p>-->
                    </header>
                    <section class="order_basket">
                      <div>
                        <p class="order_name ellipsis">{{goods.outline}}</p>
                      </div>
                    </section>
                  </section>
                </li>
              </ul>
              <section class="order_item_bottom">
                <section class="order_basket">
                  <p class="order_amount" style="float: right">¥{{item.real_payment}}</p>
                </section>
              </section>

            </li>
          </ul>


          <!--<div class="no-data-div" v-else>-->
          <!--<div class="no-data-img">-->
          <!--<img src="../../images/bg_empty_list.png">-->
          <!--</div>-->
          <!--<dl>-->
          <!--<dt>您还没有相关的订单</dt>-->
          <!--<dd>可以去看看哪些想买的</dd>-->
          <!--</dl>-->
          <!--<router-link to="/msite">-->
          <!--<p class="no-data-btn">立即去购买</p>-->
          <!--</router-link>-->
          <!--</div>-->

        </section>
      </transition>


    </div>

    <foot-guide></foot-guide>
    <!--<transition name="loading">-->
      <!--<loading v-show="showLoading"></loading>-->
    <!--</transition>-->
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import headTop from 'src/components/header/head'
  import computeTime from 'src/components/common/computeTime'
  import loading from 'src/components/common/loading'
  import {getImgPath} from 'src/components/common/mixin'
  import footGuide from 'src/components/footer/footGuide'
//  import {getOrderList,listOrder} from 'src/service/getData'
  import {loadMore} from 'src/components/common/mixin'
  import {imgBaseUrl} from 'src/config/env'
  import Request from '../../service/api'
  export default {
    data(){
      return{
        orderList: null, //订单列表
        offset: 0,
        changeShowType: 'order_all',
        preventRepeat: false,  //防止重复获取
        showLoading: false, //显示加载动画
        imgBaseUrl,
        current:1,
        size:50,
        unpaidList:null,
        unfilledList:null,
        confirmList:null

      }
    },
    created(){
      this.changeShowType = this.$route.query.changeShowType;
      if (!(this.userToken)) {
        window.location.href='https://master.fstuis.com/api/v1/oauth/oauth_call?url_call=' + encodeURIComponent('?#/profile');
      }
    },
    mounted(){
      this.initData();
    },
    mixins: [loadMore],
    components: {
      headTop,
      footGuide,
      loading,
      computeTime,
    },
    computed: {
      ...mapState([
        'userInfo','userToken'
      ]),
    },
    methods: {
      ...mapMutations([
        'SAVE_ORDER'
      ]),
      //初始化获取信息
      async initData(){
        if (this.userToken) {
//          console.log(this.userToken);
          Request.Get('order', {current:this.current, size:this.size,token:this.userToken,})
            .then((res) => {
              this.orderList = res.data;
//              console.log(this.orderList);
            });

          Request.Get('order', {current:this.current, size:this.size,token:this.userToken,query:"unpaid"})
            .then((res) => {
              this.unpaidList = res.data;
//              console.log(this.unpaidList);
            });

          Request.Get('order', {current:this.current, size:this.size,token:this.userToken,query:"unfilled"})
            .then((res) => {
              this.unfilledList = res.data;
//              console.log(this.unfilledList);
            });

          Request.Get('order', {current:this.current, size:this.size,token:this.userToken,query:"confirm"})
            .then((res) => {
              this.confirmList = res.data;
//              console.log(this.unfilledList);
            });

        }else{
          this.hideLoading();
        }
      },
      //加载更多
      async loaderMore(){
        if (this.preventRepeat) {
          return
        }
        this.preventRepeat = true;
        this.showLoading = true;
        this.offset += 10;
        //获取信息
        let res = await getOrderList(this.userInfo.user_id, this.offset);
        this.orderList = [...this.orderList, ...res];
        this.hideLoading();
        if (res.length < 10) {
          return
        }
        this.preventRepeat = false;
      },
      //显示详情页
      showDetail(item){
        this.SAVE_ORDER(item);
        this.preventRepeat = false;
        this.$router.push('/balance');
        console.log(item);
      },
      //生产环境与发布环境隐藏loading方式不同
      hideLoading(){
        this.showLoading = false;
      },
    },
    watch: {
      userInfo: function (value) {
        if (value && value.user_id && !this.orderList) {
          this.initData();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .order_page{
    /*background-color: #f1f1f1;*/
    margin-bottom: 1.95rem;
    p, span, h4{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .order_list_ul{
    /*padding-top: 1.95rem;*/
    .order_list_li{
      background-color: #fff;
      display: flex;
      margin-bottom: 0.5rem;
      /*padding: .6rem .6rem 0;*/
      .restaurant_image{
        @include wh(3rem, 3rem);
        margin-right: 0.4rem;
      }
      .order_item_right{
        flex: 5;
        .order_item_right_header{
          border-bottom: 0.025rem solid #f5f5f5;
          padding-bottom: .3rem;
          @include fj;
          .order_header{
            h4{
              display: flex;
              align-items: center;
              justify-content: flex-start;
              @include sc(.75rem, #333);
              line-height: 1rem;
              width: 9rem;
              .arrow_right{
                @include wh(.4rem, .4rem);
                fill: #ccc;
                margin-right: .2rem;
              }
            }
            .order_time{
              @include sc(.55rem, #999);
              line-height: .8rem;
            }
          }
          .order_status{
            @include sc(.6rem, #333);
          }
        }
        .order_basket{
          @include fj;
          line-height: 2rem;
          border-bottom: 0.025rem solid #f5f5f5;
          .order_name{
            @include sc(.6rem, #666);
            width: 10rem;
          }
          .order_amount{
            @include sc(.6rem, #f60);
            font-weight: bold;
          }
        }
        .order_again{
          text-align: right;
          line-height: 1.6rem;
          .buy_again{
            @include sc(.55rem, #3190e8);
            border: 0.025rem solid #3190e8;
            padding: .1rem .2rem;
            border-radius: .15rem;
          }
        }
      }
    }
  }
  .loading-enter-active, .loading-leave-active {
    transition: opacity .7s
  }
  .loading-enter, .loading-leave-active {
    opacity: 0
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .order-box{margin-top: 1.95rem;}
  .order-list-top{ width:100%; height:45px; background:#FFF;border-bottom:1px solid #EEE;}
  .order-list-top li{ width:25%; float:left; height:45px; text-align:center;}
  .order-together-group .order-list-top li{ width:25%;}
  .order-list-top li span{ display:inline-block; margin:auto;text-align:center; font-size:0.6rem; line-height:43px; color:#222}
  .order-list-top li .ordero_on{border-bottom:2px solid #fd5138;}
  .order-center-content{ width:100%; overflow:hidden; margin-top:0.4rem;}
  .no-data-div{ width:90%; margin:0rem auto 0; text-align:center;}
  .no-data-div .no-data-icon { height: 5rem;width: 5rem;line-height: 12rem;text-align: center;display: block;background: #DFE0E8;border-radius: 100%;margin: 0 auto;}
  .no-data-div .no-data-img { margin: 0 auto; }
  .no-data-div .no-data-icon i { display: block; color: #fff; line-height:5rem; font-size:3rem; }
  .no-data-div dl { margin: 0.15rem auto; text-align:center; }
  .no-data-div dl dt { display: block; color: #777; font-size: .8rem}
  .no-data-div dl dd { display: block; margin-bottom: 0.15rem;  color: #999; font-size: .6rem}
  .no-data-div .no-data-btn { background: #f23030; display:block !important; margin: 1rem auto 0 auto; color: #fff !important; line-height: 1.5rem; text-align: center;border-radius: 0.15rem; height: 1.5rem;width: 6rem;font-size: 0.7rem ;}
  .no-data-div .no-data-img img {
    height: 6.5rem;
  }

  .order_item_bottom{
    width: 100%;
    .order_basket{
      line-height: 2rem;
      /*border-bottom: 0.025rem solid #f5f5f5;*/
      .order_name{
        @include sc(.6rem, #666);
        width: 10rem;
      }
      .order_amount{
        @include sc(.6rem, #f60);
        font-weight: bold;
        padding: 0 1.3rem;
      }
    }
  }
  .order_list_li2{
    background-color: #fff;
    display: flex;
    margin-bottom: 0.5rem;
    padding: .6rem 1.3rem 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .fade-choose-enter-active, .fade-choose-leave-active {
    transition: opacity .5s;
  }
  .fade-choose-leave, .fade-choose-leave-active {
    display: none;
  }
  .fade-choose-enter, .fade-choose-leave-active {
    opacity: 0;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .toggle-cart-enter-active, .toggle-cart-leave-active {
    transition: all .3s ease-out;
  }
  .toggle-cart-enter, .toggle-cart-leave-active {
    transform: translateY(100%);
  }
</style>
