<template>
    <div class="header">
      <div class="header-left" @click="hiddenNormalPlayer"></div>
      <div class="header-title">
        <h3>{{currentSong.name}}</h3>
        <p>{{currentSong.singer}}</p>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  .header-left{
    width: 84px;
    height: 100px;
    @include bg_img('../../assets/images/down');
  }
  .header-title{
    width: 60%;
    margin-right: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
