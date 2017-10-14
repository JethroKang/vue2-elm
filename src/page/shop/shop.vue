 <template>
    <div>
        <section v-if="!showLoading" class="shop_container">
          <head-top go-back='true' :head-title="profiletitle"></head-top>
          <div id='msite_banner'>
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in shopDetailData.pics">
                  <img :src="item" >
                </div>
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
            </div>
          </div>
          <section class="food_title">
            <p class="food_price">￥ {{shopDetailData.price}}</p>
            <h3 >{{shopDetailData.name}}</h3>
            <p class="food_secondary_title">{{shopDetailData.outline}}</p>
          </section>
          <section class="food_service">
            <!--<p class="food_service_m"><span>包邮</span>全场满200元包邮</p>-->
            <ul>
              <li><i class="icon iconfont">&#xe622;</i>正品保证</li>
              <li><i class="icon iconfont">&#xe622;</i>快速发货</li>
              <li><i class="icon iconfont">&#xe622;</i>优质服务</li>
            </ul>
            <div style="clear: both"></div>
          </section>

          <section class="change_show_type" ref="chooseType">
              <div>
              <span>商品详情</span>
              </div>
          </section>

          <section class="food_container">
              <div class="food_container_details">
                <div v-html="shopDetailData.content" class="container_details" ></div>
              </div>
          </section>


            <!--<section class="change_show_type" ref="chooseType">-->
                <!--<div>-->
                    <!--<span :class='{activity_show: changeShowType =="food"}' @click="changeShowType='food'">商品</span>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'">评价</span>-->
                <!--</div>-->
            <!--</section>-->

            <!--<transition name="fade-choose">-->
                <!--<section v-show="changeShowType =='food'" class="food_container">-->
                  <!--<div class="food_container_details">-->
                    <!--{{shopDetailData.content}}-->
                  <!--</div>-->
                <!--</section>-->
            <!--</transition>-->

            <!--<transition name="fade-choose">-->
                <!--<section class="rating_container" id="ratingContainer" v-show="changeShowType =='rating'">-->
                    <!--<section v-load-more="loaderMoreRating" type="2">-->
                        <!--<section>-->
                          <!--<ul class="rating_list_ul">-->
                                <!--<li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">-->
                                    <!--<img :src="getImgPath(item.avatar)" class="user_avatar">-->
                                    <!--<section class="rating_list_details">-->
                                        <!--<header>-->
                                            <!--<section class="username_star">-->
                                                <!--<p class="username">{{item.username}}</p>-->
                                            <!--</section>-->
                                            <!--<time class="rated_at">{{item.rated_at}}</time>-->
                                        <!--</header>-->

                                        <!--<div class="rating_comment">-->
                                          <!--<p class="comment">大个有肉不错</p>-->
                                        <!--</div>-->
                                        <!--<ul class="food_img_ul">-->
                                            <!--<li v-for="(item, index) in item.item_ratings" :key="index">-->
                                                <!--<img :src="getImgPath(item.image_hash)" v-if="item.image_hash">-->
                                            <!--</li>-->
                                        <!--</ul>-->
                                    <!--</section>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</section>-->
                    <!--</section>-->
                <!--</section>-->
            <!--</transition>-->

          <section class="buy_cart_container">

            <div class="bottom-btn">
              <div class="l l-cart">
                <router-link :to="{path:'/shopcart'}">
                <div class="box">
                  <div class="cart-count">{{shopCartNum}}</div>
                  <i class="iconfont icon" >&#xe502;</i>
                </div>
                </router-link>
              </div>
              <div class="c" @click="showChooseList">加入购物车</div>
              <div class="r" @click="showChooseList">立即购买</div>
            </div>

          </section>

          <!--<transition name="toggle-cart">-->
            <!--<section class="cart_food_list" v-show="showCartList&&cartFoodList.length">-->
              <!--<header>-->
                <!--<h4>购物车</h4>-->
                <!--<div @click="clearCart">-->
                  <!--<svg>-->
                    <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>-->
                  <!--</svg>-->
                  <!--<span class="clear_cart">清空</span>-->
                <!--</div>-->
              <!--</header>-->
              <!--<section class="cart_food_details" id="cartFood">-->
                <!--<ul>-->
                  <!--<li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">-->
                    <!--<div class="cart_list_num">-->
                      <!--<p class="ellipsis">{{item.name}}</p>-->
                      <!--<p class="ellipsis">{{item.specs}}</p>-->
                    <!--</div>-->
                    <!--<div class="cart_list_price">-->
                      <!--<span>¥</span>-->
                      <!--<span>{{item.price}}</span>-->
                    <!--</div>-->
                    <!--<section class="cart_list_control">-->
                                            <!--<span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">-->
                                                <!--<svg>-->
                                                    <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>-->
                                                <!--</svg>-->
                                            <!--</span>-->
                      <!--<span class="cart_num">{{item.num}}</span>-->
                      <!--<svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">-->
                        <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>-->
                      <!--</svg>-->
                    <!--</section>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</section>-->
            <!--</section>-->
          <!--</transition>-->
          <!---->
          <!--<transition name="fade">-->
            <!--<div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>-->
          <!--</transition>-->


          <transition name="toggle-cart">
            <section class="activities_details" v-if="showSpecs" >

              <svg width="16" height="16" class="close_activities" xmlns="http://www.w3.org/2000/svg" version="1.1"  @click="showChooseList">
              <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
              <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
              </svg>

              <div class="activities_details_img" style="width: 80px;height: 80px; overflow: hidden;border: 2px solid #ffffff;margin-top: -5%; position: absolute; left: 6%;border-radius: 5px;" >
                <img :src="shopDetailData.thumb" style="width: 80px;height: 80px;">
              </div>

              <div style="background-color: #ffffff; height: 24%;border-bottom: 1px solid #e9e9e9">
                <p style="color: #fd5138; position: absolute; left: 30%; top: 6%; font-size: .6rem;font-weight: bold">￥ <span v-if="foodPrice">{{foodPrice}}</span><span v-else>{{shopDetailData.price}}</span></p>
                <p style="color: #000000; position: absolute; left: 30%; top: 12%;font-size: .6rem">商品销量：{{shopDetailData.goods_sales}}</p>
              </div>

              <section class="specs_details" style="background-color: #ffffff; height: 40%;border-bottom: 1px solid #f5f5f5">
                <h5 class="specs_details_title">品种分类</h5>
                <ul>
                  <li v-for="(specsitem,itemIndex) in shopDetailData.sku_spec" :class="{specs_activity: itemIndex == specsIndex}" @click="chooseSpecs(itemIndex,specsitem.id,specsitem.price)">
                    {{specsitem.key_name_arr}}
                  </li>
                </ul>
              </section>

              <section class="specs_details_num" style="background-color: #ffffff; height: 22%;border-bottom: 1px solid #f5f5f5">

              <div class="shop-arithmetic-t">
                购买数量：
              </div>

              <div class="shop-arithmetic">
                <div class="minus"  @click="min">-</div>
                <input class="num" name="pricenum"  type="tel" v-model="numCounter"  maxlength="12 " />
                <div href="javascript:void(0)" class="plus" @click="add">+</div>
              </div>

              </section>

              <section style="background-color: #ffffff; height: 15%">
                    <div style="width: 50%;height: 100%; text-align: center; background-color: #fea401; float: left;font-size: .8rem;color: #ffffff;vertical-align:middle; line-height: 2rem"
                         @click="addToCart(shopId,foodIndex,numCounter)">加入购物车</div>
                    <router-link :to="{path:'/confirmOrder' , query: {foodID:shopId,foodIndex:foodIndex, foodPrice:foodPrice,numCounter:numCounter,title:shopDetailData.name} }">
                      <div style="width: 50%;height: 100%; text-align: center; background-color: #fd5138; float: left;font-size: .8rem;color: #ffffff;vertical-align:middle; line-height: 2rem">立即购买</div>
                    </router-link>
              </section>

            </section>
          </transition>

        </section>

      <!--遮罩层-->
      <transition name="showcover">
        <div class="back_cover" v-show="sortBy"  @click="showChooseList"></div>
      </transition>

       <loading v-show="showLoading || loadRatings"></loading>

       <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
           <img src="../../images/shop_back_svg.svg">
       </section>

       <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

      //提示框
      <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex'
    import {msiteAdress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags,goods,getaddress} from 'src/service/getData'
    import headTop from 'src/components/header/head'
    import loading from 'src/components/common/loading'
    import buyCart from 'src/components/common/buyCart'
    import ratingStar from 'src/components/common/ratingStar'
    import {loadMore, getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import BScroll from 'better-scroll'
    import 'src/plugins/swiper.min.js'
    import 'src/style/swiper.min.css'
    import alertTip from 'src/components/common/alertTip.vue'
    import Request from 'src/service/api'

    export default {

        data(){
            return{
                shopId: null, //商店id值
                showLoading: true, //显示加载动画
                changeShowType: 'food',//切换显示商品或者评价
                shopDetailData: [], //商铺详情
                categoryNum: [], //商品类型右上角已加入购物车的数量
                cartFoodList: '', //购物车商品列表
                showCartList: '',//显示购物车列表
                ratingList: null, //评价列表
                ratingOffset: 0, //评价获取数据offset值
                ratingScoresData: null, //评价总体分数
                ratingTagsList: null, //评价分类列表
                ratingTageIndex: 0, //评价分类索引
                preventRepeatRequest: false,// 防止多次触发数据请求
                loadRatings: false, //加载更多评论是显示加载组件
                showSpecs: false,//控制显示食品规格
                specsIndex: null, //当前选中的规格索引值
                showMoveDot: [], //控制下落的小圆点显示隐藏
                windowHeight: null, //屏幕的高度
                elLeft: 0, //当前点击加按钮在网页中的绝对top值
                elBottom: 0, //当前点击加按钮在网页中的绝对left值
                ratingScroll: null, //评论页Scroll
                profiletitle: '商品详情页',
                numCounter:1,
                foodPrice:'',
                foodIndex:null,
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                showPayWay: false,//显示付款方式
                sortBy:false,
                shopCartNum:'0',//是否显示购物的数量
                current:1,
                size:20,
            }
        },
        created(){
            this.shopId = this.$route.query.id;
//            console.log(this.shopId);
            this.INIT_BUYCART();
        },

        mounted(){
            this.initData();
            this.windowHeight = window.innerHeight;
        },
        beforeDestroy(){
            // this.foodScroll.removeEventListener('scroll', )
        },
        mixins: [loadMore, getImgPath],
        components: {
            loading,
            ratingStar,
            headTop,
            alertTip,
        },
        computed: {
            ...mapState([
              'userInfo', 'addressIndex','userToken','latitude','longitude','cartList'
            ]),

            //购物车中总共商品的数量
            totalNum: function (){
                let num = 0;
                this.cartFoodList.forEach(item => {
                    num += item.num
                })
                return num
            },
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS','ADD_CART','REDUCE_CART','INIT_BUYCART','CLEAR_CART','RECORD_SHOPDETAIL'
            ]),

            showPayWayFun(){
              this.showSpecs = !this.showSpecs;
            },

            //初始化时获取基本数据
            async initData(){

              console.log(this.userToken);

               //获取商店信息
              let id = this.shopId;
              Request.Get('goods/'+id)
                .then((res) => {
                  this.shopDetailData = res.data;
//                  console.log(this.shopDetailData);
                }).then(() => {
                //初始化swiper
                new Swiper('.swiper-container', {
                  pagination: '.swiper-pagination',
                  loop: true
                });
              });

              //隐藏加载动画
              this.hideLoading();

              //判断用户是否登录，对登录的用户获取购物车的数量
              if (this.userToken) {
                //获取购物车的列表
                Request.Get('cart',{current:this.current,size:this.size,token:this.userToken})
                  .then((res) => {
                    this.showCartList = res.data;
                    this.shopCartNum = this.showCartList.length;
                    console.log(this.showCartList);
                  })
              }
            },

            //加入购物车
            addToCart(shopId,foodIndex,numCounter){

                //判断用户是否登录
              if (!(this.userToken)) {
                  this.showAlert = true;
                  this.alertText = '您还没有登录';
              }

              //将加入购物车的订单set进本地缓存
              this.ADD_CART({goods_id:shopId, sku_spec_id:foodIndex, num:numCounter});

              //将加入购物车的订单提交到服务器
              Request.Post('cart', { goods_id:shopId, sku_spec_id:foodIndex, num:numCounter,token:this.userToken})
                .then((res) => {
                  console.log(res)
                  this.cartFoodList = res.data;
                  this.shopCartNum = this.shopCartNum + 1;
                  this.sortBy = false;
                  this.showSpecs = false;
                  this.showAlert = true;
                  this.alertText = '加入购物车成功';
                })
            },

            //移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
//            removeOutCart(category_id, item_id, food_id, name, price, specs){
//                this.REDUCE_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs});
//            },



            /**
             * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
             */


//            initCategoryNum(){
//                let newArr = [];
//                let cartFoodNum = 0;
//                this.totalPrice = 0;
//                this.cartFoodList = [];
//                this.menuList.forEach((item, index) => {
//                    if (this.shopCart&&this.shopCart[item.foods[0].category_id]) {
//                        let num = 0;
//                        Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
//                            Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
//                                let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
//                                num += foodItem.num;
//                                if (item.type == 1) {
//                                    this.totalPrice += foodItem.num*foodItem.price;
//                                    if (foodItem.num > 0) {
//                                        this.cartFoodList[cartFoodNum] = {};
//                                        this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
//                                        this.cartFoodList[cartFoodNum].item_id = itemid;
//                                        this.cartFoodList[cartFoodNum].food_id = foodid;
//                                        this.cartFoodList[cartFoodNum].num = foodItem.num;
//                                        this.cartFoodList[cartFoodNum].price = foodItem.price;
//                                        this.cartFoodList[cartFoodNum].name = foodItem.name;
//                                        this.cartFoodList[cartFoodNum].specs = foodItem.specs;
//                                        cartFoodNum ++;
//                                    }
//                                }
//                            })
//                        })
//                        newArr[index] = num;
//                    }else{
//                        newArr[index] = 0;
//                    }
//                })
//                this.totalPrice = this.totalPrice.toFixed(2);
//                this.categoryNum = [...newArr];
//            },


            //清除购物车
//            clearCart(){
//                this.toggleCartList();
//                this.CLEAR_CART(this.shopId);
//            },


            //获取不同类型的评论列表
//            async changeTgeIndex(index, name){
//                this.ratingTageIndex = index;
//                this.ratingOffset = 0;
//                this.ratingTagName = name;
//                let res = await getRatingList(this.shopId, this.ratingOffset, name);
//                this.ratingList = [...res];
//                this.$nextTick(() => {
//                    this.ratingScroll.refresh();
//                })
//            },

            //加载更多评论
//            async loaderMoreRating(){
//                if (this.preventRepeatRequest) {
//                    return
//                }
//                this.loadRatings = true;
//                this.preventRepeatRequest = true;
//                this.ratingOffset += 10;
//                let ratingDate = await getRatingList(this.shopId, this.ratingOffset, this.ratingTagName);
//                this.ratingList = [...this.ratingList,...ratingDate];
//                this.loadRatings = false;
//                if (ratingDate.length >= 10) {
//                    this.preventRepeatRequest = false;
//                }
//            },
            //隐藏动画
            hideLoading(){
                this.showLoading = false;
            },
            //显示规格列表
            showChooseList(){
            this.showSpecs = !this.showSpecs;
            this.sortBy = !this.sortBy;
//              this.showAlert = true;
//              this.alertText = '功能暂不开放';
//              alert('功能暂不开放');
            },
            //记录当前所选规格的索引值
            chooseSpecs(itemIndex,index , price){
                this.specsIndex = itemIndex;
                this.foodIndex = index;
                console.log(this.foodIndex);
                this.foodPrice = price;
                console.log(this.foodPrice);
            },

//            商品的数量
            add() {
              this.numCounter = parseInt(this.numCounter) + 1;
            },
            min(){
              if(this.numCounter > 1){
                this.numCounter = parseInt(this.numCounter) - 1;
              }
            },
            closeTip(){
              this.showAlert = false;
            }
        },

        watch: {
            //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
            showLoading: function (value){
                if (!value) {
                    this.$nextTick(() => {
//                        this.getFoodListHeight();
//                        this.initCategoryNum();
                    })
                }
            },

            //商品加入购物车发生变化
            cartFoodList: function (value){
                if(value.length){
//                    this.showCartList = false;
                }
            },

          //商品加入购物车发生变化
          showCartList: function (value){
            if(value.length){
//                    this.showCartList = false;
            }
          },


            //商品、评论切换状态
            changeShowType: function (value){
                if (value === 'rating') {
                    this.$nextTick(() => {
                        this.ratingScroll = new BScroll('#ratingContainer', {
                            probeType: 3,
                            deceleration: 0.003,
                            bounce: false,
                            swipeTime: 2000,
                            click: true,
                        });
                        this.ratingScroll.on('scroll', (pos) => {
                            if (Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.ratingScroll.maxScrollY))) {
                                this.loaderMoreRating();
                                this.ratingScroll.refresh();
                            }
                        })
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    @keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-moz-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-webkit-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    @-o-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
    .shop_back_svg_container{
        position: fixed;
        @include wh(100%, 100%);
        img{
            @include wh(100%, 100%);
        }
    }
    .shop_container{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
    }
    .goback{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        z-index: 11;
        padding-top: 0.2rem;
        padding-left: 0.2rem;
    }
    .shop_detail_header{
        overflow: hidden;
        position: relative;
        .header_cover_img{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9;
            filter: blur(10px);
        }
        .description_header{
            position: relative;
            z-index: 10;
            background-color: rgba(119,103,137,.43);
            padding: 0.4rem 0 0.4rem 0.4rem;
            width: 100%;
            overflow: hidden;
            .description_top{
                display: flex;
                .description_left{
                    margin-right: 0.3rem;
                    img{
                        @include wh(2.9rem, 2.9rem);
                        display: block;
                        border-radius: 0.15rem;
                    }
                }
                .description_right{
                    flex: 1;
                    .description_title{
                        @include sc(.8rem, #fff);
                        font-weight: bold;
                        width: 100%;
                        margin-bottom: 0.3rem;
                    }
                    .description_text{
                        @include sc(.5rem, #fff);
                        margin-bottom: 0.3rem;
                    }
                    .description_promotion{
                        @include sc(.5rem, #fff);
                        width: 11.5rem;
                    }
                }
                .description_arrow{
                    @include ct;
                    right: 0.3rem;
                    z-index: 11;
                }
            }
            .description_footer{
                @include fj;
                margin-top: 0.5rem;
                padding-right: 1rem;
                p{
                    @include sc(.5rem, #fff);
                    span{
                        color: #fff;
                    }
                    .tip_icon{
                        padding: 0 .04rem;
                        border: 0.025rem solid #fff;
                        border-radius: 0.1rem;
                        font-size: .4rem;
                        display: inline-block;
                    }
                }
                .ellipsis{
                    width: 84%;
                }
                .footer_arrow{
                    @include wh(.45rem, .45rem);
                    position: absolute;
                    right: .3rem;
                }
            }
        }
    }
    .activities_details{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #262626;
        z-index: 200;
        width: 100%;
        height: 50%;
        .activities_shoptitle{
            text-align: center;
            @include sc(.8rem, #fff);
        }
        .activities_ratingstar{
            display: flex;
            justify-content: center;
            transform: scale(2.2);
            margin-top: .7rem;
        }
        .activities_list{
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            @include sc(.5rem, #fff);
            li{
                margin-bottom: .2rem;
                .activities_icon{
                    padding: 0 .02rem;
                    display: inline-block;
                    border: 0.025rem solid #fff;
                    border-radius: 0.1rem;
                }
                span{
                    color: #fff;
                    line-height: .6rem;
                }
            }
        }
        .activities_shopinfo{
            p{
                line-height: .7rem;
                @include sc(.5rem, #fff);
            }
        }
        .activities_title_style{
            text-align: center;
            margin-bottom: 1rem;
            span{
                @include sc(.5rem, #fff);
                border: 0.025rem solid #555;
                padding: .2rem .4rem;
                border-radius: 0.5rem;
            }

        }
        .close_activities{
            position: absolute;
            top: .5rem;
            right: .5rem;

        }
    }

    .food_container{
        display: flex;
        flex: 1;
        padding-bottom: 2rem;
      .food_container_details{
        width: 100%;
        overflow-y:scroll;
        img{
          border: none;
          width: 100%;
        }
        .container_details{
          width: 100%;
          p {
            img{
              display: block;
              max-width: 100%;
              height: auto;
            }
          }

        }
      }
    }
    .menu_container{
        display: flex;
        flex: 1;
        overflow-y: hidden;
        position: relative;
        .menu_left{
            width: 3.8rem;
            .menu_left_li{
                padding: .7rem .3rem;
                border-bottom: 0.025rem solid #ededed;
                box-sizing: border-box;
                border-left: 0.15rem solid #f8f8f8;
                position: relative;
                img{
                    @include wh(.5rem, .6rem);
                }
                span{
                    @include sc(.6rem, #666);
                }
                .category_num{
                    position: absolute;
                    top: .1rem;
                    right: .1rem;
                    background-color: #ff461d;
                    line-height: .6rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .6rem;
                    height: .6rem;
                    @include sc(.5rem, #fff);
                    font-family: Helvetica Neue,Tahoma,Arial;
                }
            }
            .activity_menu{
                border-left: 0.15rem solid #3190e8;
                background-color: #fff;
                span:nth-of-type(1){
                    font-weight: bold;
                }
            }
        }
        .menu_right{
            flex: 4;
            overflow-y: auto;
            .menu_detail_header{
                width: 100%;
                padding: .4rem;
                position: relative;
                @include fj;
                align-items: center;
                .menu_detail_header_left{
                    width: 11rem;
                    white-space: nowrap;
                    overflow: hidden;
                    .menu_item_title{
                        @include sc(.7rem, #666);
                        font-weight: bold;
                    }
                    .menu_item_description{
                        @include sc(.5rem, #999);
                        width: 30%;
                        overflow: hidden;
                    }
                }
                .menu_detail_header_right{
                    @include wh(.5rem, 1rem);
                    display: block;
                    @include bis('../../images/icon_point.png');
                    background-size: 100% .4rem;
                    background-position: left center;
                }
                .description_tip{
                    background-color: #39373a;
                    opacity: 0.95;
                    @include sc(.5rem, #fff);
                    position: absolute;
                    top: 1.5rem;
                    z-index: 14;
                    width: 8rem;
                    right: .2rem;
                    padding: .5rem .4rem;
                    border: 1px;
                    border-radius: .2rem;
                    span{
                        color: #fff;
                        line-height: .6rem;
                        font-size: .55rem;
                    }
                }
                .description_tip::after{
                    content: '';
                    position: absolute;
                    @include wh(.4rem, .4rem);
                    background-color: #39373a;
                    top: -.5rem;
                    right: .7rem;
                    transform: rotate(-45deg) translateY(.41rem);
                }
            }
            .menu_detail_list{
                background-color: #fff;
                padding: .6rem .4rem;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                overflow: hidden;
                .menu_detail_link{
                    display:flex;
                    .menu_food_img{
                        margin-right: .4rem;
                        img{
                            @include wh(2rem, 2rem);
                            display: block;
                        }
                    }
                    .menu_food_description{
                        width: 100%;
                        .food_description_head{
                            @include fj;
                            margin-bottom: .2rem;
                            .description_foodname{
                                @include sc(.7rem, #333);
                            }
                            .attributes_ul{
                                display: flex;
                                li{
                                    font-size: .3rem;
                                    height: .6rem;
                                    line-height: .35rem;
                                    padding: .1rem;
                                    border: 1px solid #666;
                                    border-radius: 0.3rem;
                                    margin-right: .1rem;
                                    transform: scale(.8);
                                    p{
                                        white-space: nowrap;
                                    }
                                }
                                .attribute_new{
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    background-color: #4cd964;
                                    @include wh(2rem, 2rem);
                                    display: flex;
                                    align-items: flex-end;
                                    transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                                    border: none;
                                    border-radius: 0;
                                    p{
                                        @include sc(.4rem, #fff);
                                        text-align: center;
                                        flex: 1;
                                    }
                                }
                            }
                        }
                        .food_description_content{
                            @include sc(.5rem, #999);
                            line-height: .6rem;
                        }
                        .food_description_sale_rating{
                            line-height: .8rem;
                            span{
                                @include sc(.5rem, #333);
                            }
                        }
                        .food_activity{
                            line-height: .4rem;
                            span{
                                font-size: .3rem;
                                border: 1px solid currentColor;
                                border-radius: 0.3rem;
                                padding: .08rem;
                                display: inline-block;
                                transform: scale(.8);
                                margin-left: -0.35rem;

                            }
                        }
                    }
                }
                .menu_detail_footer{
                    margin-left: 2.4rem;
                    font-size: 0;
                    margin-top: .3rem;
                    @include fj;
                    .food_price{
                        span{
                            font-family: 'Helvetica Neue',Tahoma,Arial;
                        }
                        span:nth-of-type(1){
                            @include sc(.5rem, #f60);
                            margin-right: .05rem;
                        }
                        span:nth-of-type(2){
                            @include sc(.7rem, #f60);
                            font-weight: bold;
                            margin-right: .3rem;
                        }
                        span:nth-of-type(3){
                            @include sc(.5rem, #666);
                        }
                    }
                }
            }
        }
    }
    .buy_cart_container{
        position: fixed;
        background-color: #ffffff;
        bottom: 0;
        left: 0;
        z-index: 99;
        display: flex;
        @include wh(100%, 2rem);
        .cart_icon_num{
            flex: 1;
            .cart_icon_container{
                display: flex;
                background-color: #3d3d3f;
                position: absolute;
                padding: .4rem;
                border: 0.18rem solid #444;
                border-radius: 50%;
                left: .5rem;
                top: -.7rem;
                .cart_icon{
                    color: #fd5138;
                    @include wh(1.2rem, 1.2rem);
                }
                .cart_list_length{
                    position: absolute;
                    top: -.25rem;
                    right: -.25rem;
                    background-color: #ff461d;
                    line-height: .7rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .7rem;
                    height: .7rem;
                    @include sc(.5rem, #fff);
                    font-family: Helvetica Neue,Tahoma,Arial;
                }
            }
            .move_in_cart{
                animation: mymove .5s ease-in-out;
            }
            .cart_icon_activity{
                 background-color: #3190e8;
            }
            .cart_num{
                @include ct;
                left: 3.5rem;

                div{
                    color: #fff;
                }
                div:nth-of-type(1){
                    font-size: .8rem;
                    font-weight: bold;
                    margin-bottom: .1rem;
                }
                div:nth-of-type(2){
                    font-size: .4rem;
                }
            }
        }
        .gotopay{
            position: absolute;
            right: 0;
            background-color: #fd6e01;
            @include wh(5rem, 100%);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            .gotopay_button_style{
                @include sc(.7rem, #fff);
                font-weight: bold;
            }
        }

        .gotopay2{
          position: absolute;
          right: 5rem;
          background-color: #fea401;
          @include wh(5rem, 100%);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          .gotopay_button_style{
            @include sc(.7rem, #fff);
            font-weight: bold;
          }
        }

        .gotopay_acitvity{
            background-color: #4cd964;
        }
    }
    .cart_food_list{
        position: fixed;
        width: 100%;
        padding-bottom: 2rem;
        z-index: 12;
        bottom: 0;
        left: 0;
        background-color: #fff;
        header{
            @include fj;
            align-items: center;
            padding: .3rem .6rem;
            background-color: #eceff1;
            svg{
                @include wh(.6rem,.6rem);
                vertical-align: middle;
            }
            h4{
                @include sc(.7rem, #666);
            }
            .clear_cart{
                @include sc(.6rem, #666);
            }
        }
        .cart_food_details{
            background-color: #fff;
            max-height: 20rem;
            overflow-y: auto;
            .cart_food_li{
                @include fj;
                padding: .6rem .5rem;
                .cart_list_num{
                    width: 55%;
                    p:nth-of-type(1){
                        @include sc(.7rem, #666);
                        font-weight: bold;
                    }
                    p:nth-of-type(2){
                        @include sc(.4rem, #666);
                    }
                }
                .cart_list_price{
                    font-size: 0;
                    span:nth-of-type(1){
                        @include sc(.6rem, #f60);
                        font-family: Helvetica Neue,Tahoma;

                    }
                    span:nth-of-type(2){
                        @include sc(.7rem, #f60);
                        font-family: Helvetica Neue,Tahoma;
                        font-weight: bold;
                    }
                }
                .cart_list_control{
                    display: flex;
                    align-items: center;
                    span{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    svg{
                        @include wh(.9rem, .9rem);
                        fill: #3190e8;
                    }
                    .specs_reduce_icon{
                        fill: #999;
                    }
                    .cart_num{
                        @include sc(.65rem, #666);
                        min-width: 1rem;
                        text-align: center;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
            }
        }
    }
    .screen_cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 11;
    }
    .change_show_type{
        display: flex;
        background-color: #fff;
        padding: .3rem 0 .6rem;
        border-bottom: 1px solid #ebebeb;
        div{
            flex: 1;
            text-align: center;
            span{
                @include sc(.65rem, #666);
                padding: .2rem .1rem;
                border-bottom: 0.12rem solid #fff;
            }
            .activity_show{
                color: #ff6000;
                border-color: #ff6000;
            }
        }
    }
    .rating_container{
        flex: 1;
        overflow-y: hidden;
        flex-direction: column;
        p, span, li, time{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        .rating_header{
            display: flex;
            background-color: #fff;
            padding: .8rem .5rem;
            margin-bottom: 0.5rem;
            .rating_header_left{
                flex: 3;
                text-align: center;
                p:nth-of-type(1){
                    @include sc(1.2rem, #f60);
                }
                p:nth-of-type(2){
                    @include sc(.65rem, #666);
                    margin-bottom: .1rem;
                }
                p:nth-of-type(3){
                    @include sc(.4rem, #999);
                }
            }
            .rating_header_right{
                flex: 4;
                p{
                    font-size: .65rem;
                    line-height: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    span:nth-of-type(1){
                        color: #666;
                        margin-right: .5rem;
                    }
                    .rating_num{
                        width: 3rem;
                        @include sc(.55rem, #f60);
                    }
                    .delivery_time{
                        @include sc(.4rem, #999);
                    }
                }
            }
        }
        .tag_list_ul{
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            padding: .5rem;
            li{
                @include sc(.6rem, #6d7885);
                padding: .3rem .3rem;
                background-color: #ebf5ff;
                border-radius: 0.2rem;
                border: 1px;
                margin: 0 .4rem .2rem 0;
            }
            .unsatisfied{
                background-color: #f5f5f5;
                color: #aaa;
            }
            .tagActivity{
                background-color: #3190e8;
                color: #fff;
            }
        }
        .rating_list_ul{
            background-color: #fff;
            padding: 0 .5rem;
            .rating_list_li{
                border-top: 1px solid #f1f1f1;
                display: flex;
                padding: .6rem 0;
                .user_avatar{
                    @include wh(1.5rem, 1.5rem);
                    border: 0.025rem;
                    border-radius: 50%;
                    margin-right: .8rem;
                }
                .rating_list_details{
                    flex: 1;
                    header{
                        display: flex;
                        flex: 1;
                        justify-content: space-between;
                        margin-bottom: .3rem;
                        .username_star{
                            @include sc(.55rem, #666);
                            .username{
                                color: #666;
                                margin-bottom: .2rem;
                            }
                            .star_desc{
                                display: flex;
                                align-items: center;
                                .time_spent_desc{
                                    @include sc(.55rem, #666)
                                    margin-left: .15rem;
                                }
                            }
                        }
                        .rated_at{
                            @include sc(.4rem, #999);
                        }
                    }
                  .rating_comment{
                    margin-bottom: .2rem;
                    .comment{
                      font-size: .6rem;
                    }
                  }

                    .food_img_ul{
                        display: flex;
                        flex-wrap: wrap;
                        margin-bottom: .4rem;
                        li{
                            img{
                                @include wh(3rem, 3rem);
                                margin-right: .4rem;
                                display: block;
                            }
                        }
                    }
                    .food_name_ul{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            @include sc(.55rem, #999);
                            width: 2.2rem;
                            padding: .2rem;
                            border: 0.025rem solid #ebebeb;
                            border-radius: 0.15rem;
                            margin-right: .3rem;
                            margin-bottom: 4px;
                        }
                    }
                }
            }
        }
    }
    .specs_cover{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.4);
        z-index: 17;
    }
    .specs_list{
        position: fixed;
        top: 35%;
        left: 15%;
        width: 70%;
        background-color: #fff;
        z-index: 18;
        border: 1px;
        border-radius: 0.2rem;
        .specs_list_header{
            h4{
                @include sc(.7rem, #222);
                font-weight: normal;
                text-align: center;
                padding: .5rem;
            }
            .specs_cancel{
                position: absolute;
                right: .5rem;
                top: .5rem;
            }
        }
        .specs_details{
            padding: .5rem;
            .specs_details_title{
                @include sc(.6rem, #666);
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                padding: .4rem 0;
                li{
                    font-size: .6rem;
                    padding: .3rem .5rem;
                    border: 0.025rem solid #ddd;
                    border-radius: .2rem;
                    margin-right: .5rem;
                    margin-bottom: .2rem;
                }
                .specs_activity{
                    border-color: #fd5138;
                    color: #fd5138;
                }
            }
        }
        .specs_footer{
            @include fj;
            align-items: center;
            background-color: #f9f9f9;
            padding: 0.5rem;
            border: 1px;
            border-bottom-left-radius: .2rem;
            border-bottom-right-radius: .2rem;
            .specs_price{
                span{
                    color: #ff6000;
                }
                span:nth-of-type(1){
                    font-size: .5rem;
                }
                span:nth-of-type(2){
                    font-size: .8rem;
                    font-weight: bold;
                    font-family: Helvetica Neue,Tahoma;
                }
            }
            .specs_addto_cart{
                @include wh(4rem, 1.3rem);
                background-color: #3199e8;
                border: 1px;
                border-radius: 0.15rem;
                @include sc(.6rem, #fff);
                text-align: center;
                line-height: 1.3rem;
            }
        }
    }
    .show_delete_tip{
        position: fixed;
        top: 50%;
        left: 15%;
        width: 70%;
        transform: translateY(-50%);
        background-color: rgba(0,0,0,.8);
        z-index: 18;
        @include sc(.65rem, #fff);
        text-align: center;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.25rem;
    }
    .move_dot{
        position: fixed;
        bottom: 30px;
        left: 30px;

        svg{
            @include wh(.9rem, .9rem);
            fill: #3190e8;
        }
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


  .food_title{
    background-color: #ffffff;
    padding:.3rem .6rem ;
    width: 100%;
    .food_price{
      font-size: .6rem;
      color: #fd5138;
      line-height: 1rem;
    }
    h3{
      font-size: 0.6rem;
    }
    .food_secondary_title{
      font-size: 0.5rem;
      color: #8b8b8c;
    }
  }
    .food_service{
      background-color: #ffffff;
      margin: 0.3rem 0rem;
      .food_service_m{
        font-size: 0.6rem;
        padding: .4rem 0rem;
        border-bottom: 1px solid #f8f8f8;
        span{
          border:1px solid #fd5138;
          border-radius: .1rem;
          color: #fd5138;
          margin-right: .3rem;
          margin-left: .6rem;
        }
      }
      ul{
        list-style: none;
        padding: 0rem .3rem;
        li{
          float: left;
          font-size: 0.6rem;
          padding: .4rem 0rem;
          margin-left: .3rem;
          .iconfont{
            color: #fd5138;
          }
        }
      }

    }


    #msite_banner{
      padding-top: 1.95rem;
    .swiper-container{
    .swiper-slide img{
      height: 10rem;
      width: 100%;
    }
    }
    }

    .specs_details{
      padding: .5rem;
      .specs_details_title{
        @include sc(.6rem, #666);
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        padding: .4rem 0;
        li{
          font-size: .6rem;
          padding: .2rem .3rem;
          border: 0.025rem solid #ddd;
          border-radius: .2rem;
          margin-right: .5rem;
          margin-bottom: .2rem;
        }
        .specs_activity{
          border-color: #fd5138;
          color: #fd5138;
        }
      }
    }

    .specs_details_num{
      padding: .3rem .5rem .5rem .5rem;
      border-top: 1px solid rgb(245, 245, 245);
    }


    .shop-arithmetic-t{
      font-size: .6rem;
      display: inline-block;
      width: 40%;
      float: left;
      margin-top: .5rem;
    }

    .shop-arithmetic{width:27%;height: 1.2rem;display: inline-block; margin-left: 2rem; float: right}
    .shop-arithmetic .minus{display:inline-block;width:1.2rem;text-align:center;background:#e0e0e0;font-size:.6rem; height: 100%;line-height: 1.2rem}
    .shop-arithmetic .failed{color:#d1d1d1;}
    .shop-arithmetic .plus{display:inline-block;width:1.2rem;text-align:center;background:#e0e0e0;font-size:.6rem; height: 100%; line-height: 1.2rem}
    .shop-arithmetic .num{width:32px;text-align:center;border:none;display: inline-block;height:100%;box-sizing:border-box;vertical-align:top;margin:0 -6px;font-size: 0.6rem ;padding-top: .7rem}

    img{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
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

    .bottom-btn{
      position: fixed;
      left:0;
      bottom:0;
      z-index: 10;
      width: 100%;
      height: 2rem;
      display: flex;
      background: #fff;
    }

    .bottom-btn .l{
      float: left;
      /*height: 100rpx;*/
      /*width: 162rpx;*/
      border: 1px solid #f4f4f4;
      display: flex;
      align-items: center;
      justify-content: center;

    }

    .bottom-btn .l.l-collect{
      border-right: none;
      border-left: none;
      text-align: center;
    }


    .bottom-btn .l.l-cart .box{
      position: relative;
      /*height:rem;*/
      width:2.4rem;

    }

    .bottom-btn .l.l-cart .cart-count{
      height:.8rem;
      width: .8rem;
      z-index: 10;
      position: absolute;
      top: -.2rem;
      left: 1.3rem;
      font-size: .6rem;
      background: #fd5138;
      text-align: center;
      color: #fff;
      line-height: .8rem;
      border-radius: 50%;
    }

    .bottom-btn .l.l-cart .icon{
      /*position: absolute;*/
      /*top: 10rpx;*/
      /*left:0;*/
      text-align: center;
      font-size: 1.1rem;
    }


    .bottom-btn .l .icon{
      display: block;
    }


    .bottom-btn .c{
      float: left;
      height: 2rem;
      line-height: 2rem;
      flex: 1;
      text-align: center;
      color: #333;
      border-top: 1px solid #f4f4f4;
      border-bottom: 1px solid #f4f4f4;
      font-size: .8rem;
    }

    .bottom-btn .r{
      border:1px solid #fd5138;
      background: #fd5138;
      float: left;
      height: 2rem;
      line-height: 2rem;
      flex: 1;
      text-align: center;
      color: #fff;
      font-size: .8rem;
    }

    .showcover-enter-active, .showcover-leave-active {
      transition: opacity .3s
    }
    .showcover-enter, .showcover-leave-active {
      opacity: 0
    }
    .back_cover{
      position: fixed;
      @include wh(100%, 100%);
      z-index: 10;
      background-color: rgba(0,0,0,0.3);
    }


</style>
