import { fetch } from '@/config/fetch.js'
import { set_local_cache } from '@/config/cache.js'

export default {
    namespaced: true,
    state: {
        login: '',
        user: ''
    },
    getters: {
        login: state => {
            return state.login
        },
        user: state => {
            return state.user
        }
    },
    mutations: {
        set_login(state, val) {
            state.login = val
        },
        set_user(state, val) {
            state.user = val
            set_local_cache('user', val)
        }
    },
    actions: {
        async get_login_data(params) {
            let res = fetch('POST', 'login', params)
            return res
        }
    }
}
