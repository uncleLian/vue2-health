import Vue from 'vue'
import Vuex from 'vuex'
import login_module from './login.js'
import article_module from './article.js'
import publish_module from './publish.js'
// import { fetch } from '@/config/fetch.js'
// import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache.js'

Vue.use(Vuex)

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        login: login_module,
        article: article_module,
        publish: publish_module
    }
})
