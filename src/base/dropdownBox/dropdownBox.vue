<template>
  <div class="dropdownBox">
    <div class="box showBox">
      <label>{{title}}</label>
      <i class="triangle_bottom" @click="changeShow"></i>
    </div>
    <div class="box hideBox" v-show="isShow">
      <ul class="items">
        <li class="item" @click="select" :data-id="item.id" v-for="(item,index) in list">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getData} from 'common/js/dom'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default: () => {
          return [{
            id: '1',
            name: 'nihao'
          }, {
            id: '2',
            name: 'haha'
          }, {
            id: '3',
            name: 'hehe'
          }]
        }
      }
    },
    data() {
      return {
        isShow: false,
        selectId: ''
      }
    },
    methods: {
      select(e) {
        this.selectId = getData(e.target, 'id')
        this.$emit('select', this.selectId)
      },
      changeShow() {
        this.isShow = !this.isShow
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .dropdownBox
    .showBox
      position relative
      display inline-block
      width 90px
      border-radius 4px
      padding 0.3rem 0.6rem
      background-color $color-theme
      color #fff
      &:hover
        background-color $color-theme-d
      .triangle_bottom
        float right
        position relative
        top 4px
        left 4px
        width: 0px;
        height: 0px;
        overflow: hidden; /*处理IE6最小高度*/
        border-width: 8px;
        border-color: #fff transparent transparent transparent;
        /*transparent全透明黑色(black)，即一个类似rgba(0,0,0,0)*/
        border-style: solid dashed dashed dashed;
    .hideBox
      border-top 0
      background #fff
      ul
        box-shadow 0 5px 10px rgba(0, 0, 0, .2)
        border-radius 4px
        li
          padding 0.3rem 0.6rem
          &:hover
            color $color-theme-d
    .box
      position relative
      cursor pointer
</style>
