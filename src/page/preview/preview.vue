<template>
    <div id="preview">
        <my-header></my-header>
        <div id="layout">
            <article id="article" v-if="json">
                <div class="article_info">
                    <h1 class="title">{{json.title}}</h1>
                    <span class="befrom">{{json.befrom}}</span>
                    <span class="newstime">{{json.newstime}}</span>
                </div>
                <template v-if="json.playonlineurl">
                    <div class="article_video">
                        <div class="video" :class="{'video-fixed': video_fixed}">
                            <template v-if="video_poster">
                                <div class="video_info">
                                    <img :src="json.titlepic">
                                </div>
                                <div class="playRound" @click.stop="videoPlay">
                                    <div class="playSan"></div>
                                </div>
                            </template>
                            <template v-if="video_ended">
                                <div class="video_info">
                                    <img :src="json.titlepic">
                                </div>
                                <div class="repeat">
                                    <div class="repeat_round" @click.stop="videoPlay"></div>
                                    <p class="repeat_text">重播</p>
                                </div>
                                <div class="black"></div>
                            </template>
                            <div class="loading" v-show='video_loading'>
                                <mt-spinner :type="0" :size='50'></mt-spinner>
                            </div>
                            <div class="video_box">
                                <video ref='video' :controls='!video_poster' :key='json.playonlineurl'>
                                    <source :src="json.playonlineurl" type="video/mp4">
                                </video>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <section class="article_content">
                        <div class="content_html" v-html='json.newstext'></div>
                    </section>
                </template>
            </article>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetch } from '@/config/fetch.js'
export default{
    data() {
        return {
            json: {}
        }
    },
    computed: {
        ...mapGetters('login', [
            'user'
        ])
    },
    methods: {
        get_preview_article() {
            let params = {
                'userid': this.user.userid,
                'id': this.$route.query.id
            }
            fetch('GET', 'article', params)
            .then(res => {
                if (res && res.code === 1 && res.data) {
                    this.json = res.data
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.get_preview_article()
    }
}
</script>
<style scoped lang='stylus'>
#preview{
    position: relative;
    width: 100%;
    background: #f4f5f6;
}
#layout {
    position: relative;
    width: 1138px;
    min-width: 1138px;
    margin: 36px auto 0;
    font-size: 0;
}
#article {
    width: 100%;
    position: relative;
    .article_info {
        font-size: 12px;
        overflow: hidden;
        background: #fff;
        padding: 0 0.427rem 0.4rem;
        border-bottom: 1px solid #eee;
        background: #fff;
        .title {
            color: #000;
            font-size: 20px;
            font-weight: bold;
            padding: 0.4rem 0;
        }
        .befrom {
            margin-right: 5px;
        }
    }
    .article_video {
        width: 100%;
        margin-bottom: 40px;
        .video {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 5.3rem;
        }
        .video-fixed {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index: 1000;
        }
        .video_info {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 111;
            img {
                width: 100%;
                height: 5.3rem;
            }
        }
        .playRound {
            position: absolute;
            width: 48px;
            height: 48px;
            left: 50%;
            top: 50%;
            margin-left: -24px;
            margin-top: -24px;
            border-radius: 50%;
            background: rgba(0, 0, 0, .3);
            z-index: 333;
            border: 1px solid #eee;
            .playSan {
                position: absolute;
                width: 0;
                height: 0;
                font-size: 0;
                border-width: 16px;
                border-style: solid;
                border-color: transparent transparent transparent rgba(255, 255, 255, .6);
                left: 50%;
                top: 50%;
                margin-left: -5px;
                margin-top: -16px;
            }
        }
        .loading {
            position: absolute;
            width: 50px;
            height: 50px;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -25px;
            z-index: 222;
        }
        .repeat {
            position: absolute;
            width: 44px;
            height: 44px;
            left: 50%;
            top: 50%;
            margin-left: -22px;
            margin-top: -22px;
            border-radius: 50%;
            z-index: 444;
            background: #f8f8f8;
            .repeat_round {
                width: 44px;
                height: 44px;
                background: url(../../assets/img/repeat.png) no-repeat center center;
                background-size: 28px;
            }
            .repeat_text {
                font-size: 12px;
                color: #fff;
                text-align: center;
                margin-top: 4px;
            }
        }
        .black {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 333;
            height: 200px;
            background: rgba(0, 0, 0, .3);
        }
        .video_box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            text-align: center;
            height: 5.3rem;
            video {
                width: 100%;
            }
        }
    }
    .article_content {
        position: relative;
        color: #333;
        font-size: 18px !important;
        line-height: 30px;
        padding: 0.4rem 0.427rem 0;
        .content_html {
            overflow: hidden;
            text-indent: none !important;
            font-size: inherit;
            img {
                width: 100% !important;
                height: auto !important;
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
            div,p{
                width: 100% !important;
                padding-bottom: 15px;
            }
        }
    }
}
</style>