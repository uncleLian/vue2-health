import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '@/utils/fetch.js'
import Cookies from 'js-cookie'
// import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache.js'

Vue.use(Vuex)

const state = {
    user: '',
    token: ''
}

const getters = {
    user: state => {
        return state.user
    },
    token: state => {
        if (state.token) {
            return state.token
        } else if (Cookies.get('Token')) {
            return Cookies.get('Token')
        } else {
            return ''
        }
    }
}

const mutations = {
    set_user(state, val) {
        state.user = val
    },
    set_token(state, val) {
        state.token = val
        Cookies.set('Token', val)
    }
}

const actions = {

    // 获取登录数据
    // async get_login_data({ commit }, params) {
    //     return new Promise((resolve, reject) => {
    //         fetch('POST', 'loginText', params)
    //         .then(res => {
    //             console.log('登录返回值：', res)
    //             commit('set_token', new Date())
    //             console.log('获取了token')
    //             resolve()
    //         })
    //         .catch(err => {
    //             reject(err)
    //         })
    //     })
    // },

    // 获取登录数据
    async get_login_data({ commit }, params) {
        return new Promise((resolve, reject) => {
            fetch('POST', 'login', params)
            .then(res => {
                commit('set_token', new Date(), { expires: 30 })
                console.log('获取了并设置了token值，有效期30天')
                resolve()
                // if (res.data) {
                //     commit('set_token', res.data.token)
                //     resolve()
                // }
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    // 获取用户数据
    async get_user_data({ getters, commit }, token) {
        let params = {
            type: 'check',
            token: getters.token
        }
        fetch('POST', 'login', params)
        .then(res => {
            if (res.data) {
                commit('SET_TOKEN', response.data.token)
                resolve()
            }
        })
        .catch(err => {
            reject(err)
        })
    },

    // 获取文章列表数据
    async get_articleList_data({ state }, { type, page }) {
        let params = {
            'userid': state.user.userid
        }
        params.type = type
        params.page = page
        let res = await fetch('GET', 'list', params)
        return res
    },

    // 获取文章数据
    async get_article_data({ state }, id) {
        let params = {
            'userid': state.user.userid,
            'id': id,
            'type': 'edit'
        }
        let res = await fetch('GET', 'list', params)
        return res
    },

    // 提交文章数据
    async post_article_data({ state }, params) {
        params.userid = state.user.userid
        let res = await fetch('POST', 'edit', params)
        return res
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
