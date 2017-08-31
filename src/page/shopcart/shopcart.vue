<template>
  	<div class="paddingTop search_page">
        <head-top head-title="购物车" goBack="true"></head-top>

     <div v-if="shopCaft">
       <div class="shop-group-item">
         <ul>
           <li>
             <div class="shop-info">
               <input type="checkbox" class="check goods-check goodsCheck">
               <div class="shop-info-img"><a href="#"><img src="images/s1.jpg"></a></div>
               <div class="shop-info-text">
                 <h4>2017夏季新款韩版蕾丝拼接荷叶袖露肩雪纺娃娃衫上衣女短袖雪...</h4>
                 <div class="shop-brief"><span>重量:3.3kg</span><span>颜色:标配版</span></div>
                 <div class="shop-price">
                   <div class="shop-pices">￥<b class="price">100.00</b></div>
                   <div class="shop-arithmetic">
                     <a href="javascript:;" class="minus">-</a>
                     <span class="num">1</span>
                     <a href="javascript:;" class="plus">+</a>
                   </div>
                 </div>
               </div>
             </div>
           </li>

           <li>
             <div class="shop-info">
               <input type="checkbox" class="check goods-check goodsCheck">
               <div class="shop-info-img"><a href="#"><img src="images/s1.jpg"></a></div>
               <div class="shop-info-text">
                 <h4>2017夏季新款韩版蕾丝拼接荷叶袖露肩雪纺娃娃衫上衣女短袖雪...</h4>
                 <div class="shop-brief"><span>重量:3.3kg</span><span>颜色:标配版</span></div>
                 <div class="shop-price">
                   <div class="shop-pices">￥<b class="price">100.00</b></div>
                   <div class="shop-arithmetic">
                     <a href="javascript:;" class="minus">-</a>
                     <span class="num">1</span>
                     <a href="javascript:;" class="plus">+</a>
                   </div>
                 </div>
               </div>
             </div>
           </li>

           <li>
             <div class="shop-info">
               <input type="checkbox" class="check goods-check goodsCheck">
               <div class="shop-info-img"><a href="#"><img src="images/s3.jpg"></a></div>
               <div class="shop-info-text">
                 <h4>2017夏季新款韩版蕾丝拼接荷叶袖露肩雪纺娃娃衫上衣女短袖雪...</h4>
                 <div class="shop-brief"><span>重量:3.3kg</span><span>颜色:标配版</span></div>
                 <div class="shop-price">
                   <div class="shop-pices">￥<b class="price">100.00</b></div>
                   <div class="shop-arithmetic">
                     <a href="javascript:;" class="minus">-</a>
                     <span class="num">1</span>
                     <a href="javascript:;" class="plus">+</a>
                   </div>
                 </div>
               </div>
             </div>
           </li>


         </ul>
       </div>
       <div class="payment-bar">
         <div class="all-checkbox"><input type="checkbox" class="check goods-check" id="AllCheck">全选</div>
         <div class="shop-total">
           <strong>总价：<i class="total" id="AllTotal">900.00</i></strong>
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

export default {
	data(){
        return {
            geohash: '', // msite页面传递过来的地址信息
            searchValue: '', // 搜索内容
            restaurantList: [], // 搜索返回的结果
            imgBaseUrl, // 图片域名地址
            searchHistory: [], // 搜索历史记录
            showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
            emptyResult: false, // 搜索结果为空时显示
            shopCaft:true,
        }
    },
    created(){

    },
    mounted(){
        this.geohash = this.$route.params.geohash;
        //获取搜索历史记录
        if (getStore('searchHistory')) {
            this.searchHistory = JSON.parse(getStore('searchHistory'));
        }
    },
    components:{
        headTop,
        footGuide,
    },
    methods:{
        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
        async searchTarget(historyValue){
            if (historyValue) {
                this.searchValue = historyValue;
            }else if (!this.searchValue) {
                return
            }
            //隐藏历史记录
            this.showHistory = false;
            //获取搜索结果
            this.restaurantList = await searchRestaurant(this.geohash, this.searchValue);
            this.emptyResult = !this.restaurantList.length;
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            let history = getStore('searchHistory');
            if (history) {
                let checkrepeat = false;
                this.searchHistory = JSON.parse(history);
                this.searchHistory.forEach(item => {
                    if (item == this.searchValue) {
                        checkrepeat = true;
                    }
                })
                if (!checkrepeat) {
                    this.searchHistory.push(this.searchValue)
                }
            }else {
                this.searchHistory.push(this.searchValue)
            }
            setStore('searchHistory',this.searchHistory)
        },
        //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
        checkInput(){
            if (this.searchValue === '') {
                this.showHistory = true; //显示历史记录
                this.restaurantList = []; //清空搜索结果
                this.emptyResult = false; //隐藏搜索为空提示
            }
        },
        //点击删除按钮，删除当前历史记录
        deleteHistory(index){
            this.searchHistory.splice(index, 1);
            setStore('searchHistory',this.searchHistory);
        },
        //清除所有历史记录
        clearAllHistory(){
            this.searchHistory = [];
            setStore('searchHistory',this.searchHistory);
        }
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
    .shop-group-item{margin-bottom:5px; background: #fff;}
    .shop-group-item ul li{border-bottom:1px solid #fff;}
    .shop-group-item ul li:last-child{border-bottom:none;}
    .shop-info{height:120px;padding:0 15px;position:relative;}
    .shop-info .checkbox{background:url(../../images/icon_radio3.png) no-repeat left center;background-size:20px 20px;position:absolute;top:50%;left:15px;margin-top:-60px;width:20px;height:120px;}
    .shop-info .checkbox1{background:url(../../images/icon_radio4.png) no-repeat left center;background-size:20px 20px;position:absolute;top:50%;left:15px;margin-top:-60px;width:20px;height:120px;}
    .shop-info .shop-info-img{position:absolute;top:15px;left:45px;width:90px;height:90px;}
    .shop-info .shop-info-img img{width:100%;height:100%;}
    .shop-info .shop-info-text{margin-left:130px;padding:15px 0;}
    .shop-info .shop-info-text h4{font-size:14px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow: hidden;}
    .shop-info .shop-info-text .shop-brief{height:25px;line-height:25px;font-size:12px;color:#81838e;white-space:nowrap;}
    .shop-info .shop-info-text .shop-brief span{display:inline-block;margin-right:8px;}
    .shop-info .shop-info-text .shop-price{height:24px;line-height:24px;position:relative;}
    .shop-info .shop-info-text .shop-price .shop-pices {color:red;font-size:16px;}
    .shop-info .shop-info-text .shop-arithmetic{position:absolute;right:0px;top:0;width:78px;box-sizing:border-box;white-space:nowrap;height:100%;border:1px solid #e0e0e0;}
    .shop-info .shop-info-text .shop-arithmetic a{display:inline-block;width:23px;height:22px;line-height:22px;text-align:center;background:#fff;font-size:16px;}
    .shop-info .shop-info-text .shop-arithmetic .minus{border-right:1px solid #e0e0e0;}
    .shop-info .shop-info-text .shop-arithmetic .failed{color:#d1d1d1;}
    .shop-info .shop-info-text .shop-arithmetic .plus{border-left:1px solid #e0e0e0;}
    .shop-info .shop-info-text .shop-arithmetic .num{width:32px;text-align:center;border:none;display: inline-block;height:100%;box-sizing:border-box;vertical-align:top;margin:0 -6px;font-size: 0.6rem}
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



</style>
