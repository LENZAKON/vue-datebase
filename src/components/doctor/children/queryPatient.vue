<template>
  <div class="queryPatient">
    <div class="table-wrapper">
      <k-table @diagnosis="diagnosis" :type="type"></k-table>
    </div>
    <div class="form-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule">
        <p class="a-title" slot="form-title">病人信息</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">姓名：</span>
            <input readonly id="a-name" type="text"/>
          </div>
          <div class="a-item">
            <span class="a-info">年龄：</span>
            <input readonly id="a-address" type="text"/>
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
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        type: 2,
        modifyShow: false
      }
    },
    components: {
      KTable,
      FormModule
    },
    methods: {
      diagnosis(id) {
        // 要诊断的病人的id
        console.log(id)
        this.setPatientId(id)
        this.modifyShow = true
      },
      closeFormModule() {
        this.modifyShow = false
      },
      comModify() {
        // 确认病人信息
      },
      ...mapMutations({
        setPatientId: 'SET_PATIENTID'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .queryPatient
    display inline-block
    .table-wrapper
      display inline-block

  #a-name, #a-address
    outline none

  .btn--m
    padding 0.4rem 1.4rem
    border-radius 4px
  .btn--green
    background $color-theme
    &:hover
      background $color-theme-d
</style>
