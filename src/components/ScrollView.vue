<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      scrollX: false,
      scrollY: true,
      disableMouse: true,
      disablePointer: false,
      disableTouch: true
    })
    // setTimeout(() => {
    //   this.iscroll.refresh()
    //   // console.log(this.iscroll.maxScrollY)
    // }, 1000)

    // 1.创建一个观察着对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了的变化,就会执行传入的回调函数;
    mutationList: 发生变化的数组
    observer: 观察者对象
    */
    const observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
      // console.log(this.iscroll.maxScrollY)
    })

    // 2.告诉观察者对象我们需要观察什么内容
    const config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性

      /*
      // attributes: true, // 观察属性变动

      // childList: true, // 观察目标子节点的变化，是否有添加或者删除

      // characterData: true, // 节点内容或节点文本的变动

      // subtree: true, // 观察后代节点，默认为 false

      // attributeFilter: ['height', 'offsetHeight'] // 观察特定属性

      // attributeOldValue: true, // 观察 attributes 变动时, 是否需要记录变动前的属性值

      // attributeDateOldValue: true // 观察 characterData 变动, 是否需要记录变动之前的值
      */
    }

    // 3.告诉观察者对象,我们要观察谁,需要观察什么内容
    /*
    第一个参数: 告诉观察者对象我们需要观察谁
    第二个参数: 告诉观察者对象我们需要观察什么内容
    */
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
