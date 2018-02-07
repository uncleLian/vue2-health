<template>
    <keep-alive :include="keep">
        <router-view></router-view>
    </keep-alive>
</template>
<script>
import { routes } from '@/router'
export default {
    name: 'my-view',
    data() {
        return {
            keep: []
        }
    },
    methods: {
        filterKeep(arr) {
            arr.forEach(item => {
                if (item.meta && item.meta.keep) {
                    this.keep.push(item.name)
                }
                if (item.children) {
                    this.filterKeep(item.children)
                }
            })
        }
    },
    mounted() {
        this.filterKeep(routes)
    }
}
</script>
<style lang='stylus'>
</style>
