 <template>
  	<div class="rating_page">
        <head-top head-title="编辑地址" go-back='true'>
        	<span slot="edit" class="edit" @click="editThing">{{editText}}</span>
        </head-top>
        <section class="address">
        	<ul class="addresslist">
        		<!--<li v-for="(item,index) in adressList.data">-->
              <router-link :to="{path:'/download', query:{id:item.id}}" tag="li" v-for="(item,index) in adressList.data">
        			<div>
        				<p>{{item.address}}</p>
        				<p><span>{{item.phone}}</span></p>
        			</div>
        			<div class="deletesite" v-if="deletesite">
        				<span @click="addressDelete(index ,item.id)">x</span>
        			</div>
              </router-link>
        		<!--</li>-->
        	</ul>
			<router-link to='/profile/info/address/add'>
				<div class="addsite">
						<span>新增地址</span>
						<span class="addsvg">
							<svg fill="#d8d8d8">
							    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
							</svg>
						</span>
				</div>
			</router-link>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {getImgPath} from 'src/components/common/mixin'
    import alertTip from 'src/components/common/alertTip'
    import {mapState,mapActions,} from 'vuex'
    import {getAddressList, deleteAddress,getaddress,addressDelete} from 'src/service/getData'
    import Request from 'src/service/api'

    export default {
      data(){
            return{
              deletesite:false, //是否编辑状态
              editText:'编辑',
              adressList:[], //地址列表
              showAlert: false, //显示提示组件
              current:1,
              size:5,
              deleteList:null

            }
        },
        mounted(){
            this.initData();
        },
        mixins: [getImgPath],
        components: {
            headTop,
        },
        computed:{
             ...mapState([
                'userInfo','removeAddress','userToken','newAddress'
            ]),

        },
        props:[],
        methods: {
        	...mapActions([
                'saveAddress'
            ]),
            //初始化信息
          async initData(){
                if (this.userToken) {
                  Request.Get('address', {current:this.current,size:this.size,token:this.userToken})
                    .then((res) => {
                      console.log(res);
                      this.adressList = res;
                      console.log(this.adressList);
                    })

//                  this.adressList = await getaddress(this.current,this.size,this.userInfo.token);
//                  console.log(this.adressList);
                }
            },
            //编辑
            editThing(){
            	if(this.editText == '编辑'){
            		this.editText='完成';
            		this.deletesite=true;
            	}else{
            		this.editText='编辑';
            		this.deletesite=false;
            	}
            },
            //删除地址
            async addressDelete(index,id){

//                console.log(id);
//                console.log(this.userInfo.token);
//
                console.log(index);

                if (this.userToken) {
                    Request.Delete('address/' + id, { token: this.userToken })
                    .then((res) => {
//                      console.log(res);
                      if(res.code === 200){
                        this.showAlert = true;
                        this.alertText = res.msg;
                        this.deleteList = res.data;
                      }
                    })
                }
            },
          closeTip(){
            this.showAlert = false;
          }
        },
        watch: {
          deleteList: function (value) {
            this.initData();
            },
          newAddress: function (value) {
            this.initData();
          },
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .edit{
    	right: 0.4rem;
        @include sc(0.7rem, #fff);
        @include ct;
    }
    .address{
    	width:100%;
    	margin-top:.4rem;
    	border-top:1px solid #d9d9d9;
    	border-bottom:1px solid #d9d9d9;
    	.addresslist{
    		background:#fff;
    		li{
    			border-bottom:1px solid #d9d9d9;
    			padding:.4rem;
    			@include fj(space-between);
    			p{
    				line-height:.9rem;
    				@include sc(.6rem,#333);
    				span{
    					display:inline-block;
    					@include sc(.6rem,#333);
    				}
    			}
    			.deletesite{
    				display:flex;
    				align-items:center;
    				span{
    					display:block;
    					@include sc(.8rem,#999)
    				}
    			}
    		}
    		/*li:nth-of-type(1){*/
    			/*background:#FFF8C3;*/
    		/*}*/
    	}
    	.addsite{
    		margin-top:.4rem;
    		background:#fff;
    		padding:.2rem .4rem;
    		border-top:1px solid #d9d9d9;
    		@include fj(space-between);
    		span{
    			display:block;
    			@include sc(.7rem,#333);
    			line-height:1.4rem;
    		}
    		.addsvg{
    			@include wh(.66667rem,1.4rem);
    			svg{
    				@include wh(100%,100%);
    			}
    		}
    	}
    }
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
