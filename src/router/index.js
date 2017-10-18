import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// // 一级页面
// const login = () => import('@/page/login/login')
// const preview = () => import('@/page/preview/preview')
// const index = () => import('@/page/index/index')

// // 二级页面
// const publish = () => import('@/page/index/children/publish/publish') // 发表页
// const home = () => import('@/page/index/children/home/home') // 主页
// const article = () => import('@/page/index/children/article/article') // 内容文章
// const own = () => import('@/page/index/children/article/children/own')
// const comment = () => import('@/page/index/children/comment/comment') // 评论
// const newest = () => import('@/page/index/children/comment/children/newest')
// const articles = () => import('@/page/index/children/comment/children/articles')
// const material = () => import('@/page/index/children/material/material') // 素材
// const pic = () => import('@/page/index/children/material/children/pic')
// const count = () => import('@/page/index/children/count/count') // 统计
// const setting = () => import('@/page/index/children/setting/setting') // 设置

// 一级页面
import login from '@/page/login/login'
import preview from '@/page/preview/preview'
import index from '@/page/index/index'

// 二级页面
import publish from '@/page/index/children/publish/publish' // 发表页
import home from '@/page/index/children/home/home' // 主页
import article from '@/page/index/children/article/article' // 内容文章
import own from '@/page/index/children/article/children/own'
import comment from '@/page/index/children/comment/comment' // 评论
import newest from '@/page/index/children/comment/children/newest'
import articles from '@/page/index/children/comment/children/articles'
import material from '@/page/index/children/material/material' // 素材
import pic from '@/page/index/children/material/children/pic'
import count from '@/page/index/children/count/count' // 统计
import setting from '@/page/index/children/setting/setting' // 设置

export default new Router({
    mode: 'history',
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
                    name: 'publish',
                    path: 'publish',
                    component: publish
                },
                {
                    name: 'home',
                    path: 'home',
                    component: home
                },
                {
                    path: 'article',
                    component: article,
                    children: [
                        {
                            path: '',
                            redirect: 'own'
                        },
                        {
                            name: 'own',
                            path: 'own',
                            component: own
                        }
                    ]
                },
                {
                    path: 'comment',
                    component: comment,
                    children: [
                        {
                            path: '',
                            redirect: 'newest'
                        },
                        {
                            path: 'newest',
                            component: newest
                        },
                        {
                            path: 'articles',
                            component: articles
                        }
                    ]
                },
                {
                    path: 'material',
                    component: material,
                    children: [
                        {
                            path: '',
                            redirect: 'pic'
                        },
                        {
                            path: 'pic',
                            component: pic
                        }
                    ]
                },
                {
                    path: 'count',
                    component: count
                },
                {
                    path: 'setting',
                    component: setting
                }
            ]
        }
    ]
})
