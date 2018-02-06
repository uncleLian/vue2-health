<template>
    <div class="article-list" v-if="itemJson">
        <el-row class='article-item' v-for="(item,index) in itemJson" :key="index" :class="{'unpassed': item.state === '4'}">
            <!-- 草稿 -->
            <template v-if="item.state === '2'">
                <div class="content">
                    <a class="title" :href="previewURL(item)" target="_blank">{{item.title}}</a>
                    <div class="abstruct">
                        <span class="draft">草稿</span>
                        <span class="time">{{item.newstime}}</span>
                    </div>
                    <div class="action">
                        <el-button icon="edit" type="text" @click="editArticle(item)">修改</el-button>
                        <el-button icon="delete" type="text" @click="deleteArticle(item,index)">删除</el-button>
                    </div>
                </div>
            </template>

            <!-- 未通过 / 已发表 / 审核中/ 已撤回 -->
            <template v-else>
                <el-col class='picture' :span='4'>
                    <a :href="previewURL(item)" target="_blank">
                        <img :src="item.titlepic">
                        <div class="playRound" v-if="item.playonlineurl">
                            <div class="playSan"></div>
                        </div>
                    </a>
                </el-col>
                <el-col class='content' :span='20'>
                    <a class="title" :href="previewURL(item)" target="_blank">{{item.title}}</a>
                    <!-- 未通过 -->
                    <template v-if="item.state === '4'">
                        <p class="unpassed_reason">未通过原因：内容不适合收录</p>
                        <div class="action">
                            <el-tooltip effect="light" content="内容不适合收录，禁止修改" placement="bottom">
                                 <el-button icon="edit" type="text" class="disabled">修改</el-button>
                            </el-tooltip>
                            <el-button icon="delete" type="text" @click="deleteArticle(item,index)">删除</el-button>
                        </div>
                    </template>

                    <!-- 已发表 / 草稿 / 撤回 -->
                    <template v-else>
                        <div class="abstruct">
                            <a class="recommend" v-if="item.state === '0'">已推荐</a>
                            <span class="passed" v-if="item.state === '0' || item.state === '1'">已发表</span>
                            <span class="auditing" v-if="item.state === '3'">审核中</span>
                            <span class="recall" v-if="item.state === '5'">已撤回</span>
                            <span class="time" v-if="item.newstime">{{item.newstime}}</span>
                        </div>
                        <div class="count">
                            <span v-if="item.onclick">阅读 {{item.onclick}}</span>
                            <span v-else>阅读 0</span>
                            <span v-if="item.plnum">评论 {{item.plnum}}</span>
                            <span v-else>评论 0</span>
                            <span v-if="item.collectnum">收藏  {{item.collectnum}}</span>
                            <span v-else>收藏 0</span>
                        </div>
                        <div class="action">
                            <el-button icon="edit" type="text" @click="editArticle(item)">修改</el-button>
                            <el-button icon="share" type="text">转发</el-button>
                            <el-dropdown placement='bottom' trigger="click">
                                    <el-button icon="more" type="text">更多</el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="recallArticle(item,index)">撤回</el-dropdown-item>
                                        <el-dropdown-item @click.native="deleteArticle(item,index)">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                            </el-dropdown>   
                        </div>
                    </template>
                </el-col>
            </template>
            
        </el-row>
    </div>
</template>
<script>
import { postArticle } from '@/api'
export default {
    props: {
        'itemJson': Array
    },
    methods: {
        previewURL(item) {
            if (item.state === '0' || item.state === '1') {
                return `http://m.toutiaojk.com/#/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
            } else {
                return `/#/preview_article?id=${item.id}`
            }
        },
        editArticle(item) {
            this.$router.push(`/index/publish?id=${item.id}`)
        },
        recallArticle(item) {
            this.$confirm('此操作将从主页上撤回这篇文章，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
                let params = {
                    type: 'recall',
                    id: item.id,
                    state: '5'
                }
                postArticle(params)
                .then(res => {
                    item.state = '5'
                    this.$notify.success('撤回成功')
                })
                .catch(err => {
                    console.log('撤回失败', err)
                    this.$notify.error('撤回失败')
                })
            })
            .catch(() => {
                console.log('撤回取消')
            })
        },
        deleteArticle(item, index) {
            this.$confirm('此操作将永久删除这篇文章，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
                let params = {
                    type: 'del',
                    id: item.id,
                    datafrom: item.datafrom
                }
                postArticle(params)
                .then(res => {
                    this.itemJson.splice(index, 1)
                    this.$notify.success('删除成功')
                })
                .catch(err => {
                    console.log('删除失败', err)
                    this.$notify.error('删除失败')
                })
            })
            .catch(() => {
                console.log('删除取消')
            })
        }
    }
}
</script>
<style lang='stylus'>
pic_height = 102px 
.article-list {
    padding: 0 24px;
    .article-item {
        position: relative;
        padding: 20px 0;
        font-size: 0;
        border-bottom: 1px solid #e8e8e8;
        a {
            display: block;
            color: #222;
        }
        .picture {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            float: none;
            height: pic_height;
            overflow: hidden;
            img {
                width: 100%;
                min-height: pic_height;
            }
            .playRound {
                position: absolute;
                width: 40px;
                height: 40px;
                left: 50%;
                top: 50%;
                margin-left: -20px;
                margin-top: -20px;
                border-radius: 50%;
                background: rgba(0, 0, 0, .6);
                z-index: 222;
            }
            .playSan {
                position: absolute;
                width: 0;
                height: 0;
                font-size: 0;
                border: 10px solid white;
                border-color: transparent transparent transparent rgba(255, 255, 255, .6);
                left: 50%;
                top: 50%;
                margin-left: -2px;
                margin-top: -10px;
            }
        }
        .content {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            float: none;
            padding-left: 18px;
            line-height: 2;
            .title {
                color: #000;
                font-size: 18px;
                line-height: 1.8;
                font-weight: 700;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .title:hover{
                opacity: 0.6;
            }
            .abstruct {
                span {
                    display: inline-block;
                    font-size: 14px;
                    color: #777;
                }
                span:not(:last-child)::after{
                    content: "\FF65";
                    margin: 0 4px;
                }
                .recommend{
                    display: inline-block;
                    font-size: 12px;
                    line-height: 18px;
                    color: #60a3f5;
                    border: 1px solid #60a3f5;
                    padding: 2px 2px 0px;
                    margin-right: 10px;
                }
            }   
            .count{
                span{
                    display: inline-block;
                    font-size: 14px;
                    color: #777;
                    margin-right: 26px;
                }
            }         
            .action {
                button{                    
                    font-size: 13px;
                    color: #777;
                    margin: 0 26px 0 0;
                }
                button:hover{
                    opacity: 0.6;
                }
            }
            .unpassed_reason{
                font-size: 14px;
                color: #ed4040;
                line-height: 2;
            }
        }
    }
    .article-item.unpassed{
        .picture,.content {
            float: left;      
        }
        .action{
            button{                
                font-size: 14px;                
                &.disabled{
                    color: #ddd;
                }
            }
        }
    }
}
</style>