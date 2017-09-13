<template>
    <div class="comment-list">
        <div class="comment-item" v-for="(item,index) in 3" :key="index">
            <!-- avatar -->
            <div class="comment-avatar">
                <a target="_blank">
                    <img src="http://p1.pstatp.com/thumb/249b0002779aafe50ad1" alt="">
                </a>
            </div>
            <!-- body -->
            <div class="comment-body">
                <!-- header -->
                <div class="comment-header">
                    <span class="name">小郑</span>
                    <div class="time">
                        <span>前天17:21</span>
                    </div>
                </div>
                <!-- content -->
                <div class="comment-content">
                    <div class="comment-text">我预产期在过年那几天，还得回老家去坐月子，瓦房那种[流泪]平时冬天洗澡也冷啊，但是我冬天最多一周要洗一次澡的，不晓得咋个过这个月子哟，[流泪]</div>
                    <div class="comment-article">
                        评论了我的文章：「
                        <a>急，在线等！坐月子要不要洗澡？嫂子和妈大吵起来了</a> 」
                    </div>
                </div>
                <!-- action -->
                <div class="comment-action clearfix">
                    <div class="comment-action-left">
                        <div class="comment-action-item"><i class="fa fa-thumbs-up"></i> 0</div>
                        <div class="comment-action-item"><i class="fa fa-commenting"></i> 0</div>
                    </div>
                    <div class="comment-action-right">
                        <div class="comment-action-item"><a>推荐</a></div>
                        <div class="comment-action-item"><a>回复</a></div>
                        <div class="comment-action-item"><a>点赞</a></div>
                        <div class="comment-action-item"><a>举报</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
.comment-list {
    position: relative;
    width: 100%;
    a{
        color: #406599;
        cursor: pointer;
    }
    a:hover {
        opacity: 0.6;
    }
    .comment-item {
        position: relative;
        padding: 22px 0;
        font-size: 14px;
        border-bottom: 1px solid #e8e8e8;
        .comment-avatar {
            position: absolute;
            left: 22px;
            width: 40px;
            height: 40px;
            a {
                display: block;
                img {
                    border-radius: 50%;
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .comment-body {
            padding-left: 76px;
            padding-right: 22px;            
            line-height: 1.5;
            .comment-header {
                .name {
                    cursor: pointer;
                }
                .time {
                    float: right;
                    color: #999;
                }
            }
            .comment-content {
                margin-top: 10px;
                margin-bottom: 10px;
                .comment-text {
                    word-break: break-all;
                    cursor: pointer;
                }
                .comment-article {
                    background-color: #f4f5f6;
                    line-height: 32px;
                    padding-left: 10px;
                    margin-top: 10px;
                    margin-bottom: 16px;
                    color: #222;
                }
            }
            .comment-action {
                .comment-action-item {
                    display: inline-block;
                    cursor: pointer;
                }
                .comment-action-left {
                    display: inline-block;
                    color: #999;
                    .comment-action-item{
                        margin-right: 14px;
                    }
                }
                .comment-action-right {
                    float: right;
                    .comment-action-item{
                        margin-left: 14px;
                    }
                }
            }
        }
    }
}
</style>