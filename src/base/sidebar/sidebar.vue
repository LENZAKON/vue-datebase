<template>
  <div class="sidebar">
    <h2 class="title">{{title}}</h2>
    <ul class="operations">
      <li class="operation" :data-type="item.type" v-for="item in operations" @click="selectType">{{item.content}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getData} from 'common/js/dom'

  export default {
    props: {
      operations: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        title: '选择操作'
      }
    },
    methods: {
      selectType(e) {
        this.$emit('selectType', getData(e.target, 'type'))
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .sidebar
    display inline-block
    background $color-theme
    color $color-background
    .title
      padding 1.6rem
      text-align center
      font-size $font-size-large-x
    .operations
      .operation
        padding 1.4rem
        cursor pointer
        text-align center
        border-top 1px solid $color-theme-d
        &:hover
          background $color-theme-d
</style>
