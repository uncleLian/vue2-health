<template>
    <div class="article-list" v-if="itemJson">
        <el-row class='article-item' v-for="(item,index) in itemJson" :key="index" :class="{'unpassed': item.state === '4'}">
            <el-col class='pic' :span='4'>
                <a :href="previewURL(item)" target="_blank">
            		<img :src="item.titlepic">
                    <!-- 视频标识 -->
                    <div class="playRound" v-if="item.playonlineurl">
                        <div class="playSan"></div>
                    </div>
            	</a>
            </el-col>
            <el-col class='content' :span='20'>
                <!-- title -->
                <a class="title" :href="previewURL(item)" target="_blank">{{item.title}}</a>
                <!-- 已发表 / 草稿 / 撤回 -->
                <template v-if="item.state != '4'">                    
                    <div class="abstruct">
                        <span class="passed" v-if="item.state === '1'">已发表</span>
                        <span class="draft" v-if="item.state === '2'">草稿</span>
                        <span class="auditing" v-if="item.state === '3'">审核中</span>
                        <span class="unpassed" v-if="item.state === '4'">未通过</span>
                        <span class="recall" v-if="item.state === '5'">已撤回</span>
                        <span class="" v-if="item.newstime">{{item.newstime}}</span>
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
                        <el-button icon="edit" type="text">修改</el-button>
                        <el-button icon="share" type="text">转发</el-button>
                        <el-button icon="delete" type="text" @click.stop="deleteArticle(item,index)">删除</el-button>            
                    </div>
                </template>
                <!-- 未通过 -->
                <template v-else>
                    <p class="unpassed_reason">未通过原因：内容不适合收录</p>
                    <div class="action">
                        <el-tooltip effect="dark" content="内容不适合收录，禁止修改" placement="bottom">
                             <el-button icon="edit" type="text" class="disabled">修改</el-button>
                        </el-tooltip>                        
                        <el-button icon="delete" type="text" @click.stop="deleteArticle(item,index)">删除</el-button>
                    </div>
                </template>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        'itemJson': Array
    },
    methods: {
        ...mapActions('publish', [
            'post_article_data'
        ]),
        // 预览URL
        previewURL(item) {
            if (item.state === '1') {
                return `http://m.toutiaojk.com/#/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
            } else if (item.state === '2') {
                return `/preview_article?id=${item.id}`
            }
        },
        // 删除文章
        deleteArticle(item, index) {
            console.log(index)
            this.$confirm('此操作将永久删除这篇文章, 是否继续?', '提示', {
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
                this.post_article_data(params)
                .then(res => {
                    this.$emit('delete', index) // 告诉父组件 我删除了哪个item
                    this.$message.success('删除成功!')
                })
                .catch(err => {
                    console.log('删除失败', err)
                })
            })
            .catch(() => {
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
        .pic {
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
                    margin-right: 20px;
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
                    margin-right: 16px;
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
    .list-item.unpassed{
        .pic,.content {
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