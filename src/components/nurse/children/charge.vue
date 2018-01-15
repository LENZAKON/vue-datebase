<template>
  <div class="charge">
    <div class="table-wrapper">
      <k-table :cloumn="cloumn" :type=type :row="row" @charge="charge"></k-table>
    </div>
    <div class="from-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule">
        <p class="a-title" slot="form-title">药单信息</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">病人名：</span>
            <input id="a-name" type="text" v-model="name"/>
          </div>
        </div>
        <div class="a-btn" slot="form-btn">
          <a class="btn btn--m btn--green" href="javascript:;" @click="comModify">确认</a>
          <a class="btn btn--m" href="javascript:;" @click="closeFormModule">取消</a>
        </div>
      </form-module>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import KTable from 'base/table/table'
  import FormModule from 'base/formModule/formModule'

  export default {
    data() {
      return {
        cloumn: [],
        row: [],
        modifyShow: false,
        name: '',
        type: 3
      }
    },
    methods: {
      charge(id) {
        this.modifyShow = true
        console.log(id)
      },
      closeFormModule() {
        this.modifyShow = false
      },
      comModify() {

      }
    },
    components: {
      KTable,
      FormModule
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  #a-name
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
