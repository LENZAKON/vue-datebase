<template>
  <div class="queryMedicine">
    <div class="table-wrapper">
      <k-table :cloumn="cloumn" :row="row" @modifyMes="modifyMes" @deleteMes="deleteMes"></k-table>
    </div>
    <div class="from-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule">
        <p class="a-title" slot="form-title">修改药品</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">药品名：</span>
            <input type="text" v-model="medicineName" readonly/>
          </div>
          <div class="a-item">
            <span class="a-info">价格：</span>
            <input id="a-price" type="text" v-model="medicinePrice"/>
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
  import {queryAllMedicines, updateMedicine, deleteMedicine} from 'api/management.js'

  export default {
    data() {
      return {
        cloumn: [{
          cloName: '药品号',
          cloValName: 'id'
        }, {
          cloName: '药品名',
          cloValName: 'name'
        }, {
          cloName: '药品价格',
          cloValName: 'price'
        }],
        row: [],
        modifyShow: false,
        medicineName: '',
        medicinePrice: '',
        medicineUpdateId: ''
      }
    },
    created() {
      this.queryMedicines()
    },
    methods: {
      modifyMes(id) {
        this.modifyShow = true
        this.medicineUpdateId = id
        this.medicineName = this.getMedicineName()
      },
      getMedicineName() {
        let name
        this.row.forEach((item) => {
          if (item.id === this.medicineUpdateId) {
            name = item.name
          }
        })
        return name
      },
      queryMedicines() {
        queryAllMedicines().then((res) => {
          res = res.data
          if (res.success) {
            console.log(res)
            this.row = res.list
          } else {
            this.$router.push('/loginsy')
          }
        })
      },
      deleteMes(id) {
        let data = {id}
        deleteMedicine(data).then((res) => {
          res = res.data
          if (res.success) {
            this.queryMedicines()
          }
        })
      },
      comModify() {
        let data = {
          id: this.medicineUpdateId,
          price: this.medicinePrice,
          name: this.medicineName
        }
        updateMedicine(data).then((res) => {
          res = res.data
          if (res.success) {
            this.medicineName = ''
            this.medicinePrice = ''
            this.modifyShow = false
            this.queryMedicines()
            console.log(res)
          }
        })
      },
      closeFormModule() {
        this.medicineName = ''
        this.medicinePrice = ''
        this.modifyShow = false
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

  #a-name, #a-price
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
