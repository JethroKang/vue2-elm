<template>
	<div class="shoplist_container">
		<ul v-load-more="loaderMore"  type="1">
			<router-link :to="{path: '/shop', query:{id: item.id}}" v-for="item in shopListArr.data" tag='li' :key="item.id" >
        <div class="shoplist_img">
          <img :src="item.thumb"/>
        </div>
        <div class="shoplist_inner">
          <p class="shoplist_title">{{item.name}}</p>
          <p class="shoplist_price">￥ {{item.price}}</p>
        </div>
			</router-link>
      <div style="clear: both"></div>
		</ul>
		<!--<ul v-else class="animation_opactiy">-->
			<!--<li class="list_back_li" v-for="item in 10" :key="item">-->
				<!--<img src="../../images/shopback.svg" class="list_back_svg">-->
			<!--</li>-->
		<!--</ul>-->
		<p v-if="touchend" class="empty_data">没有更多了</p>
		<aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
		<div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {goodsTypeRec,goodsTypeRecHot,goodsTypeRecNew,goodsTypeRecRec} from 'src/service/getData'
import {imgBaseUrl} from 'src/config/env'
import {showBack, animate} from 'src/config/mUtils'
import {loadMore, getImgPath} from './mixin'
import loading from './loading'
import ratingStar from './ratingStar'
import Request from '../../service/api'

export default {
  data(){
    return {
      changeShowType: 'food',
      shopListArr:[], // 商品列表数据
      preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
      showBackStatus: false, //显示返回顶部按钮
      showLoading: false, //显示加载动画
      touchend: false, //没有更多数据
      current:1,
      size:50,
      type:true,
      shopListArrData:[],
    }
  },
  mounted(){
    this.initData();
  },
  components: {
    loading,
    ratingStar,
  },
  props: ['foodID','screenType','numCounter'],
  mixins: [loadMore, getImgPath],
  computed: {
    ...mapState([
      'latitude','longitude'
    ]),
  },
  updated(){
    //监听父级是否有值传递过来
		 console.log(this.screenType)
  },
  methods: {
    async initData(){
      //获取数据
      console.log(this.foodID);
      Request.Get('goods', {classify_id:this.foodID,current:this.current, size:this.size})
        .then((res) => {
//          console.log(res)
          this.shopListArr = res;
//          console.log(this.shopListArr);
          this.shopListArrData= this.shopListArr.data;
          console.log(this.shopListArrData);
        });
        if (this.shopListArrData.length < 20) {
          this.touchend = true;
        }
//      this.hideLoading();
      //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
      showBack(status => {
        this.showBackStatus = status;
      });
    },
    //到达底部加载更多数据
    async loaderMore(){
      if (this.touchend) {
        return
      }
      //防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.showLoading = false;
      this.preventRepeatReuqest = true;
      //数据的定位加20位
      this.offset += 20;
      let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
//      this.hideLoading();
      this.shopListArr = [...this.shopListArr, ...res];
      //当获取数据小于20，说明没有更多数据，不需要再次请求数据
      if (res.length < 20) {
        this.touchend = true;
        return
      }
      this.preventRepeatReuqest = false;
    },
    //返回顶部
    backTop(){
      animate(document.body, {scrollTop: '0'}, 400,'ease-out');
    },
    //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
    async listenPropChange(){
      this.showLoading = true;
      if(this.screenType === 'hot'){
        Request.Get('goods', {classify_id:this.foodID,current:this.current,size:this.size,type:"is_hot"})
          .then((res) => {
            console.log(res)
            this.shopListArr = res;
          })
        this.hideLoading();
      }else if(this.screenType === 'rec'){
        Request.Get('goods', {classify_id:this.foodID,current:this.current,size:this.size,type:"is_rec"})
          .then((res) => {
            console.log(res)
            this.shopListArr = res;
          })
        this.hideLoading();
      }else if(this.screenType === 'new') {
        Request.Get('goods', {classify_id:this.foodID,current:this.current,size:this.size,type:"is_new"})
          .then((res) => {
            console.log(res)
            this.shopListArr = res;
          })
        this.hideLoading();
      }
    },
    //开发环境与编译环境loading隐藏方式不同
    hideLoading(){
      this.showLoading = false;
    },
  },
  watch: {
    //监听父级传来的排序方式
    screenType: function (value){
      this.listenPropChange();
    },
    //监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
    confirmSelect: function (value){
      this.listenPropChange();
      this.$emit('DidConfrim');
    },
  }
}


</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.shoplist_container{
		/*background-color: #fff;*/
		/*margin-bottom: 2rem;*/
    ul{
      margin: 0rem 0.3rem;
      li{
        width: 50%;
        float: left;
        padding: 0rem .2rem;
        margin: 0.2rem 0rem;
      }
    }
	}
	.shop_li{
		display: flex;

		/*border-bottom: 0.025rem solid #f1f1f1;*/
		/*padding: 0.7rem 0.4rem;*/
	}
	.shop_img{
		@include wh(2.7rem, 2.7rem);
		display: block;
		margin-right: 0.4rem;
	}
	.list_back_li{
		height: 4.85rem;
		.list_back_svg{
			@include wh(100%, 100%)
		}
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
			@include fj;
			align-items: center;
			.shop_title{
				width: 8.5rem;
				color: #333;
				padding-top: .01rem;
				@include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem;
				line-height: .6rem;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.8);
				margin-right: -0.3rem;
				.supports{
					@include sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
			}
		}
		.rating_order_num{
			@include fj(space-between);
			height: 0.6rem;
			margin-top: 0.52rem;
			.rating_order_num_left{
				@include fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
						@include sc(0.4rem, #ff6000);
						margin: 0 0.2rem;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left: -0.2rem;
					@include sc(0.4rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				align-items: center;
				transform: scale(.7);
				min-width: 5rem;
				justify-content: flex-end;
				margin-right: -0.8rem;
				.delivery_style{
					font-size: 0.4rem;
					padding: 0.04rem 0.08rem 0;
					border-radius: 0.08rem;
					margin-left: 0.08rem;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: $blue;
					border: 0.025rem solid $blue;
				}
				.delivery_right{
					color: $blue;
					border: 0.025rem solid $blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.52rem;
			@include fj;
			@include sc(0.5rem, #333);
			.fee{
				transform: scale(.9);
				@include sc(0.5rem, #666);
			}
			.distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: $blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
		@include font(0.6rem, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		@include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			@include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}



  .shoplist_img{
    width: 100%;
    /*margin: .2rem;*/
    height: 6rem;
    img{
      width: 100%;
      height: 6rem;
    }
  }

  .shoplist_inner{
    background-color: #ffffff;
    height: 2rem;
    padding: 0rem .3rem;

    .shoplist_title{
      font-size: .6rem;
    }
    .shoplist_price{
      font-size: .6rem;
      color: #fd5138;
    }
  }
</style>
