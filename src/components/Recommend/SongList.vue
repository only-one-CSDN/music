<template>
    <div class="song">
      <div class="song-top">
        <h3>最新音乐</h3>
      </div>
      <!--<ul class="song-list">
        <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
&lt;!&ndash;          <img :src="value.song.album.picUrl" alt="">&ndash;&gt;
          <img v-lazy="value.song.album.picUrl" alt="">
          <div>
            <h3>{{ value.name}}</h3>
            <p> {{ value.song.artists[0].name}}</p>
          </div>
        </li>
      </ul>-->
      <SongListItem :songs="songs"></SongListItem>
    </div>
</template>

<script>
import SongListItem from '../SongListItem'
// import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  components: {
    SongListItem
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  }
  /* methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  } */
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.song{
  width: 100%;
  @include bg_sub_color();
  .song-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3{
      @include font_size($font_large);
      @include font_color();
    }
  }
  /*.song-list{
    width: 100%;
    overflow: hidden;
    .item{
      width: 100%;
      height: 200px;
      margin-left: 20px;
      display: flex;
      align-items:center;
      border-bottom: 1px solid #ccc;
    }
    img{
      width: 150px;
      height: 150px;
      border-radius: 20px;
    }
    div{
      line-height: 50px;
      margin-left: 20px;
      h3{
        @include font_size($font_large);
        @include font_color();
      }
      p{
        @include font_size($font_small);
        @include font_color();
        opacity: 0.6;
      }
    }
  }*/
}
</style>
