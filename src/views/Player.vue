<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <PlayerList ref="playerList"></PlayerList>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import PlayerList from '../components/Player/PlayerList'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../tools/tools'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    PlayerList
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlayer',
      'currentIndex',
      'curTime',
      'modeType',
      'currentIndex',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySongs',
      'setHistoryList'
    ]),
    timeupdate (e) {
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        const index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  watch: {
    isPlayer (newValue, oldValue) {
      if (newValue) {
        this.setHistorySongs(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      /*
      注意点: 在iOS中系统不会自动加载歌曲, 所以oncanplay不会自动执行
              https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html
              在PC端和Android端, 系统会自动加载歌曲, 所以oncanplay会自动被执行
      解决方案: 如何监听iOS中Audio的歌曲是否已经准备好了, 通过ondurationchange事件来监听
                ondurationchange事件什么时候执行: 当歌曲加载完成之后执行, 因为只有歌曲加载完成之后才能获取到歌曲的总时长
      * */
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlayer) {
          this.setHistorySongs(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      // window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
      setLocalStorage('favoriteList', newValue)
    },
    historyList (newValue, oldValue) {
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      setLocalStorage('historyList', newValue)
    }
  },
  created () {
    // let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    const favoriteList = getLocalStorage('favoriteList')
    if (favoriteList === null) { return }
    this.setFavoriteList(favoriteList)

    // const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    const historyList = getLocalStorage('historyList')
    if (historyList === null) { return }
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  }
}
</script>

<style scoped lang="scss">
</style>
