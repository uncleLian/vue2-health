import Vue from 'vue'
import Router from 'vue-router'

// 一级页面
import login from '@/page/login/login'                                // 登录页
import preview from '@/page/preview/preview'                          // 预览页
import index from '@/page/index/index'                                // 首页

// 二级页面
import home from '@/page/index/children/home/home'                    // 主页
// writer
import search from '@/page/index/children/writer/search'              // 素材搜索
import publish from '@/page/index/children/writer/publish'            // 作品编辑
import article from '@/page/index/children/writer/article/article'    // 我的作品
// manage
import comment from '@/page/index/children/manage/comment/comment'    // 评论管理
import material from '@/page/index/children/manage/material/material' // 素材管理
// setting
import setting from '@/page/index/children/setting/setting'           // 设置

// 三级页面
import own from '@/page/index/children/writer/article/children/own'
import newest from '@/page/index/children/manage/comment/children/newest'
import articles from '@/page/index/children/manage/comment/children/articles'
import pic from '@/page/index/children/manage/material/children/pic'

Vue.use(Router)
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
                    name: 'home',
                    path: 'home',
                    component: home
                },
                {
                    name: 'comment',
                    path: 'comment',
                    component: comment,
                    children: [
                        {
                            path: '',
                            redirect: 'newest'
                        },
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
                    children: [
                        {
                            path: '',
                            redirect: 'pic'
                        },
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
                    name: 'setting',
                    path: 'setting',
                    component: setting
                }
            ]
        }
    ]
})
