import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '@/utils/fetch.js'
// import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache.js'
import login_module from './login.js'

Vue.use(Vuex)

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    // 获取文章列表数据
    async get_articleList_data({ rootState }, { type, page }) {
        let params = {
            'userid': rootState.login.user.userid
        }
        params.type = type
        params.page = page
        let res = await fetch('GET', 'list', params)
        return res
    },
    // 获取文章数据
    async get_article_data({ rootState }, id) {
        let params = {
            'userid': rootState.login.user.userid,
            'id': id,
            'type': 'edit'
        }
        let res = await fetch('GET', 'list', params)
        return res
    },
    // 提交文章数据
    async post_article_data({ rootState }, params) {
        params.userid = rootState.login.user.userid
        let res = await fetch('POST', 'edit', params)
        return res
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        login: login_module
    }
})
