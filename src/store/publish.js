import { fetch } from '@/config/fetch.js'
// import { getCache, setCache } from '@/config/cache.js'

export default{
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async get_article_data({ rootState }, id) {
            let params = {
                'userid': rootState.login.user.userid,
                'id': id,
                'type': 'edit'
            }
            let res = await fetch('GET', 'list', params)
            return res
        },
        async post_article_data({ rootState }, params) {
            params.userid = rootState.login.user.userid
            let res = await fetch('POST', 'edit', params)
            return res
        }
    }
}
