<template>
  <div class="management">
    <div class="sidebar-containe">
      <sidebar :operations="operations" @selectType="selectType"></sidebar>
    </div>
    <div class="router-containe">
      <router-view ref="routerView"></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Sidebar from 'base/sidebar/sidebar'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        operations: [
          {
            type: 'addJobTitle',
            content: '添加职称'
          },
          {
            type: 'addDep',
            content: '添加门诊'
          },
          {
            type: 'addConsultingRoom',
            content: '添加科室'
          },
          {
            type: 'addDoc',
            content: '添加医生账号'
          },
          {
            type: 'addNur',
            content: '添加护士账号'
          },
          {
            type: 'addMedicine',
            content: '添加药品'
          },
          {
            type: 'queryJobTitle',
            content: '查看职称'
          },
          {
            type: 'queryDep',
            content: '查看门诊'
          },
          {
            type: 'queryConsultingRoom',
            content: '查看科室'
          },
          {
            type: 'queryDoc',
            content: '查看医生账号'
          },
          {
            type: 'queryNur',
            content: '查看护士账号'
          },
          {
            type: 'queryMedicine',
            content: '查看药品'
          }
        ]
      }
    },
    components: {
      Sidebar
    },
    methods: {
      selectType(type) {
        console.log(type)
        if (type === 'queryJobTitle') {
          this.$router.push('/management/queryJobTitle')
        }
        if (type === 'queryDep') {
          this.$router.push('/management/queryDep')
        }
        if (type === 'queryNur') {
          this.$router.push('/management/queryNur')
        }
        if (type === 'queryDoc') {
          this.$router.push('/management/queryDoc')
        }
        if (type === 'queryMedicine') {
          this.$router.push('/management/queryMedicine')
        }
        if (type === 'queryConsultingRoom') {
          this.$router.push('/management/queryConsultingRoom')
        }
        if (type === 'addDoc') {
          this.$router.push('/management/addDoc')
          this.$refs.routerView.showFormModule && this.$refs.routerView.showFormModule()
        }
        if (type === 'addNur') {
          this.$router.push('/management/addNur')
          this.$refs.routerView.showFormModule && this.$refs.routerView.showFormModule()
        }
        if (type === 'addMedicine') {
          this.$router.push('/management/addMedicine')
          this.$refs.routerView.showFormModule && this.$refs.routerView.showFormModule()
        }
        if (type === 'addJobTitle') {
          this.$router.push('/management/addJobTitle')
          this.$refs.routerView.showFormModule && this.$refs.routerView.showFormModule()
        }
        if (type === 'addDep') {
          this.$router.push('/management/addDep')
          this.$refs.routerView.showFormModule && this.$refs.routerView.showFormModule()
        }
        if (type === 'addConsultingRoom') {
          this.$router.push('/management/addConsultingRoom')
          this.$refs.routerView.showFormModule && this.$refs.routerView.showFormModule()
        }
        this.setIsQueryDoc(false)
        this.setDoctorId('')
        this.setIsQueryNurse(false)
        this.setNurseId('')
      },
      ...mapMutations({
        setIsQueryNurse: 'SET_ISQUERYNURSE',
        setNurseId: 'SET_NURSEID',
        setIsQueryDoc: 'SET_ISQUERYDOC',
        setDoctorId: 'SET_DOCTORID'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .management
    overflow hidden
    .sidebar-containe
      display inline-block
      float left
      vertical-align top
    .router-containe
      display flex
      justify-content center
      vertical-align top
</style>
