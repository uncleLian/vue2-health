import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '@/utils/fetch.js'
import Cookies from 'js-cookie'

import writer_module from './writer.js'

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
        Cookies.set('Token', val, { expires: 7 })
    },
    remove_token(state) {
        state.user = ''
        state.token = ''
        Cookies.remove('Token')
    }
}

const actions = {
    // 获取登录数据
    async get_login_data({ commit }, params) {
        return new Promise((resolve, reject) => {
            fetch('POST', 'login', params)
            .then(res => {
                if (res.data && res.data.token) {
                    commit('set_token', res.data.token)
                    resolve()
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
    async get_user_data({ getters, commit }, token) {
        let params = {
            enews: 'check',
            token: getters.token
        }
        return new Promise((resolve, reject) => {
            fetch('POST', 'login', params)
            .then(res => {
                if (res.data && res.data.userid) {
                    commit('set_user', res.data)
                    resolve()
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
    actions,
    modules: {
        writer: writer_module
    }
})
