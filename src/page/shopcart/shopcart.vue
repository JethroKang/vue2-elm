<template>
  	<div class="paddingTop search_page">
        <head-top head-title="购物车" goBack="true"><!--{{editText}}-->
          <span slot="edit" class="edit" @click="editThing"><img src="../../images/del.png" style="width: 22px; height: 22px;padding-top:10px"></span>
        </head-top>

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
       <div class="commodity_box">
         <div class="commodity_list">
           <!--商品-->
           <ul class="commodity_list_term">
             <li class="select" v-for="(item,index) in cartList">
               <a href="javascript:void 0" class="em" v-bind:class="{check:item.isChecked}" @click="selectGood(item)">
                 <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
               </a>
               <img :src="item.goods.thumb" />
               <div class="div_center">
                 <h4>{{item.goods.name}}</h4>
                 <span>{{item.sku_spec.key_name_arr}}</span>
                 <p class="now_value"><i style="color: red">￥</i><b class="qu_su" style="color: red">{{item.sku_spec.price}}</b></p>
               </div>
               <div class="div_right">
                 <i @click="changeQuentity(item,-1,index)">-</i>
                 <span class="zi">{{item.num}}</span>
                 <i @click="changeQuentity(item,1)">+</i>
               </div>
             </li>
           </ul>
         </div>
       </div>
       <div class="settle_box">
         <!--<dl class="all_check select">-->
           <!--<dt v-if="!isSelectAll">-->
             <!--<div @click="selectAll">-->
             <!--<a href="javascript:void 0" class="span ">-->
               <!--<svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>-->
             <!--</a>-->
             <!--<span class="span-p">全选</span>-->
             <!--</div>-->
           <!--</dt>-->
           <!--<dt v-else>-->
           <!--<div @click="unSelectAll">-->
             <!--<a href="javascript:void 0" class="span check">-->
               <!--<svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>-->
             <!--</a>-->
             <!--<span class="span-p">取消</span>-->
           <!--</div>-->
           <!--</dt>-->
         <!--</dl>-->
         <dl class="total_amount">
           <dt>合计：<p id="total_price" style="font-size:0.6rem;">¥{{totalPrice}}</p></dt>
           <dd style="font-size:0.1rem;color:gray;">不含运费</dd>
         </dl>
         <a class="settle_btn" href="javascript:void(0);" id="confirm_cart" @click="payOrder">去结算</a>
         <!--<a class="settle_btn" href="javascript:void(0);"  v-else @click="deleteOrder">删除</a>-->
       </div>


     </div>


      <div class="no-data-div" v-else>
        <div class="no-data-img">
          <img src="../../images/bg_empty_list.png">
        </div>
        <dl>
          <dt>购物车空荡荡</dt>
          <dd>可以去看看哪些想买的</dd>
        </dl>
        <!--<router-link to="/login">-->
          <!--<p class="no-data-btn">登录购买</p>-->
        <!--</router-link>-->
        <foot-guide></foot-guide>
      </div>
      <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
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
            size:50,
            cartList:'',
            isSelectAll:false,//是否全选
            confirmDelete:false, //是否删除订单
            editText:'删除',
            deletesite:false, //是否编辑状态
            goodsid:null,
            goodsOrder:null,
            goodsDetails:null,
            deletenum:null,
            numcat:null,
            cartListnum:0,
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
        }
    },
    created(){
      if (!(this.userToken)) {
        window.location.href='https://master.fstuis.com/api/v1/oauth/oauth_call?url_call=' + encodeURIComponent('?#/msite');
      }
    },
    mounted(){
      this.initData();
//      if (!(this.userToken)) {
//            this.shopCaft = false;
//      }

    },
    components:{
      headTop,
      footGuide,
      alertTip,
    },
    computed: {
      ...mapState([
        'userToken',
      ]),


      totalPrice:function(){
        let total = 0;
        var _this = this;
        this.goodsid = [];
        this.goodsOrder = [];
        this.goodsDetails = [];
        if(this.cartList){
          this.cartList.forEach(function(good){
//          console.log(good);
            if(good.isChecked){
              console.log(good);
              total += good.sku_spec.price * good.num;
              let title = good.goods.name;
              let goods_id = good.goods.id;
              let num = good.num;
              let sku_spec_id = good.sku_spec.id;
              let price = good.sku_spec.price;
              let thumb = good.goods.thumb;
              _this.goodsid.push(good.id);
              _this.goodsOrder.push({goods_id:goods_id,num:num,sku_spec_id:sku_spec_id});
              _this.goodsDetails.push({title:title,num:num,price:price,thumb:thumb});
            }

          });
        }
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
        Request.Get('cart',{current:this.current,size:this.size,token:this.userToken})
          .then((res) => {
          console.log(res);
            this.cartList = res.data;
            this.numcat = res;
//           console.log(this.showCartList);
            if(res.msg === '暂无数据'){
              this.shopCaft = false;

            }else {
              this.cartListnum =this.cartList.length;
            }
//            this.cartListnum =this.cartList.length;
          });


      },

      //编辑
      editThing(){
        if(this.editText == '删除'){
          if(this.goodsDetails == ''){
            alert("请选择商品");
          }else {
            this.deletesite=true;
            this.showAlert = true;
            this.alertText = '是否要删除选择的商品';
          }
        }
      },

      deleteOrder(){
        if (this.goodsid.length) {
          let  id =  this.goodsid[0];
          console.log(id);
          Request.Delete('cart/' + id, { token: this.userToken, delete_all: "true",ids:this.goodsid})
            .then((res) => {
//                      console.log(res);
              if(res.code === 200){
                this.deletenum = res.data;
                console.log(res.msg);
                if(this.deletenum){
                  this.shopCaft=false;
                }
              }

            })
        }else {
          this.showAlert = true;
          this.alertText = '请选择商品';
        }
      },

      payOrder(){
        if(this.goodsDetails == ''){
          alert("请选择商品");
        }else {
          this.$router.push({path: '/confirmOrder', query: {data: this.goodsOrder,details:this.goodsDetails}});
        }

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
        if(good.num === 1 && val === -1 ){

          this.confirmDelete = true;
          this.readyToDelIndex = _index;
        } else {
          good.num += val;
        }

        let id=good.id;
        let num=good.num;
        if (this.userToken) {
          Request.Put('cart/' + id, {token:this.userToken,num:num})
            .then((res) => {
              console.log(res.msg)
            })
        }
      },
      closeTip(){
        this.showAlert = false;
        if (this.goodsid.length) {
          let  id =  this.goodsid[0];
          console.log(id);
          Request.Delete('cart/' + id, { token: this.userToken, delete_all: "true",ids:this.goodsid})
            .then((res) => {
//                      console.log(res);
              if(res.code === 200){
                this.deletenum = res.data;
                console.log(res.msg);
              }else if(res.data){
                this.shopCaft=false;
              }

            })
        }
      }


    },
    watch: {
      deletenum: function (value) {
        this.initData();
      },
    }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .edit{
      right: 0.4rem;
    @include sc(0.7rem, #fff);
    @include ct;
    }

    .commodity_box{
      padding-bottom: 3rem;
    }
    .commodity_list {
      background: #fff;
      margin-bottom: 10px;
        .tite_tim .em {
          float: left;
          width: 20px;
          height: 20px;
          border: solid 1px #e6e6e6;
          border-radius: 50%;
          margin-right: 10px;
        }
        .commodity_list_term {
          margin-left: 3%;
          li {
            border-top: solid 1px #e6e6e6;
            position: relative;
            overflow: hidden;
            padding: 12px 0;
              .em {
                position: absolute;
                width: 20px;
                height: 20px;
                border: solid 1px #e6e6e6;
                border-radius: 50%;
                left: 0;
                top: 40px;
                .icon-ok{
                  width: 18px;
                  height: 18px;
                  display: inline-block;
                  position: absolute;
                  top: 2px;
                  fill: #fff;
                  -ms-transform: scale(0.8);
                  transform: scale(0.8);
                }

              }
              .check{
                background: #EE7A23;
                border-color: #EE7A23;
              }

              img {
                width: 4rem;
                height: 4rem;
                max-width: 4rem;
                max-height: 4rem;
                float: left;
                margin-left: 28px;
              }
              .div_center {
                width: 50%;
                float: left;
                position: relative;
                margin-top: 7px;
                margin-left: 2%;
                h4 {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  color: #333;
                  margin: 0;
                  font-size: 0.7rem;
                }
                span {
                  color: #666;
                  font-size: 0.6rem;
                }
                .now_value{
                  font-size: 0.5rem;
                  margin-top: 6px;
                  font-family: "-apple-system","Helvetica Neue",Roboto,"Segoe UI",sans-serif;
                }
              }
                .div_right {
                  position: absolute;
                  bottom: 10px;
                  right: 4%;
                  border: solid 1px #e6e6e6;
                  border-radius: 4px;
                  width: 82px;
                  overflow: hidden;
                  text-align: center;
                  line-height: 30px;
                      i {
                        float: left;
                        width: 33%;
                        color: #333;
                        font-size: .8rem
                      }
                      span {
                        float: left;
                        width: 33%;
                        border-left: solid 1px #e6e6e6;
                        border-right: solid 1px #e6e6e6;
                        color: #333;
                        font-size: .6rem
                      }
                }
          }
        }

    }

    .no-data-div{
        width:90%;
        margin:0rem auto 0;
        text-align:center;
        .no-data-icon {
            height: 5rem;
            width: 5rem;
            line-height: 12rem;
            text-align: center;
            display: block;
            background: #DFE0E8;
            border-radius: 100%;
            margin: 0 auto;
        }
        .no-data-img {
            margin: 0 auto;
        }
        .no-data-icon i {
            display: block;
            color: #fff;
            line-height:5rem;
            font-size:3rem;
        }
        dl {
          margin: 0.15rem auto;
          text-align:center;
        }
        dl dt {
          display: block;
          color: #777;
          font-size: .8rem
        }
        dl dd {
          display: block;
          margin-bottom: 0.15rem;
          color: #999;
          font-size: .6rem
        }
        .no-data-btn {
          background: #f23030;
          display:block !important;
          margin: 1rem auto 0 auto;
          color: #fff !important;
          line-height: 1.5rem;
          text-align: center;
          border-radius: 0.15rem;
          height: 1.5rem;
          width: 6rem;
          font-size: 0.7rem ;
        }
        .no-data-img img {
          height: 6.5rem;
        }
    }

    .settle_box_h{ height:60px;}
    .settle_box{ background:#fff; position:fixed; left:0px; bottom:0px; overflow:hidden; z-index:2;width: 100%;padding:0 20px 0 0;border-top: solid 1px #e6e6e6;height: 40px;}
    .settle_box .all_check,.settle_box .total_amount{ float:left;}
    .settle_box .all_check{ width:17%;margin-bottom:0;margin-top: 15px}
    .settle_box .all_check dd{ color:#999999; font-size:12px; width: 100%}
    .settle_box .all_check dt em{ font-size: .8rem}
    .settle_box .all_check .span{ width:20px; height:20px; border:solid 1px #a2a2a2; vertical-align:middle; border-radius:50%;float: left;}
    .settle_box .all_check .span .icon-ok{
      width: 18px;
      height: 18px;
      display: inline-block;
      position: absolute;
      top: 18px;
      fill: #fff;
      -ms-transform: scale(0.8);
      transform: scale(0.8);
    }
    .settle_box .all_check .span-p{
      font-size: 14px;
      display: block;
      padding-left: 5px;
      float: left;
    }
     .check{
      background: #EE7A23;
      border-color: #EE7A23;
    }
    .settle_box .all_check .disabled{ background:#e1e1e1;border:solid 1px #e1e1e1;}

    .settle_box .total_amount {color: #999;font-size: 14px;margin: 0 0 0 50px;text-align: right;margin-top: 1px;padding-bottom: 5px;}
    .settle_box .total_amount dd{ margin-top:1px;clear: both;font-size: 0.6rem;}
    .settle_box .total_amount dt p {color: #ff900d;font-size: 0.8rem;float: right;line-height: 20px;}
    .settle_box .total_amount dt p:first-letter{ font-size:0.6rem}
    .settle_box .total_amount dt {font-weight: initial;}
    .settle_box .settle_btn{
      float:right;
      width:120px;
      background:#fd5138;
      color:#fff;
      padding:6px 0;
      margin: 5px 0 0 0;
      text-align:center;
      font-size: 0.6rem;
      border-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
    }

</style>
