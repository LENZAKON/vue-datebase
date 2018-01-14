<template>
  <div class="addConsultingRoom">
    <form-module :addAddShow="addShow" @closeFormModule="closeFormModule">
      <p class="a-title" slot="form-title">添加科室</p>
      <div class="a-items" slot="form-items">
        <div class="a-item">
          <span class="a-info" id="a-spe">所属门诊：</span>
          <div class="dropdown-box-wrapper">
            <dropdown-box ref="dropDownBox" :title="title" :list="list" @select="selectDep"></dropdown-box>
          </div>
        </div>
      </div>
      <div class="a-items" slot="form-items">
        <div class="a-item">
          <span class="a-info">科室地址：</span>
          <input id="a-name" type="text" v-model="consultingRoomLocation"/>
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
  import DropdownBox from 'base/dropdownBox/dropdownBox'
  import {queryDesps, addDepConsultingRoom} from 'api/management.js'

  export default {
    created() {
      this.queryDeps()
    },
    data() {
      return {
        addShow: true,
        consultingRoomLocation: '',
        title: '选择诊所',
        list: [],
        selectDepId: ''
      }
    },
    methods: {
      closeFormModule() {
        this.addShow = false
      },
      comAdd() {
        let data = {
          location: this.consultingRoomLocation,
          departmentId: this.selectDepId
        }
        addDepConsultingRoom(data).then((res) => {
          res = res.data
          if (res.success) {
            console.log(res)
            this.addShow = false
            this.$router.push('/management/queryConsultingRoom')
          }
        })
      },
      getDepName() {
        let name
        this.title = this.list.forEach((item) => {
          if (item.id === this.selectDepId) {
            name = item.name
          }
        })
        return name
      },
      selectDep(id) {
        this.selectDepId = id
        console.log(this.selectDepId)
        this.title = this.getDepName()
        this.$refs.dropDownBox.changeShow()
      },
      queryDeps() {
        queryDesps().then((res) => {
          res = res.data
          res.list.forEach((item) => {
            delete item.counts
          })
          this.list = res.list
        })
      }
    },
    components: {
      FormModule,
      DropdownBox
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .a-item
    position relative

  .dropdown-box-wrapper
    position absolute
    right 12rem
    top -6px
    display inline-block
    z-index 10

  #a-spe
    position relative
    right 6.8rem

  #a-name, #a-address, #ad-name
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
