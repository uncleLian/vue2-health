// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

import myHeader from '@/layout/header'
import myFooter from '@/layout/footer'
import myMenu from '@/layout/menu'
Vue.component('my-footer', myFooter)
Vue.component('my-header', myHeader)
Vue.component('my-menu', myMenu)
// layout
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
// component

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
