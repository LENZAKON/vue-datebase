<template>
  <div class="queryPatient">
    <div class="table-wrapper">
      <k-table @diagnosis="diagnosis" :type="type" :row="row" :cloumn="cloumn"></k-table>
    </div>
    <div class="form-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule">
        <p class="a-title" slot="form-title">病人信息</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">姓名：</span>
            <input readonly id="a-name" type="text" v-model="name"/>
          </div>
          <div class="a-item">
            <span class="a-info">年龄：</span>
            <input readonly id="a-address" type="text" v-model="age"/>
          </div>
          <div class="a-item">
            <span class="a-info">病情描述：</span>
            <input id="a-disease" type="text" v-model="disease"/>
          </div>
          <h1 class="a-item">选择药品：</h1>
          <div class="a-item" v-for="item in medicines">
            <label class="a-info"><input type="checkbox" :data-id=item.id class="box"/>{{item.name}}：</label>
            <input type="text" class="medicine-num" placeholder="个数">
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
  import {mapMutations, mapGetters} from 'vuex'
  import {queryPatient, casereportAdd} from 'api/doctor.js'
  import {queryAllMedicines} from 'api/management.js'
  import {getData} from 'common/js/dom.js'

  export default {
    created() {
      if (this.diagnosisingDoc) {
        localStorage.setItem('id', this.diagnosisingDoc)
      }
      let data = {
        doctorId: this.diagnosisingDoc || localStorage.getItem('id')
      }
      this.queryMedicines()
      queryPatient(data).then((res) => {
        res = res.data
        let result = []
        this.appPatId = []
        if (res.success) {
          res.list.forEach((item) => {
            let temp = {}
            let tempId = {}
            tempId.id = item.patient.id
            tempId.appointmentId = item.id
            temp.id = item.patient.id
            temp.name = item.patient.name
            temp.sex = item.patient.sex
            temp.age = item.patient.age
            result.push(temp)
            this.appPatId.push(tempId)
          })
          this.row = result
        }
      })
    },
    data() {
      return {
        type: 2,
        modifyShow: false,
        medicines: [],
        row: [],
        name: '',
        age: '',
        disease: '',
        cloumn: [{
          cloName: '病人号',
          cloValName: 'id'
        }, {
          cloName: '病人名',
          cloValName: 'name'
        }, {
          cloName: '病人性别',
          cloValName: 'sex'
        }, {
          cloName: '病人年龄',
          cloValName: 'age'
        }]
      }
    },
    components: {
      KTable,
      FormModule
    },
    computed: {
      ...mapGetters([
        'diagnosisingDoc'
      ])
    },
    methods: {
      getMedicineId() {
        let ids = ''
        let boxes = document.getElementsByClassName('box')
        for (let i = 0, len = boxes.length; i < len; i++) {
          if (boxes[i].checked) {
            ids += (getData(boxes[i], 'id') + '&')
          }
        }
        return ids.substring(0, ids.length - 1)
      },
      getMedicineCount() {
        let counts = ''
        let numbers = document.getElementsByClassName('medicine-num')
        for (let i = 0, len = numbers.length; i < len; i++) {
          if (numbers[i].value) {
            counts += numbers[i].value + '&'
          }
        }
        return counts.substring(0, counts.length - 1)
      },
      getData(list, attr) {
        let val
        list.forEach((item) => {
          if (item.id === this.updateId) {
            val = item[attr]
          }
        })
        return val
      },
      queryMedicines() {
        queryAllMedicines().then((res) => {
          res = res.data
          if (res.success) {
            this.medicines = res.list
          }
        })
      },
      diagnosis(id) {
        // 要诊断的病人的id
        console.log(id)
        this.updateId = id
        this.name = this.getData(this.row, 'name')
        this.age = this.getData(this.row, 'age')
        this.setPatientId(id)
        this.modifyShow = true
      },
      closeFormModule() {
        this.disease = ''
        this.modifyShow = false
      },
      comModify() {
        // 确认病人信息
        let data = {
          patientId: this.updateId,
          description: this.disease,
          medicineId: this.getMedicineId(),
          counts: this.getMedicineCount(),
          appointmentId: this.getData(this.appPatId, 'appointmentId')
        }
        console.log(data)
        casereportAdd(data).then((res) => {
          res = res.data
          if (res.success) {
            this.modifyShow = false
            this.$router.push('/doctor/queryPatient')
          }
        })
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

  .a-info
    display inline-block
    width 20%
    text-align right

  .a-btn
    padding-top 1.6rem

  #a-name, #a-address, #a-disease
    outline none

  #a-disease
    border 1px solid $color-theme-d

  .medicine-num
    border 1px solid $color-theme-d

  .btn--m
    padding 0.4rem 1.4rem
    border-radius 4px

  .btn--green
    background $color-theme
    &:hover
      background $color-theme-d
</style>
