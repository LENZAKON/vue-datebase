<template>
  <div class="appointment">
    <form-module :addAddShow="addShow" @closeFormModule="closeFormModule">
      <p class="a-title" slot="form-title">病人挂号</p>
      <div class="a-items" slot="form-items">
        <div class="a-item">
          <span class="a-info">名字：</span>
          <input id="a-name" type="text" v-model="name"/>
        </div>
        <div class="a-item">
          <span class="a-info">身份证号：</span>
          <input id="a-idCard" type="text" v-model="idCard"/>
        </div>
        <div class="a-item">
          <span class="a-info">性别：</span>
          <input id="a-sex" type="text" v-model="sex"/>
        </div>
        <div class="a-item">
          <span class="a-info">年龄：</span>
          <input id="a-age" type="text" v-model="age"/>
        </div>
        <div class="a-item spdo">
          <span class="a-info" id="t-dep">门诊：</span>
          <div class="dropdown-box-wrapper" id="depDropDownBox">
            <dropdown-box ref="depDropDownBox" :list="departments" :title="depTit" @select="selectDep"></dropdown-box>
          </div>
        </div>
        <div class="a-item spdo">
          <span class="a-info" id="t-con">科室：</span>
          <div class="dropdown-box-wrapper" id="conDropDownBox">
            <dropdown-box ref="conDropDownBox" :list="consultingRoom" :title="conTit"
                          @select="selectCon"></dropdown-box>
          </div>
        </div>
        <div class="a-item spdo">
          <span class="a-info" id="t-doc">医生：</span>
          <div class="dropdown-box-wrapper" id="docDropDownBox">
            <dropdown-box :list="doctors" ref="docDropDownBox" :title="docTit" @select="selectDoc"></dropdown-box>
          </div>
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
  import {queryDesps, oneDepConsultingRoom} from 'api/management.js'
  import {queryAppointmentDoc, addAppointment} from 'api/nurse.js'
  import {formDate} from 'common/js/date.js'

  export default {
    created() {
      this.queryDeps()
    },
    data() {
      return {
        depTit: '选择门诊',
        departments: [],
        conTit: '选择科室',
        consultingRoom: [],
        docTit: '选择医生',
        doctors: [],
        addShow: true,
        name: '',
        idCard: '',
        sex: '',
        age: '',
        selectDepId: '',
        selectConId: '',
        selectDocId: ''
      }
    },
    watch: {
      selectDepId(val) {
        this.selectConId = ''
        this.selectDocId = ''
        this.conTit = '选择科室'
        this.docTit = '选择医生'
        this.consultingRoom = []
        this.doctors = []
        let data = {id: val}
        if (data.id) {
          this.queryOneDepConsultingRoom(data)
        }
      },
      selectConId(val) {
        this.docTit = '选择医生'
        this.selectDocId = ''
        this.doctors = []
        let data = {
          departmentId: this.selectDepId,
          consultingRoomId: val
        }
        if (data.departmentId && data.consultingRoomId) {
          this.queryOneDepConDoc(data)
        }
      }
    },
    methods: {
      // 重置
      reset() {
        this.depTit = '选择门诊'
        this.departments = []
        this.conTit = '选择科室'
        this.consultingRoom = []
        this.docTit = '选择医生'
        this.doctors = []
        this.name = ''
        this.idCard = ''
        this.sex = ''
        this.age = ''
        this.selectDepId = ''
        this.selectConId = ''
        this.selectDocId = ''
      },
      queryOneDepConDoc(data) {
        queryAppointmentDoc(data).then((res) => {
          res = res.data
          if (res.success) {
            this.doctors = res.list
          }
        })
      },
      queryOneDepConsultingRoom(data) {
        oneDepConsultingRoom(data).then((res) => {
          res = res.data
          if (res.success) {
            res.list.forEach((item) => {
              item.name = item.location
              delete item.departmentId
              delete item.location
            })
            this.consultingRoom = res.list
          }
        })
      },
      selectDep(id) {
        this.selectDepId = id
        this.depTit = this.getName(this.departments, this.selectDepId)
        this.$refs.depDropDownBox.changeShow()
      },
      selectCon(id) {
        this.selectConId = id
        this.conTit = this.getName(this.consultingRoom, this.selectConId)
        this.$refs.conDropDownBox.changeShow()
      },
      selectDoc(id) {
        this.selectDocId = id
        this.docTit = this.getName(this.doctors, this.selectDocId)
        this.$refs.docDropDownBox.changeShow()
      },
      getName(list, id) {
        let name
        list.forEach((item) => {
          if (item.id === id) {
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
            this.departments = res.list
          } else {
            this.$router.push('/loginsy')
          }
        })
      },
      closeFormModule() {
        this.addShow = false
        this.reset()
        this.$router.push('/nurse/charge')
      },
      comAdd() {
        let data = {
          doctorId: this.selectDocId,
          departmentId: this.selectDepId,
          consultingRoomId: this.selectConId,
          name: this.name,
          idCard: this.idCard,
          sex: this.sex,
          age: this.age,
          tel: this.tel,
          consultingDate: formDate(new Date(Date.parse(new Date())), 'yyyy-MM-dd hh:mm:ss')
        }
        addAppointment(data).then((res) => {
          res = res.data
          if (res.success) {
            alert('挂号成功')
            this.$router.push('/nurse/charge')
          }
        })
      },
      showFormModule() {
        this.addShow = true
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

  .a-content
    .a-items
      .a-item
      .spdo
        margin-top 20px

  .dropdown-box-wrapper
    position absolute
    right 12rem
    top -6px
    display inline-block

  #depDropDownBox
    z-index 30

  #conDropDownBox
    z-index 20

  #docDropDownBox
    z-index 10

  #t-doc, #t-dep, #t-con
    position relative
    right 6.8rem

  .a-btn
    padding-top 1.6rem

  #a-name, #a-idCard, #a-sex, #a-age
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
