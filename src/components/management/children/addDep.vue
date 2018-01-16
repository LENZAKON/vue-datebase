<template>
  <div class="addDep">
    <form-module :addAddShow="addShow" @closeFormModule="closeFormModule">
      <p class="a-title" slot="form-title">添加门诊</p>
      <div class="a-items" slot="form-items">
        <div class="a-item">
          <span class="a-info">门诊名称：</span>
          <input id="a-name" type="text" v-model="department"/>
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
  import {addDep} from 'api/management.js'

  export default {
    data() {
      return {
        addShow: true,
        department: ''
      }
    },
    methods: {
      closeFormModule() {
        this.addShow = false
        this.$router.push('/management/queryDep')
      },
      showFormModule() {
        this.addShow = true
      },
      comAdd() {
        let data = {
          name: this.department,
          counts: '20'
        }
        addDep(data).then((res) => {
          res = res.data
          if (res.success) {
            this.addShow = false
            this.$router.push('/management/queryDep')
          } else {
            alert('添加出错')
            this.$router.push('/loginsy')
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

  #a-name, #a-address, #ag-address
    border 1px solid $color-theme-d
    outline none

  .a-btn
    padding-top 1.6rem

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
