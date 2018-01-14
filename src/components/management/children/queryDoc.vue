<template>
  <div class="queryDoc">
    <div class="table-wrapper">
      <k-table @modifyMes="modifyMes" @deleteMes="deleteMes"></k-table>
    </div>
    <div class="from-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule" @queryDoc="queryDoc">
        <p class="a-title" slot="form-title">修改医生账号</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">账号：</span>
            <input id="a-name" type="text" readonly/>
          </div>
          <div class="a-item">
            <span class="a-info">旧密码：</span>
            <input id="a-address" type="text" readonly v-model="oldPassword"/>
          </div>
          <div class="a-item">
            <span class="a-info">新密码：</span>
            <input id="an-address" type="password" v-model="newPassword"/>
          </div>
          <div class="a-item">
            <span class="a-info">再次输入：</span>
            <input id="ang-address" type="password" v-model="newAPassword" ref="again"/>
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
        id: '',
        modifyShow: false,
        ifShow: true,
        account: '',
        oldPassword: '',
        newPassword: '',
        newAPassword: ''
      }
    },
    watch: {
      newAPassword(value) {
        if (value !== this.newPassword) {
          this.$refs.again.style.borderColor = 'red'
        } else {
          this.$refs.again.style.borderColor = '#1fcab3'
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      modifyMes(id) {
        console.log(id)
        this.setIsQueryDoc(true)
        this.setDoctorId(id)
        this.setIsQueryNurse(false)
        this.setNurseId('')
        this.modifyShow = true
      },
      deleteMes(id) {
        console.log(id)
      },
      delDoc() {
      },
      comModify() {
      },
      closeFormModule() {
        this.modifyShow = false
      },
      queryDoc(id) {
        console.log('查询具体医生')
      },
      ...mapMutations({
        setIsQueryDoc: 'SET_ISQUERYDOC',
        setDoctorId: 'SET_DOCTORID',
        setIsQueryNurse: 'SET_ISQUERYNURSE',
        setNurseId: 'SET_NURSEID'
      })
    },
    components: {
      KTable,
      FormModule
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~common/stylus/variable"
  .queryDoc
    display inline-block
    .table-wrapper
      display inline-block

  #an-address, #ang-address
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
