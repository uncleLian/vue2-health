<template>
    <div id="comment">
        <el-tabs class='tab_main' v-model='activeName'>
            <el-tab-pane label="最新评论" name="newest"></el-tab-pane>
            <el-tab-pane label="文章评论" name="articles"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'comment',
    data() {
        return {
            activeName: 'newest'
        }
    },
    computed: {
        tabActive() {
            let activeRoute = this.$route.path
            let routerArr = [
                'newest',
                'articles'
            ]
            for (var i = 0; i < routerArr.length; i++) {
                if (activeRoute.includes(routerArr[i])) {
                    return routerArr[i]
                }
            }
        }
    },
    watch: {
        activeName(val) {
            this.$router.push(`/index/comment/${val}`)
        }
    },
    created() {
        this.activeName = this.tabActive
    }
}
</script>
<style lang='stylus'>
#comment {
    
}
</style>