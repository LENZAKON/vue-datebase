<template>
  <div>
    <transition name="fade">
      <div class="a-content" v-if="addAddShow">
        <slot name="form-title"></slot>
        <slot name="form-items"></slot>
        <slot name="form-btn"></slot>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="addAddShow" class="a-module" @click="closeFormModule"></div>
    </transition>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'doctorId',
        'isQueryDoc',
        'nurseId',
        'isQueryNur'
      ])
    },
    mounted() {
      this.getDtata()
    },
    props: {
      addAddShow: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      doctorId(value) {
        if (!value) {
          return
        }
        if (this.isQueryDoc && this.doctorId) {
          console.log(this.isQueryDoc)
          console.log(this.doctorId)
          // 后台查询
          this.$emit('queryDoc', this.doctorId)
        }
      },
      nurseId(value) {
        if (!value) {
          return
        }
        if (this.isQueryNur && this.nurseId) {
          console.log(this.isQueryNur)
          console.log(this.nurseId)
          // 后台查询
          this.$emit('queryNur', this.nurseId)
        }
      }
    },
    methods: {
      addAddCom() {

      },
      getDtata() {
//        window.onload = () => {
//          console.log('doujing')
//          if (this.isQueryDoc && this.doctorId) {
//            console.log(this.isQueryDoc)
//            console.log(this.doctorId)
//            // 后台查询
//            console.log('查询具体医生')
//          }
//          if (this.isQueryNur && this.nurseId) {
//            console.log(this.isQueryNur)
//            console.log(this.nurseId)
//            // 后台查询
//            console.log('查询具体护士')
//          }
//        }
      },
      closeFormModule() {
        this.$emit('closeFormModule')
      }
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }

  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter {
    opacity: 0;
  }

  .a-module {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .a-content {
    display: inline-block;
    position: fixed;
    background-color: #fff;
    padding-bottom: 40px;
    /*height: 300px;*/
    width: 500px;
    left: 50%;
    top: 0;
    margin-left: -250px;
    margin-bottom: -150px;
    z-index: 2000;
  }

  .a-content .a-title {
    text-align: center;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
  }

  .a-content .a-items {
    text-align: center;
  }

  .a-content .a-items .a-item {
    margin-top: 10px;
  }

  .a-content .a-items .a-item input {
    padding: 10px;
  }

  .a-content .a-btn {
    text-align: center;
    margin-top: 16px;
  }

  .a-content .a-btn .btn {
    width: 150px;
  }
</style>
