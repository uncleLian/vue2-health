// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 第三方库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/css/icon.less'
import VueQuillEditor from 'vue-quill-editor'

// 自定义组件
import myHeader from '@/layout/header'
import myFooter from '@/layout/footer'
import myMenu from '@/layout/menu'
import mySidebar from '@/layout/sidebar'
import myLoading from '@/components/loading'
import myError from '@/components/error'
import myNothing from '@/components/nothing'
import articleList from '@/components/articleList'
import commentList from '@/components/commentList'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.component('my-header', myHeader)
Vue.component('my-footer', myFooter)
Vue.component('my-menu', myMenu)
Vue.component('my-sidebar', mySidebar)
Vue.component('my-loading', myLoading)
Vue.component('my-error', myError)
Vue.component('my-nothing', myNothing)
Vue.component('article-list', articleList)
Vue.component('comment-list', commentList)

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
