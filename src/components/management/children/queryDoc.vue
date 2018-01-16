<template>
  <div class="queryDoc">
    <div class="table-wrapper">
      <k-table :cloumn="cloumn" :row="row" @modifyMes="modifyMes" @deleteMes="deleteMes"></k-table>
    </div>
    <div class="from-wrapper">
      <form-module :addAddShow="modifyShow" @closeFormModule="closeFormModule" @queryDoc="queryDoc">
        <p class="a-title" slot="form-title">修改医生信息</p>
        <div class="a-items" slot="form-items">
          <div class="a-item">
            <span class="a-info">姓名：</span>
            <input id="a-name" type="text" v-model="name"/>
          </div>
          <div class="a-item">
            <span class="a-info">性别：</span>
            <input id="a-sex" type="text" v-model="sex"/>
          </div>
          <div class="a-item">
            <span class="a-info">年龄：</span>
            <input id="a-age" type="text" v-model="age"/>
          </div>
          <div class="a-item">
            <span class="a-info">电话：</span>
            <input id="a-tel" type="text" v-model="tel"/>
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
  import {queryAllDocs, updateUser, deleteUser} from 'api/management.js'

  export default {
    created() {
      this.queryDocs()
    },
    data() {
      return {
        id: '',
        modifyShow: false,
        ifShow: true,
        name: '',
        age: '',
        sex: '',
        tel: '',
        cloumn: [{
          cloName: '编号',
          cloValName: 'id'
        }, {
          cloName: '姓名',
          cloValName: 'name'
        }, {
          cloName: '性别',
          cloValName: 'sex'
        }, {
          cloName: '年龄',
          cloValName: 'age'
        }, {
          cloName: '电话',
          cloValName: 'tel'
        }],
        row: [],
        updateId: ''
      }
    },
    methods: {
      queryDocs() {
        queryAllDocs().then((res) => {
          res = res.data
          if (res.success) {
            res.list.forEach((item) => {
              delete item.titleId
            })
            this.row = res.list
            console.log(this.row)
          } else {
            this.$router.push('/loginsy')
          }
        })
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
      modifyMes(id) {
        console.log(id)
        this.updateId = id
        this.age = this.getData(this.row, 'age')
        this.name = this.getData(this.row, 'name')
        this.sex = this.getData(this.row, 'sex')
        this.tel = this.getData(this.row, 'tel')
        this.consultingRoomId = this.getData(this.row, 'consultingRoomId')
        this.departmentId = this.getData(this.row, 'departmentId')
        this.modifyShow = true
        this.setIsQueryDoc(false)
        this.setDoctorId('')
        this.setIsQueryNurse(true)
        this.setNurseId(id)
      },
      deleteMes(id) {
        console.log(id)
        let data = {id}
        deleteUser(data).then((res) => {
          res = res.data
          if (res.success) {
            this.queryDocs()
          }
        })
      },
      delDoc() {
      },
      comModify() {
        let data = {
          id: this.updateId,
          titleId: '1',
          age: parseInt(this.age),
          name: this.name,
          sex: this.sex,
          tel: this.tel,
          consultingRoomId: this.consultingRoomId,
          departmentId: this.departmentId
        }
        updateUser(data).then((res) => {
          res = res.data
          if (res.success) {
            this.modifyShow = false
            this.queryDocs()
          }
        })
        console.log(data)
      },
      reset() {
        this.updateId = ''
        this.age = ''
        this.name = ''
        this.sex = ''
        this.tel = ''
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

  #a-name, #a-age, #a-tel, #a-sex
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
