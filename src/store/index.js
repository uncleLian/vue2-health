import Vue from 'vue'
import Vuex from 'vuex'
import { getLogin, getUser } from '@/api'
import cache from '@/utils/cache'

Vue.use(Vuex)

const state = {
    user: ''
}

const getters = {
}

const mutations = {
    set_user(state, val) {
        state.user = val
    },
    remove_token(state) {
        state.user = ''
        cache.removeToken()
    }
}

const actions = {
    // 获取登录数据
    async get_login_data({ commit }, params) {
        return new Promise((resolve, reject) => {
            getLogin(params)
            .then(res => {
                if (res.data && res.data.token) {
                    cache.setToken(res.data.token)
                    resolve(res.data)
                } else {
                    reject(new Error('nothing data'))
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    // 获取用户数据
    async get_user_data({ commit }) {
        return new Promise((resolve, reject) => {
            getUser(cache.getToken())
            .then(res => {
                if (res && res.data) {
                    commit('set_user', res.data)
                    resolve(res.data)
                } else {
                    commit('remove_token')
                    reject(new Error('nothing data'))
                }
            })
            .catch(err => {
                commit('remove_token')
                reject(err)
            })
        })
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
