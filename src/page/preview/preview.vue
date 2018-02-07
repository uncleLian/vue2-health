<template>
    <div id="preview">
        <my-header></my-header>

        <div class="layout">
            <!-- options -->
            <div class="mobileOptions">
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; font-size: 13px">{{ item.size }}</span>
                    </el-option>
              </el-select>
            </div>
            <!-- article -->
            <article class="article" v-if="json" :class="value">
                <h1 class="article_title">{{json.title}}</h1>
                <div class="article_sub">
                    <span>{{json.befrom}}</span>
                    <span>{{json.time}}</span>
                </div>
                <div class="article_content" v-html="json.newstext"></div>
            </article>
        </div>

        <my-footer></my-footer>
    </div>
</template>
<script>
import { getArticle } from '@/api'
export default{
    name: 'preview',
    data() {
        return {
            json: {},
            value: 'iPhone6',
            options: [
                {
                    value: 'iPhone5',
                    label: 'iPhone5',
                    size: '320 x 568'
                },
                {
                    value: 'iPhone6',
                    label: 'iPhone6',
                    size: '375 x 667'
                },
                {
                    value: 'iPhone6Plus',
                    label: 'iPhone6 Plus',
                    size: '414 x 736'
                },
                {
                    value: 'iPad',
                    label: 'iPad',
                    size: '768 x 1024'
                }
            ]
        }
    },
    methods: {
        get_article() {
            getArticle(this.$route.query.id)
            .then(res => {
                if (res.data) {
                    this.json = res.data
                } else {
                    this.$message.error('没有文章数据')
                }
            })
            .catch(err => {
                console.log(err)
                this.$message.error('没有文章数据')
            })
        }
    },
    created() {
        this.get_article()
    }
}
</script>
<style lang='stylus'>
#preview{
    position: relative;
    width: 100%;
    background: #f4f5f6;
    .layout {
        position: relative;
        width: 1138px;
        min-width: 1138px;
        margin: 36px auto 0;
        font-size: 0;
        .mobileOptions{
            margin-bottom: 30px;
            text-align: center;
            span{
                cursor: pointer;
                user-select: none;
            }
        }
        .article {
            position: relative;
            width: 375px;
            min-height: 667px;
            padding: 0 16px;
            background: #fff;
            &.iPhone5{
                width: 320px;
                min-height: 568px;
            }
            &.iPhone6{
                width: 375px;
                min-height: 667px;
            }
            &.iPhone6Plus{
                width: 414px;
                min-height: 763px;
            }
            &.iPad{
                width: 768px;
                min-height: 1024px;
            }
            .article_title{
                font-size: 20px;
                font-weight: 700;
                color: #000;
                padding-top: 16px;
            }
            .article_sub{
                margin-top: 12px;
                margin-bottom: 20px;
                font-size: 13px;
                span{
                    color: #777;
                    margin-right: 2px;
                }
            }
            .article_content {
                position: relative;
                font-size: 18px;
                color: #333;
                line-height: 30px;
                padding-bottom: 24px;
                p{
                    margin-bottom: 15px;
                }
                img{
                    width: 100%;
                    height: auto;
                }
                img[type="icon"]{
                    width: initial!important;
                }
                *{
                    text-indent: inherit !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    line-height: inherit !important;
                    text-align: justify !important;
                    text-justify: inter-ideograph !important;
                }
            }
        }
    }
}

</style>