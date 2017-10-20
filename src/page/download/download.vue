<template>
  <div class="address_page">
    <head-top head-title="修改地址" go-back='true'></head-top>
    <section class="page_text_container">
      <section class="section_list">
        <span class="section_left">联系人</span>
        <section class="section_right">
          <input type="text" name="name" placeholder="你的名字" v-model="name" class="input_style">
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">联系电话</span>
        <section class="section_right">
          <div class="phone_add">
            <input type="text" name="phone" placeholder="你的手机号" v-model="phone" class="input_style">
          </div>
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">省份</span>
        <section class="section_right">
          <input type="text" name="province" placeholder="省份" v-model="province" class="input_style">
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">城市</span>
        <section class="section_right">
          <input type="text" name="city" placeholder="城市" v-model="city" class="input_style">
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">县区</span>
        <section class="section_right">
          <input type="text" name="area" placeholder="县区" v-model="area" class="input_style">
        </section>
      </section>

      <section class="section_list">
        <span class="section_left">街道</span>
        <section class="section_right">
          <input type="text" name="street" placeholder="街道" v-model="street" value="" class="input_style">
        </section>
      </section>

      <section class="section_list">
        <span class="section_left">详细地址</span>
        <section class="section_right">
          <input type="text" name="address" placeholder="详细地址" v-model="address" class="input_style">
        </section>
      </section>

    </section>
    <div class="determine" @click="addAddress">确定修改</div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

  import headTop from 'src/components/header/head'
  import {mapState, mapMutations} from 'vuex'
  import {getAddress, getUser, postAddAddress,addressAdd} from 'src/service/getData'
  import alertTip from 'src/components/common/alertTip'
  import Request from 'src/service/api'

  export default {
    data(){
      return{
        name: null, //姓名
        phone: null, //电话
        address_detail: null, //详细地址
        province: null,//省份
        city: null,//城市
        area: null,//县区
        street: null, //街道
        address: null, //详细地址
        showAlert: false, //弹出框
        alertText: null, //弹出框信息
        adderid:null,
        adderDate:''
      }
    },
    created(){
      this.adderid = this.$route.query.id;
    },
    mounted(){
      this.initData();
    },
    components: {
      headTop,
      alertTip,
    },
    computed: {
      ...mapState([
        'userInfo','userToken'
      ]),
    },
    methods: {
      ...mapMutations([
        'CONFIRM_ADDRESS'
      ]),


      //保存地址信息
      async addAddress(){
        if (!(this.userToken)) {
          this.showAlert = true;
          this.alertText = '请登录'
        }else if(!this.name){
          this.showAlert = true;
          this.alertText = '请输入姓名'
        }else if(!this.phone){
          this.showAlert = true;
          this.alertText = '请输入电话号码'
        }else if(!this.province){
          this.showAlert = true;
          this.alertText = '请输入省份'
        }else if(!this.city){
          this.showAlert = true;
          this.alertText = '请输入城市'
        }else if(!this.area){
          this.showAlert = true;
          this.alertText = '请输入县区'
        }else if(!this.street){
          this.showAlert = true;
          this.alertText = '请输入街道'
        }else if(!this.address){
          this.showAlert = true;
          this.alertText = '请输入详细地址'
        }
        let id=this.adderid;
        console.log({token:this.userToken, name:this.name, phone:this.phone, province:this.province, city:this.city, area:this.area, street:this.street, address:this.address});
        Request.Put('address/'+id, {token:this.userToken, name:this.name, phone:this.phone, province:this.province, city:this.city, area:this.area, street:this.street, address:this.address})
          .then((res) => {
            console.log(res);
            //保存成功返沪上一页，否则弹出提示框
            if (res.code === 200) {
              this.CONFIRM_ADDRESS(1);
              this.$router.go(-1);
            }else {
              this.showAlert = true;
              this.alertText = res.msg;
            }
          })
      },

      initData(){
        console.log(this.userToken,this.adderid);
        let id=this.adderid;
        Request.Get('address/'+id, {token:this.userToken,})
          .then((res) => {
            console.log(res);
            if(res.code === 200){
              this.adderDate = res.data;
              this.name = this.adderDate.name;
              this.phone = this.adderDate.phone;
              this.province = this.adderDate.province;
              this.city = this.adderDate.city;
              this.area = this.adderDate.area;
              this.street = this.adderDate.street;
              this.address = this.adderDate.address;
            }

            //保存成功返沪上一页，否则弹出提示框
//            if (res.code !== 200) {
//              this.showAlert = true;
//              this.alertText = res.msg;
//            }else {
//              this.CONFIRM_ADDRESS(1);
//              this.$router.go(-1);
//            }
          });



      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .address_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;
    p, span, input{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .page_text_container{
    background-color: #fff;
    padding: 0 .7rem;
  }
  .section_list{
    display: flex;
    border-bottom: 0.025rem solid #f5f5f5;
    .section_left{
      @include sc(.7rem, #333);
      flex: 2;
      line-height: 2.5rem;
    }
    .section_right{
      flex: 5;
      .input_style{
        width: 100%;
        height: 2.5rem;
        @include sc(.7rem, #999);
      }
      .phone_bk{
        border-top: 0.025rem solid #f5f5f5;
      }
      .phone_add{
        @include fj;
        align-items: center;
      }
      .choose_sex{
        display: flex;
        line-height: 2.5rem;
        border-top: 0.025rem solid #f5f5f5;
        .choose_option{
          @include sc(.7rem, #333);
          display: flex;
          align-items: center;
          margin-right: .8rem;
          svg{
            margin-right: .3rem;
            @include wh(.8rem, .8rem);
            fill: #ccc;
          }
          .choosed{
            fill: #4cd964;
          }
        }
      }
      .choose_address{
        @include sc(.7rem, #999);
        line-height: 2.5rem;
        border-bottom: 0.025rem solid #f5f5f5;
      }
    }
  }
  .determine{
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: .6rem;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
