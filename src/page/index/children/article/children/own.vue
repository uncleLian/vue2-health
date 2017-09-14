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
            <my-nothing :visible="nothing && !loading && !error"></my-nothing>
            <!-- list -->
            <article-list v-if="!loading && !error && !nothing" :itemJson="itemJson"  @edit="editArticle" @delete="deleteArticle"></article-list>
            <!-- /list -->
            <template v-if="itemJson && itemJson.length > 0">
                <my-loading :visible="more_loading"></my-loading>
                <my-error :visible="more_error" :reload="get_article_more"></my-error>
                <my-nothing :visible="more_nothing && !loading && !error">没有更多数据了</my-nothing>
            </template>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            activeName: 'all',
            itemJson: [],
            page: {
                all: 1,
                passed: 1,
                unpassed: 1,
                draft: 1,
                recall: 1
            },
            loading: false,
            error: false,
            nothing: false,
            more_loading: false,
            more_error: false,
            more_nothing: false
        }
    },
    methods: {
        ...mapActions('article', [
            'get_articleList_data'
        ]),
        ...mapMutations('publish', [
            'set_publishData'
        ]),
        ...mapActions('publish', [
            'post_article_data'
        ]),
        init() {
            this.nothing = false
            this.error = false
            this.more_loading = false
            this.more_nothing = false
            this.more_error = false
        },
        get_article() {
            this.init()
            this.loading = true
            this.page[this.activeName] = 1
            let params = {
                type: this.activeName,
                page: this.page[this.activeName]
            }
            this.get_articleList_data(params)
                .then(res => {
                    if (res && res.code === 1 && res.data) {
                        this.itemJson = res.data
                        this.page[this.activeName]++
                    } else {
                        this.itemJson = []
                        this.nothing = true
                    }
                    this.loading = false
                })
                .catch(err => {
                    console.log('get_article', err)
                    this.itemJson = []
                    this.loading = false
                    this.error = true
                })
        },
        get_article_more() {
            this.more_nothing = false
            this.more_error = false
            this.more_loading = true
            let params = {
                type: this.activeName,
                page: this.page[this.activeName]
            }
            this.get_articleList_data(params)
            .then(res => {
                if (res && res.code === 1 && res.data) {
                    this.itemJson.push(...res.data)
                    this.page[this.activeName]++
                } else {
                    this.more_nothing = true
                }
                this.more_loading = false
            })
            .catch(err => {
                console.log('get_article_more', err)
                this.itemJson = []
                this.more_loading = false
                this.more_error = true
            })
        },
        listenScroll() {
            $(window).on('scroll', (ev) => {
                ev.preventDefault()
                let timeoutRef
                if (timeoutRef) {
                    clearTimeout(timeoutRef)
                }
                timeoutRef = setTimeout(() => {
                    let scrollTop = $(window).scrollTop()
                    let windowHeight = $(window).height()
                    let documentHeight = $(document).height()
                    let footerHeight = $('#footer').height()
                    let isBottom = scrollTop + windowHeight >= documentHeight - footerHeight
                    let isInit = this.itemJson.length > 0 && !this.more_loading && !this.more_error && !this.more_nothing
                    if (isBottom && isInit) {
                        this.get_article_more()
                    }
                }, 10)
            })
        },
        editArticle(item) {
            this.$router.push(`/index/publish?id=${item.id}`)
        },
        deleteArticle(val) {
            this.$confirm('此操作将永久删除这篇文章, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
                let params = {
                    type: 'del',
                    id: val.item.id,
                    datafrom: val.item.datafrom
                }
                this.post_article_data(params)
                .then(res => {
                    this.itemJson.splice(val.index, 1)
                    this.$notify.success('删除成功!')
                })
                .catch(err => {
                    console.log('删除失败', err)
                    this.$notify.error('删除失败!')
                })
            })
            .catch(() => {
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
    created() {
        this.get_article()
    },
    mounted() {
        this.listenScroll()
    }
}
</script>
<style scoped lang='stylus'>
#own {
    padding-top: 20px;
    .own_content {
        padding-top: 15px;
    }
}
</style>