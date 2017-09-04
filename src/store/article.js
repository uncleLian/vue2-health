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
        async get_article_data({ rootState, commit }, type) {
            let params = {
                'userid': rootState.login.user.userid
            }
            params.type = type
            let res = await fetch('GET', 'article', params)
            return res
        }
    }
}
