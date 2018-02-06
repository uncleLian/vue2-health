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
            <my-loading :visible="loading" :reload="get_article"></my-loading>

            <!-- list -->
            <article-list v-if="!loading" :itemJson="itemJson"></article-list>

            <template v-if="itemJson && itemJson.length > 0">
                <my-loading :visible="more_loading" :reload="get_article_more">
                    <div slot="nothing">没有更多数据了</div>
                </my-loading>
            </template>
        </div>
    </div>
</template>
<script>
import { getArticleList } from '@/api'
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
            more_loading: false
        }
    },
    methods: {
        async init() {
            await this.get_article()
            this.scrollPosition()
        },
        async get_article() {
            this.more_loading = false
            this.page = {
                all: 1,
                passed: 1,
                unpassed: 1,
                draft: 1,
                recall: 1
            }
            this.loading = true
            let params = {
                type: this.activeName,
                page: this.page[this.activeName]
            }
            await getArticleList(params)
                .then(res => {
                    if (res && res.data) {
                        this.itemJson = res.data
                        this.page[this.activeName]++
                        this.loading = false
                    } else {
                        this.itemJson = []
                        this.loading = 'nothing'
                    }
                })
                .catch(() => {
                    this.itemJson = []
                    this.loading = 'error'
                })
        },
        get_article_more() {
            this.more_loading = true
            let params = {
                type: this.activeName,
                page: this.page[this.activeName]
            }
            getArticleList(params)
            .then(res => {
                if (res && res.data) {
                    this.itemJson.push(...res.data)
                    this.page[this.activeName]++
                    this.more_loading = false
                } else {
                    this.more_loading = 'nothing'
                }
            })
            .catch(() => {
                this.more_loading = 'error'
            })
        },
        onScroll() {
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
                let isInit = this.itemJson.length > 0 && !this.more_loading && this.page[this.activeName] >= 2
                if (isBottom && isInit) {
                    this.get_article_more()
                }
            }, 200)
        },
        scrollPosition() {
            if (this.$route.meta.position) {
                $(window).scrollTop(this.$route.meta.position.y)
                this.$route.meta.position.y = 0
            }
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
        this.init()
    },
    mounted() {
        $(window).on('scroll', this.onScroll)
    },
    beforeRouteLeave (to, from, next) {
        $(window).off('scroll', this.onScroll)
        next()
    }
}
</script>
<style lang='stylus'>
#own {
    padding-top: 20px;
}
</style>