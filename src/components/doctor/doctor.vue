<template>
  <div class="doctor">
    <div class="sidebar-containe">
      <sidebar :operations="operations" @selectType="selectType"></sidebar>
    </div>
    <div class="router-containe">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Sidebar from 'base/sidebar/sidebar'

  export default {
    data() {
      return {
        operations: [
          {
            type: 'queryPatient',
            content: '查看挂号病人'
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
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .sidebar-containe
    display inline-block
    float left
    vertical-align top
  .router-containe
    display flex
    justify-content center
    vertical-align top
</style>
