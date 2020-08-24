import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'pages/Home.vue'
import Login from 'pages/Login.vue'
import PostList from 'pages/PostList.vue'
import PostPublish from 'pages/PostPublish.vue'
import MainPage from 'pages/MainPage.vue'
Vue.use(VueRouter)

// 解决push, 重复跳转路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: '/',
      component: Home,
      children: [
        { path: '', name: '/', component: MainPage },
        { path: 'post-list', name: 'post-list', component: PostList },
        { path: 'post-publish', name: 'post-publish', component: PostPublish }
      ]
    },
    { path: '/login', name: 'login', component: Login }
  ]
})

// 移动端: 首页 (不登录就能访问的)   个人中心(需要登录才能访问的)
// PC后台系统: 除了登录页, 是不需要登录的, 其他所有页面都是需要登录才能访问的!!!

// 全局前置守卫: 所有的路由在真正被访问前, 都会先经过全局前置守卫
// 只有前置守卫放行了, 才能显示对应的页面

// 如果是登录页, 直接放行
// 如果有token, 直接放行
// 其他情况 (不是登录页, 也没有token) 拦截到登录
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    // next('/login')
    router.push('/login')
  }
})
export default router
