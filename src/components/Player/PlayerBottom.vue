<template>
    <div class="player-bottom">
      <div class="bottom-progress">
        <span ref="eleCurrentTime">00</span>
        <div class="progress-bar" @click="progressClick" ref="progressBar">
          <div class="progress-line" ref="progressLine">
            <div class="progress-dot"></div>
          </div>
        </div>
        <span ref="eleTotalTime">00</span>
      </div>
      <div class="bottom-control">
        <div class="mode loop" @click="mode" ref="mode"></div>
        <div class="prev" @click="prev"></div>
        <div class="play" @click="play" ref="play"></div>
        <div class="next" @click="next"></div>
        <div class="favorite" @click="favorite" :class="{'active' : isFavorite(currentSong)}"></div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
import { formatTime } from '../../tools/tools'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlayer',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSongs'
    ]),
    play () {
      this.setIsPlayer(!this.isPlayer)
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
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
    favorite () {
      this.setFavoriteSongs(this.currentSong)
    },
    isFavorite (songs) {
      const result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === songs.id
      })
      return result !== undefined
    },
    progressClick (e) {
      // 计算进度条的位置
      // const normalLeft = e.target.offsetLeft
      const normalLeft = this.$refs.progressBar.offsetLeft
      const eventLeft = e.pageX
      const clickLeft = eventLeft - normalLeft
      // const progressWidth = e.target.offsetWidth
      const progressWidth = this.$refs.progressBar.offsetWidth
      const value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'

      // 计算当前应该从什么地方开始播放
      const currentTime = this.totalTime * value
      this.setCurrentTime(currentTime)
    }
    /* formatTime (time) {
      // 2.得到两个时间之间的差值(秒)
      const differSecond = time
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24))
      day = day >= 10 ? day : '0' + day
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor(differSecond / (60 * 60) % 24)
      hour = hour >= 10 ? hour : '0' + hour
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor(differSecond / 60 % 60)
      minute = minute >= 10 ? minute : '0' + minute
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60)
      second = second >= 10 ? second : '0' + second
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
      }
    } */
  },
  computed: {
    ...mapGetters([
      'isPlayer',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    isPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
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
    totalTime (newValue, oldValue) {
      // const time = this.formatTime(newValue)
      const time = formatTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // const time = this.formatTime(newValue)
      const time = formatTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      const value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.player-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      @include font_size($font_small);
      @include font_color();
    }
    .progress-bar{
      width: 100%;
      height: 10px;
      margin: 0 10px;
      background: #fff;
      .progress-line{
        width: 0%;
        height: 10px;
        background: #666;
        position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-control{
    width: 80%  ;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    div{
      width: 84px;
      height: 84px;
    }
    .mode{
      &.loop{
        @include bg_img('../../assets/images/loop');
      }
      &.one{
        @include bg_img('../../assets/images/one');
      }
      &.random{
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev{
      @include bg_img('../../assets/images/prev')
    }
    .play{
      @include bg_img('../../assets/images/play');
      &.active{
        @include bg_img('../../assets/images/pause');
      }
    }
    .next{
      @include bg_img('../../assets/images/next');
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
      &.active{
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
