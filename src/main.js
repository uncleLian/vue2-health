// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import cache from '@/utils/cache'

// 第三方库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'
import '@/assets/css/animate.css'
import VueProgressBar from 'vue-progressbar'
import echarts from 'echarts'
import vueNumTo from 'vue-num-to'

import '@/assets/css/reset.css'
import '@/assets/css/icon.less'
import '@/assets/css/global.css'
import '@/assets/css/transition.css'

// 自定义组件
import myHeader from '@/layout/header'
import myFooter from '@/layout/footer'
import myMenu from '@/layout/menu'
import mySidebar from '@/layout/sidebar'
import myLoading from '@/components/loading'
import articleList from '@/components/articleList'
import commentList from '@/components/commentList'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar, {
    failedColor: 'red',
    thickness: '4px'
})
Vue.prototype.$echarts = echarts
Vue.use(vueNumTo)

Vue.component('my-header', myHeader)
Vue.component('my-footer', myFooter)
Vue.component('my-menu', myMenu)
Vue.component('my-sidebar', mySidebar)
Vue.component('my-loading', myLoading)
Vue.component('article-list', articleList)
Vue.component('comment-list', commentList)

// 全局路由判断
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.login)) { // 是否需要登录
        if (cache.getToken()) {
            if (to.path === '/login') {
                next('/')
            } else {
                if (store.state.user) {
                    next()
                } else {
                    store.dispatch('get_user_data').then(res => {
                        next()
                    })
                    .catch(err => {
                        console.log('登录出错：', err)
                        // 可根据错误信息，做相应需求，这里默认token值失效
                        window.alert('登录已失效，请重新登录')
                        goLoginPage()
                    })
                }
            }
        } else {
            goLoginPage()
        }
    } else {
        next()
    }
    function goLoginPage() {
        next({ path: '/login', query: { redirect: to.fullPath } })
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
