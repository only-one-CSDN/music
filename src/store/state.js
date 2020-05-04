import mode from './modeType'
// state: 用于保存全局共享的数据
export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isPlayerList: false,
  isPlayer: false,
  modeType: mode.loop,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  curTime: 0,
  favoriteList: [],
  historyList: []
}
