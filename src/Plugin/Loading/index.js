// import Vue from 'vue'
import Loading from './Loading'
export default {
  install: function (Vue, Options) {
    // 注意点: 如果想将一个组件封装成一个插件, 那么必须提供一个install方法,
    //        通过install方法来注册当前组件
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的install方法，同时传一个Vue这个类的参数。
    // Vue.component(Loading.name, Loading)

    // 1.根据组件生成一个构造函数
    const LoadingConstructor = Vue.extend(Loading)
    // 2.根据构造函数创建实例对象
    const LoadingInstance = new LoadingConstructor()
    // 3.创建一个标签(元素)
    const oDiv = document.createElement('div')
    // 4.将创建好的标签添加到界面上
    document.body.appendChild(oDiv)
    // 5.将创建好的实例对象挂载到创建好的元素上
    LoadingInstance.$mount(oDiv)

    // console.log(Options.title)
    // console.log(LoadingInstance.title)

    // 添加初始化值
    if (Options && Options.title !== null && Options.title !== undefined) {
      LoadingInstance.title = Options.title
    }
    // 添加全局方法
    Vue.showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
    // 添加实例方法
    Vue.prototype.$showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.prototype.$hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
  }
}
