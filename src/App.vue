<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import '@/assets/css/reset.css'
import { getCache } from '@/config/cache.js'
import { mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations('login', [
            'set_user'
        ]),
        get_cache() {
            let user = JSON.parse(getCache('user'))
            this.set_user(user)
        }
    },
    created() {
        this.get_cache()
    }
}
</script>
<style lang='stylus'>
#app {
    position: relative;
    height: 100%;
    min-height: inherit;
}
</style>