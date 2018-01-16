<template>
  <div class="queryJobTitle">
    <div class="table-wrapper">
      <k-table :cloumn="cloumn" :row="row" @modifyMes="modifyMes" @deleteMes="deleteMes"></k-table>
    </div>
    <div class="from-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule" @queryDoc="queryJobTitle">
        <p class="a-title" slot="form-title">修改职称</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">职称名：</span>
            <input id="a-name" type="text" v-model="newJobTitle"/>
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
  import {queryJobTitles, updateJobTitles, deleteJobTitles} from 'api/management.js'
  import KTable from 'base/table/table'
  import FormModule from 'base/formModule/formModule'

  export default {
    data() {
      return {
        modifyShow: false,
        cloumn: [{
          cloName: '职称号',
          cloValName: 'id'
        }, {
          cloName: '职称名',
          cloValName: 'name'
        }],
        row: [],
        newJobTitle: '',
        jobTtitleUpdateId: ''
      }
    },
    created() {
      this.queryJobTtiles()
    },
    methods: {
      queryJobTtiles() {
        queryJobTitles().then((res) => {
          res = res.data
          if (res.success) {
            this.row = res.titles
          } else {
            this.$router.push('/loginsy')
          }
        })
      },
      closeFormModule() {
        this.modifyShow = false
      },
      queryJobTitle() {
        console.log('查看具体职称')
      },
      comModify() {
        let data = {
          id: this.jobTtitleUpdateId,
          title: this.newJobTitle
        }
        updateJobTitles(data).then((res) => {
          if (res.data.success) {
            this.modifyShow = false
            this.queryJobTtiles()
          }
        })
      },
      modifyMes(id) {
        this.jobTtitleUpdateId = id
        this.modifyShow = true
      },
      deleteMes(id) {
        let data = {id: id}
        deleteJobTitles(data).then((res) => {
          if (res.data.success) {
            this.queryJobTtiles()
          }
        })
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
