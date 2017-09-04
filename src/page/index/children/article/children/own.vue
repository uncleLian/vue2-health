<template>
    <div id="own">
        <el-tabs class='tab_sub' v-model="activeName" type="card">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="已发表" name="passed"></el-tab-pane>
            <el-tab-pane label="未通过" name="unpassed"></el-tab-pane>
            <el-tab-pane label="草稿" name="draft"></el-tab-pane>
            <el-tab-pane label="已撤回" name="recall"></el-tab-pane>
        </el-tabs>
        <div class="own_content">
            <my-loading :visible="loading"></my-loading>
            <my-error :visible="error" :reload="get_article"></my-error>
            <my-list :itemJson="itemJson"></my-list>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            activeName: 'all',
            loading: false,
            error: false,
            itemJson: []
        }
    },
    methods: {
        ...mapActions('article', [
            'get_article_data'
        ]),
        get_article() {
            this.error = false
            this.loading = true
            this.get_article_data(this.activeName)
                .then(res => {
                    if (res.code === 1 && res.data) {
                        this.itemJson = res.data
                    }
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                    this.error = true
                })
        }
    },
    watch: {
        activeName(val) {
            if (val) {
                this.get_article()
            }
        }
    },
    mounted() {
        this.get_article()
    }
}
</script>
<style scoped lang='stylus'>
#own {
    .own_content {
        width: 100%;
    }
}
</style>