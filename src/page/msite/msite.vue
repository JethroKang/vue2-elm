<template>
    <div>
    	<head-top signin-up='msite'>
    		<router-link :to="'/search'" class="link_search" slot="search">
	    		<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
    		</router-link>
			<!--<router-link to="/home" slot="msite-title" class="msite_title">-->
				<!--<span class="title_text ellipsis">{{msietTitle}}</span>-->
			<!--</router-link>-->
    	</head-top>

      <banner></banner>

      <nav class="msite_nav">
        <div class="swiper-container" v-if="goodsTypes.length">
            <div class=" food_types_container" >
              <router-link :to="{path: '/food', query: {foodID:foodItem.id,title:foodItem.mobile_name}}" v-for="foodItem in goodsTypes" :key="foodItem.id" class="link_to_food">
                <figure>
                  <img :src="foodItem.thumb">
                  <figcaption>{{foodItem.mobile_name}}</figcaption>
                </figure>
              </router-link>
            </div>
        </div>
        <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
      </nav>

    	<div class="shop_list_container">
        <div class="recommend-container">
          <h3 class="recommend_header">今天推荐<span>SALE</span></h3>
        </div>
	    	<food-list></food-list>
    	</div>

    	<foot-guide></foot-guide>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import headTop from 'src/components/header/head'
import banner from 'src/components/banner/banner'
import footGuide from 'src/components/footer/footGuide'
import foodList from 'src/components/common/foodList'
import Request from 'src/service/api';

export default {

	data(){
        return {
            msietTitle: '请选择地址...', // msiet页面头部标题
            goodsTypes: '',// 食品分类列表
        }
    },
    mounted(){
      Request.Get('speed', {})
        .then((res) => {
          this.goodsTypes = res.data;
          console.log(this.goodsTypes);
        })
    },
    components: {
    	headTop,
    	foodList,
    	footGuide,
      banner
    },
    computed: {
    },
    methods: {
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 8.5rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.5rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 20%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
          margin-left: 0.2rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}


    .recommend-container{
      background-color: #fff;
      .recommend_header{
        text-align: center;
        font-size: 0.8rem;
        margin-top: 0.6rem;
        span{
          color: #f84834;
        }
      }
    }


</style>
