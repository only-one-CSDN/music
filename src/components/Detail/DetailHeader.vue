<template>
    <!--
    <div class="header" @click="changeTheme">
      <div class="header-left" @click.stop="back"></div>
      <p class="header-title">{{ title }}</p>
      <div class="header-right"></div>
    </div>
    -->
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{ title }}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header{
  position: relative;
  z-index: 99;
  .header-left{
    @include bg_img('../../assets/images/back');
  }
  .header-right{
    @include bg_img('../../assets/images/more');
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap;
  }
}
</style>
