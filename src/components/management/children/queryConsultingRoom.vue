<template>
  <div class="queryConsultingRoom">
    <div class="dropdownBox-wrapper">
      <dropdown-box ref="dropDownBox" :title="title" :list="list" @select="selectDep"></dropdown-box>
    </div>
    <div class="table-wrapper" v-show="selectDepId">
      <k-table :cloumn="cloumn" :row="row" @modifyMes="modifyMes" @deleteMes="deleteMes"></k-table>
    </div>
    <div class="from-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule">
        <p class="a-title" slot="form-title">修改科室</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">所属门诊：</span>
            <input id="am-name" type="text" v-model="department" readonly/>
          </div>
          <div class="a-item">
            <span class="a-info">科室地址：</span>
            <input id="a-name" type="text" v-model="consultingRoom"/>
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
  import DropdownBox from 'base/dropdownBox/dropdownBox'
  import KTable from 'base/table/table'
  import FormModule from 'base/formModule/formModule'
  import {queryDesps, oneDepConsultingRoom, updateDepConsultingRoom, deleteDepConsultingRoom} from 'api/management.js'

  export default {
    created() {
      this.queryDeps()
    },
    data() {
      return {
        list: [],
        title: '选择诊所',
        selectDepId: '',
        modifyShow: false,
        cloumn: [{
          cloName: '科室号',
          cloValName: 'id'
        }, {
          cloName: '科室地址',
          cloValName: 'location'
        }],
        row: [],
        department: '',
        consultingRoom: '',
        consultingRoomId: ''
      }
    },
    watch: {
      selectDepId(val) {
        let data = {
          id: val
        }
        this.queryOneDepConsultingRoom(data)
      }
    },
    methods: {
      queryOneDepConsultingRoom(data) {
        oneDepConsultingRoom(data).then((res) => {
          res = res.data
          if (res.success) {
            res.list.forEach((item) => {
              delete item.departmentId
            })
            this.row = res.list
          }
        })
      },
      modifyMes(id) {
        this.department = this.getDepName()
        this.modifyShow = true
        this.title = this.department
        this.consultingRoomId = id
      },
      deleteMes(id) {
        let data = {
          id
        }
        deleteDepConsultingRoom(data).then((res) => {
          res = res.data
          if (res.success) {
            let data = {
              id: this.selectDepId
            }
            this.queryOneDepConsultingRoom(data)
          }
        })
      },
      comModify() {
        let data = {
          location: this.consultingRoom,
          id: this.consultingRoomId,
          departmentId: this.selectDepId
        }
        updateDepConsultingRoom(data).then((res) => {
          res = res.data
          if (res.success) {
            let data = {
              id: this.selectDepId
            }
            this.consultingRoom = ''
            this.modifyShow = false
            this.queryOneDepConsultingRoom(data)
          }
        })
      },
      closeFormModule() {
        this.modifyShow = false
      },
      selectDep(id) {
        this.selectDepId = id
        this.title = this.getDepName()
        this.$refs.dropDownBox.changeShow()
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
      queryDeps() {
        queryDesps().then((res) => {
          res = res.data
          if (res.success) {
            res.list.forEach((item) => {
              delete item.counts
            })
            this.list = res.list
          } else {
            this.$router.push('/loginsy')
          }
        })
      }
    },
    components: {
      KTable,
      FormModule,
      DropdownBox
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .queryConsultingRoom
    display flex
    justify-content space-around
    .table-wrapper
      margin-left 2rem

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
