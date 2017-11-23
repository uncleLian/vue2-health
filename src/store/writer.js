import { fetch } from '@/utils/fetch'
export default {
    namespaced: true,
    state: {
        task: {
            tags: [],
            sentences: [],
            articles: [],
            selected: ''
        }
    },
    getters: {
        task: state => {
            return state.task
        },
        selected: state => {
            return state.task.selected
        }
    },
    mutations: {
        set_task(state, val) {
            state.task = val
        },
        set_selected(state, val) {
            state.task.selected = val
        }
    },
    actions: {
        // 获取文章列表数据
        async get_articleList_data({ rootState }, { type, page }) {
            let params = {
                'userid': rootState.user.userid
            }
            params.type = type
            params.page = page
            let res = await fetch('GET', 'list', params)
            return res
        },

        // 获取文章详细数据
        async get_article_data({ rootState }, id) {
            let params = {
                'userid': rootState.user.userid,
                'id': id,
                'type': 'edit'
            }
            let res = await fetch('GET', 'list', params)
            return res
        },

        // 提交文章数据
        async post_article_data({ rootState }, params) {
            params.userid = rootState.user.userid
            let res = await fetch('POST', 'edit', params)
            return res
        },

        // 获取素材任务数据
        async get_task_data({rootState}) {
            let params = {
                userid: rootState.user.userid,
                type: 'list'
            }
            let res = await fetch('POST', 'task', params)
            return res
        },

        // 提交素材任务数据
        async post_task_data({rootState}, params) {
            params.userid = rootState.user.userid
            let res = await fetch('POST', 'task', params)
            return res
        }
    }
}
