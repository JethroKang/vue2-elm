<template>
  <div id='msite_banner'>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in indexBanner.data">
          <router-link :to="item.url" tag="a">
          <img :src="item.mobile_thumb" >
          </router-link>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import {indexBanner} from '../../service/getData'
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'
  import Request from '../../service/api';

  export default {
    data(){
      return{
        indexBanner:'', //获取当前首页的数据
        shopId:8,
      }
    },

    mounted(){
      // 获取首页轮播图
      Request.Get('slides', {})
        .then((res) => {
//          console.log(res)
          this.indexBanner =res;
//          console.log(this.indexBanner);
        }).then(() => {
        //初始化swiper
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true,
          observer:true,
          observeParents:true,
          autoplayDisableOnInteraction : false,
          autoplay:2000
        });
      })
    },
  }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #msite_banner{
      padding-top: 1.95rem;
      .swiper-container{
        .swiper-slide img{
          height: 8.5rem;
          width: 100%;
        }
      }
    }
</style>
