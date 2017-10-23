<template>
    <div>

      <header class="m_header">
        <div class="m_header_box" id="my_search">
          <form action="#">
            <span class="icon_search"><img src="../../images/search.png" class="search-ico"></span>
            <input type="search" class="search" placeholder="请输入美食名称" @click="goSearch($event)">
          </form>
        </div>
      </header>

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
import {mapState, mapMutations} from 'vuex'
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
            token:null,
        }
    },
    created(){
      if (!(this.userToken)) {
        window.location.href='https://master.fstuis.com/api/v1/oauth/oauth_call?url_call=' + encodeURIComponent('?#/profile');
      }
    },
    mounted(){
      this.initData();
    },
    components: {
    	headTop,
    	foodList,
    	footGuide,
      banner
    },
    computed: {
      ...mapState([
        'userInfo',
        'token',
        'userToken'
      ]),


    },
    methods: {

      ...mapMutations([
        'RECORD_USERINFO','RECORD_USERTOKEN','RECORD_WETOKEN'
      ]),

      async initData(){

        Request.Get('speed', {})
          .then((res) => {
            this.goodsTypes = res.data;
//            console.log(this.goodsTypes);
          })
      },

      goSearch(event){
        this.$router.push('/search');
        window.event? window.event.returnValue = false : event.preventDefault();
      }
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
			width: 25%;
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

    .m_header {
      background-color: $blue;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      @include wh(100%, 1.95rem);
    }

    .m_header .m_header_box {
      height: 1.95rem;
      background: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .m_header_box form {
      width: 93%;
      height: 1.95rem;
      margin-left: .6rem;
      margin-right: .6rem;
      float: left;

    }

    .m_header_box form .search {
      width: 100%;
      height: 1.2rem;
      border-radius: 1rem;
      font-size: 0.6rem;
      padding-left: 1.4rem;
      margin-top: 0.375rem;
    }

    .m_header_box form .search-ico{
      top:-5px;
      left: 4px;
      width: 15px;
      height: 15px;
    }

    .m_header_box form .icon_search {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 22px;
      top: 6px;
      background-position: -60px -109px;
    }

    .m_header_box .logo_btn {
      width: 10%;
      height: 1.95rem;
      color: #fff;
      font-size: .6rem;
    }


</style>
