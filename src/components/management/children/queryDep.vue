<template>
  <div class="queryDep">
    <div class="table-wrapper">
      <k-table :cloumn="cloumn" :row="row" @modifyMes="modifyMes" @deleteMes="deleteMes"></k-table>
    </div>
    <div class="from-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule">
        <p class="a-title" slot="form-title">修改门诊</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">门诊名：</span>
            <input id="a-name" type="text" v-model="newDep"/>
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
  import {queryDesps, updateDep, deleteDep} from 'api/management.js'

  export default {
    data() {
      return {
        modifyShow: false,
        cloumn: [{
          cloName: '门诊号',
          cloValName: 'id'
        }, {
          cloName: '门诊名',
          cloValName: 'name'
        }],
        row: [],
        depUpdateId: '',
        newDep: '',
        counts: []
      }
    },
    created() {
      this.queryDeps()
    },
    methods: {
      queryDeps() {
        queryDesps().then((res) => {
          res = res.data
          if (res.success) {
            res.list.forEach((item) => {
              this.counts[item.id] = item.counts
              delete item.counts
            })
            this.row = res.list
          } else {
            this.$router.push('/loginsy')
          }
        })
      },
      closeFormModule() {
        this.newDep = ''
        this.modifyShow = false
      },
      comModify() {
        let data = {
          id: this.depUpdateId,
          name: this.newDep,
          counts: this.counts[this.depUpdateId]
        }
        updateDep(data).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.modifyShow = false
            this.queryDeps()
          }
        })
      },
      modifyMes(id) {
        this.modifyShow = true
        this.depUpdateId = id
      },
      deleteMes(id) {
        let data = {id: id}
        deleteDep(data).then((res) => {
          if (res.data.success) {
            this.queryDeps()
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
