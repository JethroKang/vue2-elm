<template>
    <section id='foot_guide'>

        <section @click = "gotoAddress('/msite')" class="guide_item">
                  <img src="../../../src/images/Home_action.png" style="width: 1.2rem;height: 1.2rem;" v-if="this.$route.path == '/msite'"/>
                  <img src="../../../src/images/Home.png" style="width: 1.2rem;height: 1.2rem;" v-else/>
                  <span >首页</span>
        </section>

        <section @click = "gotoAddress('/shopcart')" class="guide_item">
                  <img src="../../../src/images/Shopcat_action.png" style="width: 1.2rem;height: 1.2rem;" v-if="this.$route.path == '/shopcart'"/>
                  <img src="../../../src/images/Shopcat.png" style="width: 1.2rem;height: 1.2rem;" v-else/>
                  <span >购物车</span>
        </section>

        <section @click = "gotoAddress('/profile')" class="guide_item">
                  <img src="../../../src/images/Personal_action.png" style="width: 1.2rem;height: 1.2rem;" v-if="this.$route.path == '/profile'"/>
                  <img src="../../../src/images/Personal.png" style="width: 1.2rem;height: 1.2rem;" v-else/>
                  <span>我的</span>
        </section>

    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
              changeShowType:null,
            }
        },
        created(){

        },
        mounted(){

        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
        	gotoAddress(path){
//        	  console.log(path);
        		this.$router.push(path);
        		this.changeShowType = this.$route.path;
        	}
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		.icon_style{
			@include wh(.8rem, .8rem);
			margin-bottom: .2rem;
			margin-top: .3rem;
			fill: #ccc;
		}
		span{
			@include sc(.45rem, #666);
		}
    }

    .activity_show{
      color: #00a2ea;
    }

</style>
