import Vue from 'vue'
import VueRouter from 'vue-router'

// 注意点: 通过 improt xxx from xxx的方式加载组件, 无论组件有没有被用到, 都会被加载进来
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'

// 实现vue组件按需加载
// const Recommend = (resolve) => {
//   import('../views/Recommend').then(function (module) {
//     resolve(module)
//   })
// }
const Recommend = () => import('../views/Recommend')
const Detail = () => import('../views/Detail')
const Singer = () => import('../views/Singer')
const Rank = () => import('../views/Rank')
const Search = () => import('../views/Search')
const Account = () => import('../views/Account')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  { path: '/search', component: Search },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
