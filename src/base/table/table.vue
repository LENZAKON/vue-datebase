<template>
  <div class="table">
    <table class="old-table">
      <thead>
      <tr>
        <th v-for="item in cloumn">{{item.cloName}}</th>
        <th colspan="2">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in row">
        <th v-for="item2 in cloumn">{{item[item2.cloValName]}}</th>
        <th v-show="type==1" class="op" :data-id="row[index][id]" @click="modifyMes">修改</th>
        <th v-show="type==1" class="op" :data-id="row[index][id]" @click="deleteMes">删除</th>
        <th v-show="type==2" class="op" :data-id="row[index][id]" @click="diagnosis">诊断</th>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getData} from 'common/js/dom'

  export default {
    props: {
      cloumn: {
        type: Array,
        default: () => {
          return [{
            cloName: 'hello',
            cloValName: 'haha'
          }, {
            cloName: 'ni',
            cloValName: 'hehe'
          }, {
            cloName: 'hao',
            cloValName: 'xixi'
          }, {
            cloName: 'hei',
            cloValName: 'xixi'
          }
          ]
        }
      },
      row: {
        type: Array,
        default: () => {
          return [{
            hello: '2',
            ni: '3',
            hao: '4',
            hei: '5'
          }, {
            hello: '1',
            ni: '4',
            hao: '5',
            hei: '5'
          }]
        }
      },
      id: {
        type: String,
        default: 'id'
      },
      type: {
        type: Number,
        default: 1
      }
    },
    methods: {
      modifyMes(e) {
        this.$emit('modifyMes', getData(e.target, 'id'))
      },
      deleteMes(e) {
        this.$emit('deleteMes', getData(e.target, 'id'))
      },
      diagnosis(e) {
        this.$emit('diagnosis', getData(e.target, 'id'))
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~common/stylus/variable"
  .table
    .old-table
      border-bottom-width 1px
      border-bottom-style solid
      border-bottom-color $color-table-bg
      thead,tr
        border-top-width 1px
        border-top-style solid
        border-top-color $color-table-bg
      td,th
        padding 0.8rem 1.6rem
        font-size 1.2rem
        font-family Verdana
        color $color-text
      tr:nth-child(even)
        background $color-table-bg
      tr:nth-child(odd)
        background #FFF
      .op
        cursor pointer
        &:hover
          background $color-table-bg-d
</style>
