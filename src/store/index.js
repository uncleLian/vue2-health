import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '@/utils/fetch.js'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
    user: '',
    token: '',
    tasks: {
        tags: [],
        sentences: [],
        articles: [],
        tabSource: ''
    }
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
    },
    tasks: state => {
        return state.tasks
    },
    tabSource: state => {
        return state.tasks.tabSource
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
    },
    set_tasks(state, val) {
        state.tasks = val
    },
    set_tabSource(state, val) {
        state.tasks.tabSource = val
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

    // 获取文章详细数据
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
