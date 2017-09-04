import { fetch } from '@/config/fetch.js'
// import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache.js'

export default{
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async post_article_data({ state, commit, rootState }, params) {
            params.userid = rootState.login.user.userid
            let res = await fetch('POST', 'edit', params)
            return res
        }
    }
}
