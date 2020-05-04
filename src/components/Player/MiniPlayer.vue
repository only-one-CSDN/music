<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="ShowNormalPlayer">
          <img :src="this.currentSong.picUrl" alt="" ref="cover">
          <div class="player-title">
            <h3>{{this.currentSong.name}}</h3>
            <p>{{this.currentSong.singer}}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setPlayerList',
      'setIsPlayer'
    ]),
    showList () {
      this.setPlayerList(true)
    },
    ShowNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    enter: function (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 300 }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 300 }, { complete: done })
    },
    play () {
      this.setIsPlayer(!this.isPlayer)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlayer',
      'currentSong'
    ])
  },
  watch: {
    isPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.cover.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cover.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.mini-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 140px;
  @include bg_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left{
      display: flex;
      padding-left: 30px;
      width: 50%;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 4s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
      .player-title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        /*align-items: center;*/
        @include no-wrap();
        h3{
          @include font_size($font_medium);
          @include font_color();
        }
        p{
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    .player-right{
      display: flex;
      align-items: center;
      .play{
        width: 70px;
        height: 70px;
        border: 2px solid #fff;
        border-radius: 50px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
        @include border_color()
      }
      .list{
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}
@keyframes sport {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
