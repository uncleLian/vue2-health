import Vue from 'vue'
import Router from 'vue-router'

// 一级页面
const login = () => import('@/page/login/login')                                // 登录页
const preview = () => import('@/page/preview/preview')                          // 预览页
const index = () => import('@/page/index/index')                                // 首页
// 二级页面
const home = () => import('@/page/index/children/home/home')                    // 主页
// writer
const search = () => import('@/page/index/children/writer/search')              // 素材搜索
const publish = () => import('@/page/index/children/writer/publish')           // 作品编辑
const article = () => import('@/page/index/children/writer/article/article')    // 我的作品
// manage
const comment = () => import('@/page/index/children/manage/comment/comment')    // 评论管理
const material = () => import('@/page/index/children/manage/material/material') // 素材管理
// count
const count = () => import('@/page/index/children/count/count')                 // 统计
// setting
const setting = () => import('@/page/index/children/setting/setting')           // 设置
// 三级页面
const own = () => import('@/page/index/children/writer/article/children/own')
const newest = () => import('@/page/index/children/manage/comment/children/newest')
const articles = () => import('@/page/index/children/manage/comment/children/articles')
const pic = () => import('@/page/index/children/manage/material/children/pic')

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            to.meta.position = savedPosition
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '',
            redirect: '/index'
        },
        {
            name: 'login',
            path: '/login',
            component: login
        },
        {
            name: 'preview',
            path: '/preview_article',
            component: preview,
            meta: { login: true }
        },
        {
            name: 'index',
            path: '/index',
            redirect: '/index/home',
            component: index,
            meta: { login: true },
            children: [
                {
                    name: 'home',
                    path: 'home',
                    component: home
                },
                {
                    name: 'comment',
                    path: 'comment',
                    component: comment,
                    redirect: 'comment/newest',
                    children: [
                        {
                            name: 'newest',
                            path: 'newest',
                            component: newest
                        },
                        {
                            name: 'articles',
                            path: 'articles',
                            component: articles
                        }
                    ]
                },
                {
                    name: 'material',
                    path: 'material',
                    component: material,
                    redirect: 'material/pic',
                    children: [
                        {
                            name: 'pic',
                            path: 'pic',
                            component: pic
                        }
                    ]
                },
                {
                    name: 'search',
                    path: 'search',
                    component: search
                },
                {
                    name: 'publish',
                    path: 'publish',
                    component: publish
                },
                {
                    name: 'article',
                    path: 'article',
                    component: article,
                    redirect: 'article/own',
                    children: [
                        {
                            name: 'own',
                            path: 'own',
                            component: own
                        }
                    ]
                },
                {
                    name: 'count',
                    path: 'count',
                    component: count
                },
                {
                    name: 'setting',
                    path: 'setting',
                    component: setting
                }
            ]
        }
    ]
})
