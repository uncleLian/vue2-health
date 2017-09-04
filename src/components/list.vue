<template>
    <div class="list" v-if="itemJson">
        <el-row class='list-item' v-for="(item,index) in itemJson" :key="index">
            <el-col class='pic' :span='4'>
                <a href="" target="_blank">
            		<img :src="item.titlepic">
            	</a>
            </el-col>
            <el-col class='content' :span='20'>
                <a class="title" href="" target="_blank">{{item.title}}</a>
                <div class="abstruct">
                    <span class="passed" v-if="item.state === '1'">已发布</span>
                    <span class="draft" v-if="item.state === '2'">草稿</span>
                    <span class="auditing" v-if="item.state === '3'">审核中</span>
                    <span class="unpassed" v-if="item.state === '4'">未通过</span>
                    <span class="recall" v-if="item.state === '5'">已撤回</span>
                    <span class="" v-if="item.time">{{item.time}}</span>
                </div>
                <div class="count" v-if="!(item.state === '4')">
                    <span v-if="item.onclick">阅读 {{item.onclick}}</span>
                    <span v-else>阅读 0</span>
                    <span v-if="item.plnum">评论 {{item.plnum}}</span>
                    <span v-else>评论 0</span>
                    <span v-if="item.collect">收藏  {{item.collect}}</span>
                    <span v-else>收藏 0</span>
                </div>
                <div class="action" v-if="!(item.state === '4')">
                    <span><i class="el-icon-edit"></i><em>修改</em></span>
                    <span><i class="el-icon-share"></i><em>转发</em></span>
                    <span><i class="el-icon-more"></i><em>更多</em></span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        'itemJson': Array
    }
}
</script>
<style scoped lang='stylus'>
pic_height=102px 
.list {
    padding: 0 24px;
    .list-item {
        padding: 20px 0;
        font-size: 0;
        border-bottom: 1px solid #e8e8e8;
        a {
            display: block;
            color: #222;
        }
        .pic,.content {
            display: inline-block;
            vertical-align: middle;
            float: none;
        }
        .pic {
            height: pic_height;
            overflow: hidden;
            img {
                width: 100%;
                min-height: pic_height;
            }
        }
        .content {
            padding-left: 18px;
            .title,
            .abstruct,
            .count,
            .action {
                line-height: 2;
                span {
                    display: inline-block;
                    font-size: 14px;
                    color: #777;
                    margin-right: 26px;
                }
            }
            .title {
                color: #000;
                font-size: 18px;
                line-height: 1.8;
                font-weight: 700;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .abstruct {
                span {
                    margin-right: 20px;
                }
            }
            .count {}
            .action {
                span {
                    cursor: pointer;
                    font-size: 13px;
                }
                em {
                    margin-left: 8px;
                }
            }
        }
    }
}
</style>