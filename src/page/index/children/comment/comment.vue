<template>
    <div id="comment">
        <el-tabs class='tab_main' v-model='activeName'>
            <el-tab-pane label="最新评论" name="newestCom"></el-tab-pane>
            <el-tab-pane label="文章评论" name="articleCom"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'newestCom'
        }
    },
    computed: {
        tabActive() {
            let activeRoute = this.$route.path
            let routerArr = [
                'newestCom',
                'articleCom'
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
<style scoped lang='stylus'>
#comment {
    
}
</style>