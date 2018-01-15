<template>
  <div class="addNur">
    <form-module :addAddShow="addShow" @closeFormModule="closeFormModule">
      <p class="a-title" slot="form-title">添加护士账号</p>
      <div class="a-items" slot="form-items">
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
        <div class="a-item">
          <span class="a-info">名字：</span>
          <input id="a-dname" type="text" v-model="name"/>
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
        <div class="a-item">
          <span class="a-info">账号：</span>
          <input id="a-name" type="text" v-model="account"/>
        </div>
        <div class="a-item">
          <span class="a-info">密码：</span>
          <input id="a-address" type="password" v-model="password"/>
        </div>
        <div class="a-item">
          <span class="a-info">再次输入：</span>
          <input id="ag-address" type="password" v-model="againPassword" ref="again"/>
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
  import {mapMutations} from 'vuex'
  import {addAcount, queryDesps, oneDepConsultingRoom} from 'api/management'

  export default {
    created() {
      this.setIsQueryDoc(false)
      this.setDoctorId('')
      this.setIsQueryNurse(false)
      this.setNurseId('')
      this.queryDeps()
    },
    data() {
      return {
        addShow: true,
        account: '',
        password: '',
        againPassword: '',
        name: '',
        sex: '',
        age: '',
        tel: '',
        departments: [],
        consultingRoom: [],
        depTit: '选择门诊',
        conTit: '选择科室',
        selectDepId: ''
      }
    },
    watch: {
      againPassword(value) {
        console.log(this.password)
        if (value !== this.password) {
          this.$refs.again.style.borderColor = 'red'
        } else {
          this.$refs.again.style.borderColor = '#1fcab3'
        }
      },
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
      }
    },
    methods: {
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
          res.list.forEach((item) => {
            delete item.counts
          })
          this.departments = res.list
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
      closeFormModule() {
        this.name = ''
        this.sex = ''
        this.tel = ''
        this.age = ''
        this.account = ''
        this.password = ''
        this.againPassword = ''
        this.addShow = false
        this.$router.push('/management/queryNur')
      },
      showFormModule() {
        this.addShow = true
      },
      comAdd() {
        let data = {
          titleId: '2',
          name: this.name,
          sex: this.sex,
          tel: this.tel,
          age: this.age,
          account: this.account,
          password: this.password,
          departmentId: this.selectDepId,
          consultingRoomId: this.selectConId
        }
        addAcount(data).then((res) => {
          res = res.data
          if (res.success) {
            this.addShow = false
            this.$router.push('/management/queryNur')
          }
        })
      },
      ...mapMutations({
        setIsQueryDoc: 'SET_ISQUERYDOC',
        setDoctorId: 'SET_DOCTORID',
        setIsQueryNurse: 'SET_ISQUERYNURSE',
        setNurseId: 'SET_NURSEID'
      })
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

  #a-name, #a-address, #ag-address, #a-dname, #a-sex, #a-age, #a-tel
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
