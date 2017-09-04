<template>
  	<div class="paddingTop search_page">
        <head-top head-title="购物车" goBack="true"></head-top>




      <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="icon-add" viewBox="0 0 32 32">
            <title>add2</title>
            <path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
          </symbol>
          <symbol id="icon-ok" viewBox="0 0 39 32">
            <title>ok</title>
            <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
          </symbol>
          <symbol id="icon-edit" viewBox="0 0 32 32">
            <title>edit</title>
            <path class="path1" d="M25.599 11.292l-4.892-4.892 3.825-3.825 4.892 4.892-3.825 3.825zM4.732 23.308l3.959 3.959-5.939 1.98 1.98-5.939zM10.666 26.225l-4.892-4.892 13.425-13.425 4.892 4.892-13.425 13.425zM31.687 6.713l-6.4-6.4c-0.417-0.417-1.091-0.417-1.508 0l-20.267 20.267c-0.114 0.115-0.191 0.25-0.242 0.393-0.003 0.009-0.012 0.015-0.015 0.025l-3.2 9.6c-0.128 0.383-0.029 0.806 0.257 1.091 0.203 0.204 0.476 0.313 0.754 0.313 0.112 0 0.227-0.017 0.337-0.054l9.6-3.2c0.011-0.003 0.017-0.013 0.027-0.016 0.142-0.052 0.276-0.128 0.39-0.242l20.267-20.267c0.417-0.416 0.417-1.091 0-1.508v0z"></path>
          </symbol>
          <symbol id="icon-del" viewBox="0 0 26 32">
            <title>delete</title>
            <path class="path1" d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
          </symbol>
          <symbol id="icon-clock" viewBox="0 0 32 32">
            <title>clock</title>
            <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
          </symbol>
        </defs>
      </svg>


     <div v-if="shopCaft">
       <div class="shop-group-item">
         <ul>
           <li v-for="(item,index) in cartList">
             <div class="shop-info">
               <div class="shop-info-check">
                 <a href="javascript:void 0" class="item-check-btn"
                    v-bind:class="{check:item.isChecked}"
                    @click="selectGood(item)">
                   <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                 </a>
               </div>
               <!--<input type="checkbox" class="check goods-check goodsCheck">-->
               <div class="shop-info-img"><img :src="item.goods.thumb" /></div>

               <div class="shop-info-text">
                 <h4>{{item.goods.name}}</h4>
                 <div class="shop-brief"><span>{{item.sku_spec.key_name_arr}}</span></div>
                 <div class="shop-price">
                   <div class="shop-pices">￥<b class="price">{{item.sku_spec.price}}</b></div>
                   <div class="shop-arithmetic">
                     <a href="javascript:void 0" @click="changeQuentity(item,-1,index)" class="minus">+</a>
                     <input type="text" :value="item.num" disabled class="num">
                     <a href="javascript:void 0" @click="changeQuentity(item,1)" class="plus">-</a>
                   </div>
                 </div>
               </div>

               <div class="cart-item-opration">
                 <a href="javascript:void 0" class="item-edit-btn"
                    @click="delGood(item,index)">
                   <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                 </a>
               </div>

             </div>
           </li>

         </ul>
       </div>
       <div class="payment-bar">
         <div class="all-checkbox">
           <a href="javascript:void 0">
								<!--<span class="item-check-btn" :class="{check:isSelectAll}">-->
									<!--<svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>-->
								<!--</span>-->
             <span @click="selectAll" >全选</span>
             <span @click="unSelectAll">取消全选</span>
           </a>
         </div>
         <div class="shop-total">
           <strong>总价：<i class="total" id="AllTotal">{{totalPrice}}</i></strong>
         </div>
         <a href="#" class="settlement">结算</a>
       </div>
     </div>


      <div class="no-data-div" v-else>
        <div class="no-data-img">
          <img src="../../images/bg_empty_list.png">
        </div>
        <dl>
          <dt>您还没有登录</dt>
          <dd>可以去看看哪些想买的</dd>
        </dl>
        <router-link to="/login">
          <p class="no-data-btn">登录购买</p>
        </router-link>
        <foot-guide></foot-guide>
      </div>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchRestaurant} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
import {getStore, setStore} from '../../config/mUtils'
import Request from 'src/service/api'
import {mapState} from 'vuex'
import alertTip from '../../components/common/alertTip'

export default {
	data(){
        return {
            shopCaft:true,
            current:1,
            size:20,
            cartList:'',
            isSelectAll:false,//是否全选
            confirmDelete:false, //是否删除订单
        }
    },
    created(){

    },
    mounted(){
      this.initData();
      if (!(this.userInfo && this.userInfo.token)) {
            this.shopCaft = false;
      }

    },
    components:{
      headTop,
      footGuide,
      alertTip,
    },
    computed: {
      ...mapState([
        'userInfo',
      ]),
      totalPrice:function(){
        let total = 0;
        this.cartList.forEach(function(good){
//          console.log(good);

          if(good.isChecked){
            total += good.sku_spec.price * good.num;
          }
        });
        return total;
      },
//      filters:{
//        Currency:function(val){
//          return val + " 元";
//        },
//      }
    },
    methods:{

//    初始化时获取基本数据
      async initData(){

        //获取购物车列表
        Request.Get('cart',{current:this.current,size:this.size,token:this.userInfo.token})
          .then((res) => {
          console.log(res);
            this.cartList = res.data;
//           console.log(this.showCartList);
          })

      },

//    如果产品被选中，同时该产品没有"isChecked"属性，则为其添加该属性，并设为"true"
      selectGood:function(goodObj,index){

        console.log(goodObj);

        if(goodObj.isChecked == void 0){
          this.$set(goodObj,"isChecked",true)
        } else {
          goodObj.isChecked = !goodObj.isChecked;
        }
        this.isCheckAll();
      },

      isCheckAll:function(){
        let flag = true;
        this.cartList.forEach(function(good){
          if(!good.isChecked){
            flag = false;
          }
        });
        if(!flag){
          this.isSelectAll = false;
        } else {
          this.isSelectAll = true;
        }
      },

//    是否对商品进行全选

      selectAll:function(){
        this.isSelectAll = true;
        this.cartList.forEach((good)=>{
          good.isChecked = true;
          this.showAlert = true;
          this.alertText = '用户账号或者密码错误';
        });
      },

      unSelectAll:function(){
        this.isSelectAll = false;
        this.cartList.forEach((good)=>{
          good.isChecked = false;
        })
      },

//
      changeQuentity:function(good,val,_index){
        if(good.num == 1 && val == -1 ){

          this.confirmDelete = true;
          this.readyToDelIndex = _index;
        } else {
          good.num += val;
        }
      },




    }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .search_page{
        margin-bottom: 2rem;
    }
    .search_form{
        background-color: #fff;
        padding: 0.5rem;
        display: flex;
        input{
            height: 1.5rem;
        }
        .search_input{
            flex: 4;
            border: 0.025rem solid $bc;
            @include sc(0.65rem, #333);
            border-radius: 0.125rem;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.25rem;
        }
        .search_submit{
            flex: 1;
            border: 0.025rem solid $blue;
            margin-left: .2rem;
            @include sc(0.65rem, #fff);
            border-radius: 0.125rem;
            background-color: $blue;
            font-weight: bold;
            padding: 0 0.25rem;
        }
    }
    .title_restaurant{
        font-size: 0.6rem;
        line-height: 2rem;
        text-indent: 0.5rem;
        font-weight: bold;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: 'center';
        padding: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        .item_left{
            margin-right: 0.25rem;
            .restaurant_img{
                @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right{
            font-size: 0.55rem;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem solid $bc;
                p{
                    line-height: .9rem;
                }
                .pay_icon{
                    margin-bottom: -0.08rem;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem;
                li{
                    font-size: 0;
                    span{
                        font-size: .5rem;
                        vertical-align: middle;
                        display: inline-block;
                        margin-bottom: 0.2rem;
                    }
                    .activities_icon{
                        @include sc(.5rem, #fff);
                        font-weight: bold;
                        padding: .04rem;
                        border-radius: 0.15rem;
                        margin-right: 0.125rem;
                    }
                    .only_phone{
                        color: #FF6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.025rem solid $bc;
            @include font(0.7rem, 2rem);
            padding: 0 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
                @include wh(1rem, 1rem);
            }
        }
        .clear_history{
            background-color: #fff;
            color: $blue;
            @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
    }


    .shopping{clear:both;overflow:hidden;height:auto;padding-bottom: 60px;}
    .shop-group-item{margin-bottom:.05rem; background: #fff;}

    .shop-group-item ul li{border-bottom:1px solid #dcdcdc;}
    .shop-group-item ul li:last-child{border-bottom:none;}


    .shop-info{
      height:5rem;
      padding:0 .3rem;
      display: flex;

      .shop-info-check{
        width: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .item-check-btn{
          width: .9rem;
          height:.9rem;
          border: 1px solid #ccc;
          border-radius: 50%;
          cursor: pointer;
          .icon-ok {
            width: 100%;
            height: 100%;
            fill: #fff;
            -ms-transform: scale(0.8);
            transform: scale(0.8);
          }
          .check {
            background: #EE7A23;
            border-color: #EE7A23;
            /*.icon-ok {*/
              /*display: inline-block;*/
            /*}*/
          }
        }

      }

      .shop-info-img{
        width: 4rem;
        height: 4rem;
        overflow: hidden;
        margin-top: .5rem;
        margin-left: .5rem;
        margin-right: .5rem;

        img{
          width: 100%;
          height: 100%;
        }
      }

      .shop-info-text{
        padding: .6rem 0;
        width: 50%;
        h4{font-size:.6rem;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow: hidden;
        }
        .shop-brief{
          height:1rem;
          line-height:1rem;
          font-size:.4rem;
          color:#81838e;
          white-space:nowrap;
        }
        .shop-price{
          height:1.2rem;
          line-height:1.2rem;
          width: 50%;
          float: left;
          .shop-pices {
            color:red;
            font-size:.6rem;
          }
          .price{
            font-size: .6rem;
          }
        }
        .shop-arithmetic{
          box-sizing:border-box;
          white-space:nowrap;
          height:100%;
          width: 4.5rem;
          border:1px solid #e0e0e0;
          a{
            display:inline-block;
            width:1.2rem;
            height:.99rem;
            text-align:center;
            background:#fff;
            font-size:.6rem;
          }
          .minus{
            border-right:1px solid #e0e0e0;
          }
          .failed{
            color:#d1d1d1;
          }
          .plus{
            border-left:1px solid #e0e0e0;
          }
          .num{
            width:.6rem;
            text-align:center;
            border:none;
            display: inline-block;
            height:100%;
            box-sizing:border-box;
            vertical-align:top;
            margin:0 -6px;
            font-size: 0.6rem
          }
        }

      }

    }


    .shopPrice{background:#fff;height:35px;line-height:35px;padding:0 15px;text-align:right;}
    .shopPrice span{color:#f00; font-weight: bold;}
    .payment-bar{clear:both;overflow:hidden;width:100%;height:49px;position:fixed;bottom:0;border-top:1px solid #e0e0e0;background:#fff;}
    .payment-bar .all-checkbox{float:left;line-height:49px;padding-left:40px;}
    .payment-bar .shop-total{float:left;-webkit-box-flex:1.0;box-flex:1.0;margin:9px 20px 9px 35px;}
    .payment-bar .shop-total strong{display:block;font-size:16px;}
    .payment-bar .shop-total span{display:block;font-size:12px;}
    .payment-bar .settlement{display:inline-block;float:right;width:100px;height:49px;line-height:49px;text-align:center;color:#fff;font-size:16px;background:#f23030;}
    input[type="checkbox"]{-webkit-appearance:none;outline: none;}
    input.check{background:url(../../images/icon_radio3.png) no-repeat center left;background-size:20px 20px;position:absolute;top:50%;left:10px;margin-top:-18px;width:20px;height:35px;}
    input.check:checked{background:url(../../images/icon_radio4.png) no-repeat center left;background-size:20px 20px;}
    input.goodsCheck:checked{background:url(../../images/icon_radio4.png) no-repeat center left;background-size:20px 20px;}
    input.check:checked{background:url(../../images/icon_radio4.png) no-repeat center left;background-size:20px 20px;}
    .checked{background:url(../../images/icon_radio4.png) no-repeat left center;background-size:20px 20px;position:absolute;top:50%;left:15px;margin-top:-18px;width:20px;height:35px;}

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

    .cart-item-list .cart-item-check {
      float: left;
      padding: 28px 0 28px 22px; }


    .item-edit-btn {
      display: inline-block;
      width: 16px;
      height: 20px; }
    .item-edit-btn .icon-del {
      width: 100%;
      height: 100%;
      fill: #999; }

</style>
