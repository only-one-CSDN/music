<template>
    <ul class="detail-bottom">
      <li class="bottom-top" @click="selectAllMusic">
        <div class="bottom-icon"></div>
        <div class="bottom-title">播放全部</div>
      </li>
      <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
        <h3>{{ value.name }}</h3>
        <p>{{ value.al.name }} - {{ value.ar[0].name }}</p>
      </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
    },
    selectAllMusic () {
      this.setFullScreen(true)
      const ids = this.playlist.map(function (item) {
        return item.id
      })
      this.setSongDetail(ids)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.detail-bottom{
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #CCC;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon{
      width: 60px;
      height: 60px;
      @include bg_img ('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title{
      @include font_color();
      @include font_size($font-large);
    }
  }
  .item{
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #CCC;
    h3{
      @include font_color();
      @include font-size($font_medium);
    }
    p{
      @include font_color();
      @include font-size($font_small);
      opacity: 0.6;
      margin-top: 10px;
    }
  }
}
</style>
