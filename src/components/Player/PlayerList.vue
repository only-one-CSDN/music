<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <div class="player-list" v-show="isShowPlayerList">
        <div class="player-top">
        <div class="top-left">
          <div class="mode loop" @click="mode" ref="mode"></div>
          <p v-if="this.modeType === 0">顺序播放</p>
          <p v-else-if="this.modeType === 1">单曲播放</p>
          <p v-else>随机播放</p>
        </div>
        <div class="top-right">
          <div class="del" @click="delAll"></div>
        </div>
      </div>
      <div class="player-middle">
        <ScrollView ref="scrollView">
          <ul ref="paly">
            <li class="item" v-for="(value, index) in songs" :key="value.id" @click="selectMusic(index)">
              <div class="item-left">
                <div class="item-play" @click.stop="play" v-show="currentIndex === index"></div>
                <p>{{ value.name }}</p>
              </div>
              <div class="item-right">
                <div class="item-favorite" @click.stop="favorite(value)" :class="{'active' : isFavorite(value)}"></div>
                <div class="item-del" @click.stop="del(index)"></div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="player-bottom">
        <p @click.stop="hidden">关闭</p>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import modeType from '../../store/modeType'
export default {
  name: 'PlayerList',
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setIsPlayer',
      'setModeType',
      'setPlayerList',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteSongs'
    ]),
    hidden () {
      this.setPlayerList(false)
    },
    play () {
      this.setIsPlayer(!this.isPlayer)
    },
    enter: function (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 300 }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 300 }, { complete: done })
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    del (index) {
      this.setDelSong(index)
    },
    delAll () {
      // const delUl = this.$refs.ul
      // delUl.remove()
      this.setDelSong()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    },
    favorite (value) {
      this.setFavoriteSongs(value)
    },
    isFavorite (songs) {
      const result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === songs.id
      })
      return result !== undefined
    }
  },
  computed: {
    ...mapGetters([
      'isPlayer',
      'isShowPlayerList',
      'modeType',
      'songs',
      'currentIndex',
      'favoriteList'
    ])
  },
  watch: {
    isPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.paly.classList.add('active')
      } else {
        this.$refs.paly.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      /* if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      } */
      switch (newValue) {
        case modeType.loop:
          this.$refs.mode.classList.remove('random')
          this.$refs.mode.classList.add('loop')
          break
        case modeType.one:
          this.$refs.mode.classList.remove('loop')
          this.$refs.mode.classList.add('one')
          break
        case modeType.random:
          this.$refs.mode.classList.remove('one')
          this.$refs.mode.classList.add('random')
          break
      }
    },
    isShowPlayerList (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-list{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  @include bg_sub_color();
  .player-top{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .top-left{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 20px;
      .mode{
        width: 54px;
        height: 54px;
        &.loop{
          @include bg_img('../../assets/images/small_loop')
        }
        &.one{
          @include bg_img('../../assets/images/small_one')
        }
        &.random{
          @include bg_img('../../assets/images/small_shuffle')
        }
      }
      p{
        margin-left: 20px;
        width: 130px;
        @include font_size($font_medium);
        @include font_color();
      }
    }
    .top-right{
      .del{
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/small_del')
      }
    }
  }
  .player-middle{
    /*width: 100%;*/
    height: 700px;
    overflow: hidden;
    ul{
      &.active{
        .item{
          .item-play{
            @include bg_img('../../assets/images/small_pause');
          }
        }
      }
    }
    .item{
      width: 100%;
      height: 100px;
      padding: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .item-left{
        width: 100%;
        display: flex;
        align-items: center;
        .item-play{
          width: 56px;
          height: 56px;
          @include bg_img('../../assets/images/small_play');
        }
        p{
          width: 80%;
          margin-left: 20px;
          @include font_size($font_medium_s);
          @include font_color();
          @include no-wrap();
        }
      }
      .item-right{
        display: flex;
        align-items: center;
        margin-right: 45px;
        .item-favorite{
          width: 56px;
          height: 56px;
          @include bg_img('../../assets/images/small_un_favorite');
          &.active{
            @include bg_img('../../assets/images/small_favorite');
          }
        }
        .item-del{
          width: 52px;
          height: 52px;
          @include bg_img('../../assets/images/small_close');
        }
      }
    }

  }
  .player-bottom{
    width: 100%;
    height: 100px;
    line-height: 100px;
    @include bg_color();
    p{
      text-align: center;
      color: #fff;
      @include font_size($font_medium);
    }
  }
}
</style>
