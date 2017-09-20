import { fetch } from '@/utils/fetch.js'
export default {
    namespaced: true,
    state: {
        login: '',
        user: '',
        token: ''
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
        },
        set_token(state, val) {
            state.token = val
        }
    },
    actions: {
        async get_login_data({ commit }, params) {
            let res = fetch('POST', 'login', params)
            return res
        }
    }
}
