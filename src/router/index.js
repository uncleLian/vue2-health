import Vue from 'vue'
import Router from 'vue-router'

const view = () => import('@/layout/view')
// 一级页面
const login = () => import('@/page/login/login')                                    // 登录页
const preview = () => import('@/page/preview/preview')                              // 预览页
const index = () => import('@/page/index/index')                                    // 首页
// 二级页面
const home = () => import('@/page/index/children/home/home')                        // 主页
// edit
const publish = () => import('@/page/index/children/publish/publish')               // 编辑页
// manage
const articles = () => import('@/page/index/children/manage/articles/articles')     // 我的作品
const own = () => import('@/page/index/children/manage/articles/children/own')
const comment = () => import('@/page/index/children/manage/comment/comment')        // 评论管理
const newest = () => import('@/page/index/children/manage/comment/children/newest')
const all = () => import('@/page/index/children/manage/comment/children/all')
const material = () => import('@/page/index/children/manage/material/material')     // 素材管理
const pic = () => import('@/page/index/children/manage/material/children/pic')
// count
const count = () => import('@/page/index/children/count/count')                     // 统计
// setting
const setting = () => import('@/page/index/children/setting/setting')               // 设置

Vue.use(Router)

/*
* @params
* icon: ''                      菜单图标（可以用element-ui的icon & font-awesome）
* title: ''                     菜单标题
* open: true                    是否展开菜单（有子路由才生效）
* hidden: false                 是否渲染菜单
* @meta
* login: false                  是否需要登录
* keep: false                   是否需要缓存（路由出口使用view组件才生效）
*/

export const routes = [
    {
        path: '',
        redirect: '/index'
    },
    {
        name: 'index',
        path: '/index',
        redirect: '/index/home',
        meta: { login: true },
        component: index,
        children: [
            {
                name: 'home',
                path: 'home',
                title: '主页',
                icon: 'el-icon-fa-home',
                component: home
            },
            {
                name: 'publish',
                path: 'publish',
                title: '发表',
                icon: 'el-icon-fa-pencil',
                component: publish
            },
            {
                name: 'manage',
                path: 'manage',
                title: '管理',
                icon: 'el-icon-fa-cube',
                component: view,
                children: [
                    {
                        name: 'articles',
                        path: 'articles',
                        title: '内容管理',
                        component: articles,
                        redirect: '/index/manage/articles/own',
                        children: [
                            {
                                name: 'own',
                                path: 'own',
                                title: '我发表的',
                                hidden: true,
                                component: own
                            }
                        ]
                    },
                    {
                        name: 'comment',
                        path: 'comment',
                        title: '评论管理',
                        component: comment,
                        redirect: '/index/manage/comment/newest',
                        children: [
                            {
                                name: 'newest',
                                path: 'newest',
                                title: '最新评论',
                                hidden: true,
                                component: newest
                            },
                            {
                                name: 'all',
                                path: 'all',
                                title: '文章评论',
                                hidden: true,
                                component: all
                            }
                        ]
                    },
                    {
                        name: 'material',
                        path: 'material',
                        title: '素材管理',
                        component: material,
                        redirect: '/index/manage/material/pic',
                        children: [
                            {
                                name: 'pic',
                                path: 'pic',
                                title: '图片管理',
                                hidden: true,
                                component: pic
                            }
                        ]
                    }
                ]
            },
            {
                name: 'count',
                path: 'count',
                title: '统计',
                icon: 'el-icon-fa-bar-chart',
                component: count
            },
            {
                name: 'setting',
                path: 'setting',
                title: '设置',
                icon: 'el-icon-fa-cog',
                component: setting
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name: 'preview',
        path: '/preview_article',
        meta: { login: true },
        component: preview
    }
]

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
    routes
})
