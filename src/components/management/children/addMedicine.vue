<template>
  <div class="addMedicine">
    <form-module :addAddShow="addShow" @closeFormModule="closeFormModule">
      <p class="a-title" slot="form-title">添加药品</p>
      <div class="a-items" slot="form-items">
        <div class="a-item">
          <span class="a-info">药品名：</span>
          <input id="a-name" type="text" v-model="medicineName"/>
        </div>
        <div class="a-item">
          <span class="a-info">价格：</span>
          <input id="a-price" type="text" v-model="medicinePrice"/>
        </div>
      </div>
      <div class="a-btn" slot="form-btn">
        <a class="btn btn--m btn--green" href="javascript:;" @click="comAdd">确认</a>
        <a class="btn btn--m" href="javascript:;" @click="closeFormModule">取消</a>
      </div>
    </form-module>
  </div>
</template>
<script type="text/ecmascript-6">
  import FormModule from 'base/formModule/formModule'
  import {addMedicine} from 'api/management.js'

  export default {
    data() {
      return {
        addShow: true,
        medicineName: '',
        medicinePrice: ''
      }
    },
    methods: {
      closeFormModule() {
        this.medicineName = ''
        this.medicinePrice = ''
        this.addShow = false
        this.$router.push('/management/queryMedicine')
      },
      showFormModule() {
        this.addShow = true
      },
      comAdd() {
        let data = {
          name: this.medicineName,
          price: this.medicinePrice
        }
        addMedicine(data).then((res) => {
          res = res.data
          if (res.success) {
            this.addShow = false
            this.$router.push('/management/queryMedicine')
          }
        })
      }
    },
    components: {
      FormModule
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .a-btn
    padding-top 1.6rem

  #a-name, #a-address, #a-price
    border 1px solid $color-theme-d
    outline none

  .btn--m
    padding 0.4rem 1.4rem
    border-radius 4px
  .btn--green
    background $color-theme
    &:hover
      background $color-theme-d

  .a-info
    display inline-block
    width 20%
    text-align right
</style>
