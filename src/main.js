// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/css/icon.less'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

// layout
import myHeader from '@/layout/header'
import myFooter from '@/layout/footer'
import myMenu from '@/layout/menu'
Vue.component('my-footer', myFooter)
Vue.component('my-header', myHeader)
Vue.component('my-menu', myMenu)

// component
import articleList from '@/components/articleList'
import commentList from '@/components/commentList'
import myLoading from '@/components/loading'
import myError from '@/components/error'
import myNothing from '@/components/nothing'
Vue.component('article-list', articleList)
Vue.component('comment-list', commentList)
Vue.component('my-loading', myLoading)
Vue.component('my-error', myError)
Vue.component('my-nothing', myNothing)

router.beforeEach((to, from, next) => {
  console.log('判断是否需要登录')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('要登录')
    let token = store.getters.token
    store.commit('set_token', token)
    console.log('获取token值，验证是否已经登录过了')
    if (!token) {
      console.log('没有token值或已失效，需要重新登录')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      console.log('有token值，已经登录，正在拉去用户信息')
      if (store.getters.user.userid) {
        next()
      } else {
        store.dispatch('get_user_data')
          .then(res => {
            console.log('获取用户信息成功，正在进入路由')
            let data = {
              userid: 'oqKkTv6XI_iDnYha-1VYKbtsvbYw',
              nickname: '小郑',
              headimgurl: 'http://wx.qlogo.cn/mmopen/2IWjic7SiaU1Zctuxl3SG5PHv38RExvPYWC7OkicOrfMZzB2Y84icaOfFVJsjBEPJqbtha2PpJJ38cCpXqff3PRn4n3ZlZzOs2Bic/0'
            }
            store.commit('set_user', data)
            console.log('获取用户信息成功，已commit')
            next()
            // if (res.data) {
            //   store.commit('set_user', res.data)
            //   console.log('获取用户信息成功，已commit')
            //   next()
            // }
          })
      }
    }
  } else {
    console.log('不用登录')
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
