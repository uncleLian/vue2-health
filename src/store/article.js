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
        async get_articleList_data({ rootState, commit }, {type, page}) {
            let params = {
                'userid': rootState.login.user.userid
            }
            params.type = type
            params.page = page
            let res = await fetch('GET', 'list', params)
            return res
        }
    }
}
