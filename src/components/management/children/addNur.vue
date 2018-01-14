<template>
  <form-module :addAddShow="addShow" @closeFormModule="closeFormModule">
    <p class="a-title" slot="form-title">添加护士账号</p>
    <div class="a-items" slot="form-items">
      <div class="a-item">
        <span class="a-info">账号：</span>
        <input id="a-name" type="text" v-model="account"/>
      </div>
      <div class="a-item">
        <span class="a-info">密码：</span>
        <input id="a-address" type="password" v-model="password"/>
      </div>
      <div class="a-item">
        <span class="a-info">再次输入：</span>
        <input id="ag-address" type="password" v-model="againPassword" ref="again"/>
      </div>
    </div>
    <div class="a-btn" slot="form-btn">
      <a class="btn btn--m btn--green" href="javascript:;" @click="comAdd">确认</a>
      <a class="btn btn--m" href="javascript:;" @click="closeFormModule">取消</a>
    </div>
  </form-module>
</template>
<script type="text/ecmascript-6">
  import FormModule from 'base/formModule/formModule'
  import {mapMutations} from 'vuex'

  export default {
    created() {
      this.setIsQueryNurse(false)
      this.setNurseId('')
      this.setIsQueryDoc(false)
      this.setDoctorId('')
    },
    data() {
      return {
        addShow: true,
        account: '',
        password: '',
        againPassword: ''
      }
    },
    watch: {
      againPassword(value) {
        if (value !== this.password) {
          this.$refs.again.style.borderColor = 'red'
        } else {
          this.$refs.again.style.borderColor = '#1fcab3'
        }
      }
    },
    methods: {
      closeFormModule() {
        this.addShow = false
      },
      comAdd() {
      },
      showFormModule() {
        this.addShow = true
      },
      ...mapMutations({
        setIsQueryNurse: 'SET_ISQUERYNURSE',
        setNurseId: 'SET_NURSEID',
        setIsQueryDoc: 'SET_ISQUERYDOC',
        setDoctorId: 'SET_DOCTORID'
      })
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
