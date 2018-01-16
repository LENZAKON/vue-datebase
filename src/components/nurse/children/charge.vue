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
            <table>
              <thead>
              <tr>
                <th>药品编号</th>
                <th>药品名</th>
                <th>数量</th>
                <th>单价</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in medicineLists">
                <th>{{item.id}}</th>
                <th>{{item.name}}</th>
                <th>{{item.counts}}</th>
                <th>{{item.price}}</th>
              </tr>
              <tr>
                <th colspan="3">总价：</th>
                <th>{{totalCount}}</th>
              </tr>
              </tbody>
            </table>
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
  import {medicineUppay, medicinePay} from 'api/nurse.js'

  export default {
    created() {
      this.queryUnpayMedicine()
    },
    data() {
      return {
        cloumn: [
          {
            cloName: '药单编号',
            cloValName: 'id'
          }, {
            cloName: '病人名',
            cloValName: 'name'
          }
        ],
        row: [],
        modifyShow: false,
        name: '',
        type: 3,
        tableMes: [],
        formMes: [],
        selectItem: '',
        medicineLists: [],
        totalCount: '',
        chargeId: ''
      }
    },
    methods: {
      reset() {
        this.tableMes = []
        this.formMes = []
        this.selectItem = ''
        this.medicineLists = []
        this.totalCount = ''
        this.chargeId = ''
      },
      queryUnpayMedicine() {
        this.reset()
        medicineUppay().then((res) => {
          res = res.data
          if (res.success) {
            console.log(res)
            this.list = res.list
            this.list.forEach((item) => {
              let tempTable = {}
              let tempForm = {}
              tempTable.id = item.medicine.reportId
              tempTable.name = item.medicine.patientName

              tempForm.medicineLists = item.medicine.medicineLists
              tempForm.totalPrice = item.totalPrice
              this.tableMes.push(tempTable)
              this.formMes.push(tempForm)
            })
            console.log(this.tableMes)
            console.log(this.formMes)
            this.row = this.tableMes
          } else {
            this.$router.push('/loginsy')
          }
        })
      },
      charge(id) {
        this.modifyShow = true
        console.log(id)
        this.chargeId = id
        this.list.forEach((item, index) => {
          if (item.medicine.reportId === id) {
            this.selectItem = index
          }
        })
        console.log(this.selectItem)
        console.log(this.formMes[this.selectItem])
        this.medicineLists = this.formMes[this.selectItem].medicineLists
        this.totalCount = this.formMes[this.selectItem].totalPrice
      },
      closeFormModule() {
        this.modifyShow = false
        this.reset()
      },
      comModify() {
        let data = {
          reportId: this.chargeId
        }
        medicinePay(data).then((res) => {
          res = res.data
          if (res.success) {
            this.modifyShow = false
            this.queryUnpayMedicine()
          }
        })
        console.log(data)
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

  .a-item
    display flex
    justify-content center
    table
      border-bottom-width 1px
      border-bottom-style solid
      border-bottom-color $color-table-bg
      thead, tr
        border-top-width 1px
        border-top-style solid
        border-top-color $color-table-bg
      thead tr th
        font-size 1.2rem
      td, th
        padding 0.6rem 1.2rem
        font-size 1rem
        font-family Verdana
        color $color-text
      tr:nth-child(even)
        background $color-table-bg
      tr:nth-child(odd)
        background #FFF

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
