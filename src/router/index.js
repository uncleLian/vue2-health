import Vue from 'vue'
import Router from 'vue-router'

import login from '@/page/login/login'
import index from '@/page/index/index'
// publish
import publish from '@/page/index/children/publish/publish'
// home
import home from '@/page/index/children/home/home'
// aiticle
import article from '@/page/index/children/article/article'
import own from '@/page/index/children/article/children/own'
// comment
import comment from '@/page/index/children/comment/comment'
import newestCom from '@/page/index/children/comment/children/newestCom'
import articleCom from '@/page/index/children/comment/children/articleCom'
// material
import material from '@/page/index/children/material/material'
import pic from '@/page/index/children/material/children/pic'

Vue.use(Router)

export default new Router({
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
            path: '/index',
            component: index,
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
                            redirect: 'newestCom'
                        },
                        {
                            path: 'newestCom',
                            component: newestCom
                        },
                        {
                            path: 'articleCom',
                            component: articleCom
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
