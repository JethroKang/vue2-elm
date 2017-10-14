<template>

	<div class="shoplist_container">

    <section class="change_show_type" ref="chooseType">
      <div>
        <span :class='{activity_show: changeShowType =="food"}' @click="changeShowType='food'"><i class="icon iconfont">&#xe602;</i>吃货至爱</span>
      </div>
      <div>
        <span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'"><i class="icon iconfont">&#xe668;</i>小编推荐</span>
      </div>
    </section>
    <transition name="fade-choose">
      <section v-show="changeShowType =='food'" class="food_container">
        <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
          <router-link :to="{path: 'shop', query:{id: item.id}}" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">
            <section class="goods_hot">
              <div class="goods_hot_img">
                <img :src="item.thumb" >
              </div>
              <div class="goods_hot_content">
                <div class="goods_hot_content_inner">
                  <p class="goods_hot_title">{{item.name}}</p>
                  <p class="goods_hot_p">{{item.outline}}</p>
                  <p class="goods_hot_price">￥ {{item.price}}</p>
                </div>
              </div>
            </section>
          </router-link>
        </ul>
        <ul v-else class="animation_opactiy">
          <li class="list_back_li" v-for="item in 10" :key="item">
            <img src="../../images/shopback.svg" class="list_back_svg">
          </li>
        </ul>
      </section>
    </transition>
    <transition name="fade-choose">
      <section class="rating_container" id="ratingContainer" v-show="changeShowType =='rating'">
        <ul v-load-more="loaderMore" v-if="goodsRecArr.length" type="2">
          <router-link :to="{path: 'shop', query:{id: item.id}}" v-for="item in goodsRecArr" tag='li' :key="item.id" class="shop_li">
            <section class="goods_hot">
              <div class="goods_hot_img">
                <img :src="item.thumb" >
              </div>
              <div class="goods_hot_content">
                <div class="goods_hot_content_inner">
                  <p class="goods_hot_title">{{item.name}}</p>
                  <p class="goods_hot_p">{{item.outline}}</p>
                  <p class="goods_hot_price">￥ {{item.price}}</p>
                </div>
              </div>
            </section>
          </router-link>
        </ul>
        <ul v-else class="animation_opactiy">
          <li class="list_back_li" v-for="item in 10" :key="item">
            <img src="../../images/shopback.svg" class="list_back_svg">
          </li>
        </ul>
      </section>
    </transition>


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
import {showBack, animate} from 'src/config/mUtils'
import {loadMore, getImgPath} from './mixin'
import loading from './loading'
import ratingStar from './ratingStar'
import Request from 'src/service/api';

export default {
	data(){
		return {
			offset: 1, // 批次加载店铺列表，每次加载20个 limit = 20
      changeShowType: 'food',
			shopListArr:[], // 列表数据
      goodsRecArr:[],// 列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
      current:1,
      size:15,
		}
	},
	mounted(){
		this.initData();
	},
	components: {
		loading,
		ratingStar,
	},
	mixins: [loadMore, getImgPath],
	computed: {
		...mapState([
			'latitude','longitude'
		]),
	},
	updated(){
//		 console.log(this.supportIds, this.sortByType)
	},
	methods: {
		async initData(){
      //吃货最爱
      Request.Get('goods_hot', {current:this.current,size:this.size})
        .then((res) => {
          this.shopListArr  = res.data;
        });
      //小编推荐
      Request.Get('goods_rec', {current:this.current,size:this.size})
        .then((res) => {
          this.goodsRecArr  = res.data;
//          console.log(this.goodsRecArr);
        });

      //判断数据的长度，控制下拉加载
			if (this.shopListArr.length < 2) {
				this.touchend = true;
			}
			this.hideLoading();
			//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
			showBack(status => {
				this.showBackStatus = status;
			});
		},
		//到达底部加载更多数据
		async loaderMore(){
			if (this.touchend) {
        console.log("------end-------");
				return
			}
			//防止重复请求
			if (this.preventRepeatReuqest) {
				return
			}
			this.showLoading = true;
			this.preventRepeatReuqest = true;

			//数据的定位加20位
			this.offset += 1;
      Request.Get('goods_hot', {current:this.offset,size:this.size})
        .then((res) => {
          this.shopListArr = [...this.shopListArr, ...res];
        });

//			let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
//			this.hideLoading();
//			this.shopListArr = [...this.shopListArr, ...res];
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
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			this.showLoading = false;
		},
	},
	watch: {

	}
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.shoplist_container{
		background-color: #fff;
		margin-bottom: 2rem;
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
</style>


<style lang="scss" scoped>
  @import 'src/style/mixin';
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
        color: #4693d4;
        .iconfont{
          color: #4693d4;
        }
      }
      .activity_show{
        color: #ffffff;
        font-size: .6rem;
        padding: .3rem .8rem;
        background-color: #00a2ea;
        border-radius: .6rem;
        .iconfont{
          color: #ffffff;
        }
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

  .goods_hot{
    background-color: #ffffff;
    width: 100%;
    .goods_hot_img{
      width: 100%;
      height: 8.5rem;
      overflow: hidden;
      img{
        width: 100%;
        height: 8.5rem;
      }
    }
    .goods_hot_content{
      width: 100%;
      padding: .3rem 0rem;
      .goods_hot_content_inner{
        padding: 0rem .3rem;
        position: relative;
        .goods_hot_title{
          font-size: .6rem;
          font-weight: bold;
        }
        .goods_hot_p{
          font-size: .6rem;
          color: #333333;
        }
        .goods_hot_price{
          position: absolute;
          top: .3rem;
          right: .3rem;
          color: #fd5138;
          font-size: .6rem;
          font-weight: bold;
        }
      }
    }

  }


</style>
