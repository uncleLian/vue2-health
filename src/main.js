// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

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

import selectPicture from '@/components/selectPicture'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar, {
    color: '#29F',
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

Vue.component('select-picture', selectPicture)

// 全局路由判断
router.beforeEach((to, from, next) => {
    if (to.path === '/login' && store.getters.token) {
        next('/')
    } else if (to.matched.some(record => record.meta.login)) {
        let token = store.getters.token
        if (token) {
            store.commit('set_token', token)
            if (store.getters.user.userid) {
                next()
            } else {
                store.dispatch('get_user_data')
                .then(res => {
                    next()
                })
                .catch(() => {
                    window.alert('账号在别处登录，请重新登录')
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath }
                    })
                })
            }
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
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
