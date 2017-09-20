import Vue from 'vue'
import Router from 'vue-router'

// 一级页面
import login from '@/page/login/login'
import preview from '@/page/preview/preview'
import index from '@/page/index/index'

// 二级页面
import publish from '@/page/index/children/publish/publish'

import home from '@/page/index/children/home/home'

import article from '@/page/index/children/article/article'
import own from '@/page/index/children/article/children/own'

import comment from '@/page/index/children/comment/comment'
import newest from '@/page/index/children/comment/children/newest'
import articles from '@/page/index/children/comment/children/articles'

import material from '@/page/index/children/material/material'
import pic from '@/page/index/children/material/children/pic'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/preview_article',
            component: preview
        },
        {
            path: '/index',
            component: index,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'publish',
                    component: publish
                },
                {
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
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     console.log('判断是否登录')
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     console.log('要登录')
//     let login = false
//     if (!login) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//         console.log('已登录')
//       next()
//     }
//   } else {
//     console.log('不用登录')
//     next() // 确保一定要调用 next()
//   }
// })

export default router
