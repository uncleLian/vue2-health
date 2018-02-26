// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import cache from '@/utils/cache'

// 第三方库
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'
import '@/assets/css/animate.css'
import VueProgressBar from 'vue-progressbar'
import vueNumTo from 'vue-num-to'
import '@/assets/css/reset.css'
import '@/assets/css/icon.less'
import '@/assets/css/global.css'
import '@/assets/css/transition.css'

// 自定义组件
import header from '@/layout/header'
import footer from '@/layout/footer'
import menu from '@/layout/menu'
import menuItem from '@/layout/menuItem'
import page from '@/layout/page'
import view from '@/layout/view'
import loading from '@/components/loading'
import articleList from '@/components/articleList'
import commentList from '@/components/commentList'
import tabs from '@/components/tabs'
import backTop from '@/components/backTop'
import sticky from '@/components/sticky'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar, {
    failedColor: 'red',
    thickness: '4px'
})
Vue.use(vueNumTo)

Vue.component('my-header', header)
Vue.component('my-footer', footer)
Vue.component('my-menu', menu)
Vue.component('my-menu-item', menuItem)
Vue.component('my-page', page)
Vue.component('my-view', view)
Vue.component('my-loading', loading)
Vue.component('article-list', articleList)
Vue.component('comment-list', commentList)
Vue.component('my-tabs', tabs)
Vue.component('my-backTop', backTop)
Vue.component('my-sticky', sticky)

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

// 全局错误处理
// you can set only in production env show the error-log
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function (error, vm, info) {
        console.log('错误日志', {
            error,
            vm,
            info,
            url: window.location.href,
            time: new Date()
        })
    }
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
