<template>
    <div id="login">
        <swiper class="swiper" ref="mySwiper" :options="swiperOption">
            <swiper-slide>
                <div class="page login-page1">
                    <div class="page1_wrap">
                        <img class="page1_logo" src="~@/assets/img/login_logo.png">
                        <div class="page1_content">
                            <span class="register_btn">注册</span>
                            <span class="login_btn" @click.stop="dialogFormVisible = true">登录</span>
                        </div>
                    </div>
                    <a class="projectLogo" href="https://github.com/uncleLian/vue2-health" target="_blank">vue2-health</a>
                    <!-- ripple -->
                    <div class="ripple left">
                        <i class="r1"></i>
                        <i class="r2"></i>
                        <i class="r3"></i>
                        <i class="r4"></i>
                        <i class="r5"></i>
                    </div>
                    <div class="ripple right">
                        <i class="r1"></i>
                        <i class="r2"></i>
                        <i class="r3"></i>
                        <i class="r4"></i>
                        <i class="r5"></i>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="page login-page2">
                    <div class="page2-wrap">
                        <div class="ani page2-content" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.8s">
                            <a class="link" href="javascript:;">观看视频，进一步了解头条号</a>
                            <h2>高速成长的新兴创作平台</h2>
                            <p>当其他公众平台已是红海，</p>
                            <p>我们才刚进入红利期，</p>
                            <p>而且，我们还在高速成长。</p>
                        </div>
                        <div class="page2-picture">
                            <div class="iphone">
                                <div class="count" v-if="page === 2">
                                    <vue-num-to :endVal="723245" prefix="+" :duration="1000"></vue-num-to>
                                </div>
                            </div>
                            <div class="animate-cuve">
                                <svg v-if="page === 2" height="362" version="1.1" width="625" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative; left: -0.5px;">
                                    <circle cx="-10" cy="-10" r="10" fill="#38c6ff" stroke="#ddf1ff" stroke-width="5px" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" transform="matrix(1,0,0,1,0, 0)">
                                        <animateMotion path="M155,295C245,280,335,220,355,190" dur="0.8s" repeatCount="1" calcMode="discrete" />
                                        <set attributeName="transform" attributeType="XML" to="matrix(1,0,0,1,345, 180)" begin="1.6s" />
                                        <set attributeName="cx" attributeType="XML" to="345" begin="0.8s" />
                                        <set attributeName="cy" attributeType="XML" to="180" begin="0.8s" />
                                    </circle>
                                    <image x="-90" y="-90" width="177" height="62" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="~@/assets/img/message.png" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" transform="matrix(1,0,0,1,0, 0)">
                                        <animateMotion path="M145,285C235,270,325,210,345,180" dur="0.8s" repeatCount="1" calcMode="discrete" />
                                        <set attributeName="x" attributeType="XML" to="255" begin="0.8s" />
                                        <set attributeName="y" attributeType="XML" to="90" begin="0.8s" />
                                    </image>
                                    <text x="10" y="-60" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="18px" stroke="none" fill="#539fe0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 18px;" transform="matrix(1,0,0,1,0, 0)">
                                        <animateMotion path="M145,285C235,270,325,210,345,180" dur="0.8s" repeatCount="1" calcMode="discrete" />
                                        <set attributeName="x" attributeType="XML" to="355" begin="0.8s" />
                                        <set attributeName="y" attributeType="XML" to="120" begin="0.8s" />
                                        <vue-num-to v-model="increaseNum" :endVal="623535" :duration="1000"></vue-num-to>
                                        <tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="6">{{increaseNum}}</tspan>
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="page login-page3">
                    <div class="page3-wrap">
                        <div class="circle-wrapper">
                            <div class="circle" v-if="page === 3">
                                <div class="circle-wrap-1">
                                    <span class="circle-1"></span>
                                </div>
                                <div class="circle-wrap-2">
                                    <span class="circle-2"></span>
                                </div>
                                <div class="circle-wrap-3">
                                    <span class="circle-3"></span>
                                </div>
                                <div class="circle-wrap-4">
                                    <span class="circle-4"></span>
                                </div>
                                <div class="circle-wrap-5">
                                    <span class="circle-5"></span>
                                </div>
                                <div class="circle-wrap-6">
                                    <span class="circle-6"></span>
                                </div>
                                <div class="circle-wrap-7">
                                    <span class="circle-7"></span>
                                </div>
                                <span class="digup"></span>
                                <span class="like"></span>
                                <span class="search"></span>
                                <span class="favorite"></span>
                            </div>
                        </div>
                        <div class="ani article" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.8s">
                             <a class="link" target="_blank" href="javascript:;">观看视频，了解头条号推荐机制</a>
                            <h2>迄今为止</h2>
                            <h2>最科学和精确的推荐引擎</h2>
                            <div class="text">
                                <p>依托今日头条独创的大数据算法，</p>
                                <p>你所创作的内容可以在数秒之内，</p>
                                <p>就抵达目标读者的手机上。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" :class="{'other': page !== 1}" slot="pagination"></div>
        </swiper>
        <!-- dialog -->
        <el-dialog class='login_box' title="登录" :visible.sync="dialogFormVisible">
            <!-- form -->
            <el-form :model="form" @submit.native.prevent="verify">
                <el-form-item>
                    <el-input v-model="form.username" placeholder="邮箱/手机号" auto-complete='off' /></el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="密码" auto-complete='off' type="password" /></el-form-item>
                <div class="agree_item">
                    <el-checkbox v-model="form.agree">我已阅读并同意<a href="###">用户协议和隐私条款</a></el-checkbox>
                    <a href="###" class="forget">忘记密码</a>
                </div>
                <el-input class="login_btn" type="submit" value="登录" />
            </el-form>
            <!-- otherLogin -->
            <ul slot="footer" class="otherLogin">
                <li class="wx"><span>微信</span></li>
                <li class="qq"><span>QQ</span></li>
            </ul>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'login',
    data() {
        return {
            swiperOption: {
                direction: 'vertical',
                slidesPerView: 1,
                mousewheel: true,
                speed: 1000,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                on: {
                    init: function() {
                        swiperAnimateCache(this)
                        swiperAnimate(this)
                    },
                    slideChangeTransitionEnd: () => {
                        this.page = this.swiper.activeIndex + 1
                        swiperAnimate(this.swiper)
                    }
                }
            },
            page: 1,
            increaseNum: 623535,
            dialogFormVisible: false, // 登录框
            form: {
                username: 'etone',
                password: '123456',
                agree: true
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        ...mapActions([
            'get_login_data'
        ]),
        login() {
            let params = {
                enews: 'login',
                username: this.form.username,
                password: this.form.password,
                equestion: 0
            }
            this.get_login_data(params)
                .then(() => {
                    this.$route.query.redirect ? this.$router.push(this.$route.query.redirect) : this.$router.push('/index/home')
                })
                .catch(() => {
                    this.$message.error('账号密码错误')
                })
        },
        verify() {
            if (this.form.username && this.form.password && this.form.agree) {
                this.login()
            } else if (!this.form.username) {
                this.$message.error('请输入账号')
            } else if (!this.form.password) {
                this.$message.error('请输入密码')
            } else if (!this.form.agree) {
                this.$message.error('请阅读并同意用户协议和隐私条款')
            }
        }
    }
}
</script>
<style lang='stylus'>
bgColor=#ff6e7c
bgColor2=#ff776d
#login {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    color: #333;
    .swiper {
        width: 100%;
        height: 100%;
        .swiper-slide {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .swiper-pagination {
            left: 10px;
            top: 40%;
            transform: none;
            right: inherit;
            .swiper-pagination-bullet {
                background: #f7f9fa;
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin: 0 auto;
                margin-bottom: 10px;
                cursor: pointer;
                opacity: 1;
            }
            .swiper-pagination-bullet-active {
                border: 4px solid #fff;
                background: transparent;
                width: 16px;
                height: 16px;
            }
        }
        .swiper-pagination.other{
            .swiper-pagination-bullet{
                background: #d2d4d6;
            }
            .swiper-pagination-bullet-active{
                border-color: #f95e58;
                background: transparent;
            }
        }
    }
    .page {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow: hidden;
        a.link{
            display: inline-block;
            border-bottom: 1px solid #EBEBEC;
            margin-bottom: 10px;
            padding-bottom: 4px;
            line-height: 22px;
            font-size: 16px;
            color: #899ec5;
        }
    }
    .login-page1 {
        background: linear-gradient(bgColor, bgColor2);
        color: #333;
        li:hover {
            opacity: 0.8 !important;
        }
        .projectLogo{
            position: absolute;
            top: 20px;
            left: 30px;
            z-index: 999;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
        }
        .page1_wrap {
            width: 440px;
            height: 280px;
            position: absolute;
            top: 45%;
            left: 0;
            right: 0;
            margin: auto;
            border-radius: 4px;
            .page1_logo {
                width: 386px;
                height: 215px;
                position: absolute;
                top: -250px;
                right: 0;
                left: 0;
                margin: auto;
            }
            .page1_content {
                width: 368px;
                margin: 61px auto 0;
                font-size: 0;
                user-select: none;
                text-align: center;
                span {
                    display: inline-block;
                    width: 164px;
                    height: 62px;
                    color: #fff;
                    font-size: 22px;
                    border-radius: 4px;
                    text-align: center;
                    line-height: 62px;
                    border: 1px solid #fff;
                    text-decoration: none;
                    cursor: pointer;
                }
                span:hover {
                    opacity: 0.7;
                }
                .register_btn {
                    margin-right: 40px;
                }
                .login_btn {
                    color: bgColor;
                    background-color: #fff;
                    border: 1px solid bgColor;
                }
            }
        }
        .ripple {
            position: absolute;
            &>i {
                border: 1px solid #fff;
                position: absolute;
                border-bottom: 0;
                border-radius: 50%;
                opacity: 0;
                animation: ripple 10s infinite ease-out;
            }
            &.left {
                width: 800px;
                height: 800px;
                bottom: -750px;
                left: 50px;
                &>i {
                    width: 200px;
                    height: 200px;
                }
            }
            &.right {
                width: 100px;
                height: 100px;
                top: 25%;
                right: -50px;
                &>i {
                    width: 100px;
                    height: 100px;
                }
            }
            .r2 {
                animation-delay: 2s;
            }
            .r3 {
                animation-delay: 4s;
            }
            .r4 {
                animation-delay: 6s;
            }
            .r5 {
                animation-delay: 8s;
            }
        }
    }
    .login-page2 {
        background: #f7f9fa;
        .page2-wrap {
            position: relative;
            height: 100%;
            width: 82%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .page2-content {
                position: relative;
                width: 450px;
                padding: 32px;
                border: 4px solid #f95e58;
                font-weight: 300;
                h2 {
                    font-size: 30px;
                    color: #222;
                    line-height: 55px;
                    font-weight: inherit;
                }
                p {
                    line-height: 22px;
                    font-size: 16px;
                }
            }
            .page2-picture {
                position: relative;
                width: 625px;
                height: 362px;
                font-size: 24px;
                color: #539fe0;
                .iphone {
                    width: 211px;
                    height: 291px;
                    position: absolute;
                    bottom: -24px;
                    left: -10px;
                    .count {
                        position: absolute;
                        font-size: 18px;
                        right: 15px;
                        top: 91px;
                    }
                }
                .animate-cuve {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 3;
                    svg {
                        position: relative;
                        path {
                            transition: all 2s ease-in;
                        }
                        cricle {
                            transition: all 2s ease-in;
                        }
                    }
                }
            }
        }
    }
    .login-page3 {
        background: #f2f3f4;
        .page3-wrap {
            position: relative;
            height: 100%;
            width: fit-content;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 1000px;
            backface-visibility: hidden;
            .circle-wrapper{
                position: relative;
                width: 470px;
                height: 522px;
            }
            .circle {
                position: relative;
                top: -50px;
                width: 470px;
                height: 522px;
                transform-style: preserve-3d;
                animation: rings-translate 1s 1 linear reverse both;
                .circle-wrap-1 {
                    transform: translateZ(-140px);
                    .circle-1 {
                        animation: spin 35s infinite linear;
                        width: 470px;
                        height: 470px;
                        display: block;
                        position: absolute;
                    }
                }
                .circle-wrap-2 {
                    transform: translateZ(-120px);
                    .circle-2 {
                        animation: spin 30s infinite linear reverse;
                        width: 445px;
                        height: 445px;
                        display: block;
                        position: absolute;
                        margin: 12.5px;
                    }
                }
                .circle-wrap-3 {
                    transform: translateZ(-100px);
                    .circle-3 {
                        width: 380px;
                        height: 380px;
                        display: block;
                        position: absolute;
                        margin: 44px;
                    }
                }
                .circle-wrap-4 {
                    transform: translateZ(-80px);
                    .circle-4 {
                        animation: spin 20s infinite linear;
                        width: 359px;
                        height: 359px;
                        display: block;
                        position: absolute;
                        margin: 55px;
                    }
                }
                .circle-wrap-5 {
                    transform: translateZ(-60px);
                    .circle-5 {
                        width: 316px;
                        height: 316px;
                        display: block;
                        position: absolute;
                        margin: 77px;
                    }
                }
                .circle-wrap-6 {
                    transform: translateZ(-40px);
                    .circle-6 {
                        animation: spin 25s infinite linear reverse;
                        width: 326px;
                        height: 326px;
                        display: block;
                        position: absolute;
                        margin: 71px;
                    }
                }
                .circle-wrap-7 {
                    transform: translateZ(-20px);
                    .circle-7 {
                        width: 244px;
                        height: 244px;
                        display: block;
                        position: absolute;
                        margin: 111px;
                    }
                }
                .icon{
                    transition: all ease 1.5s;
                }
                .digup{
                    transform: translateZ(70px);
                    width: 80px;
                    height: 80px;
                    display: block;
                    position: absolute;
                    left: 80px;
                    top: 13%;
                }
                .like{
                    transform: translateZ(40px);
                    width: 120px;
                    height: 120px;
                    display: block;
                    position: absolute;
                    left: 22%;
                    top: 63%;
                }
                .search{
                    transform: translate3d(11px,0,30px);
                    width: 84px;
                    height: 84px;
                    display: block;
                    position: absolute;
                    left: 68%;
                    top: 5%;
                }
                .favorite{
                    transform: translateZ(50px);
                    width: 124px;
                    height: 124px;
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: 5%;
                }
            }
            .article{
                width: 440px;
                height: 250px;
                border: 4px solid #f95e58;
                border-left: 0;
                padding: 30px;
                font-weight: 300;
                h2{
                    font-size: 32px;
                    color: #222;
                    line-height: 35px;
                    font-weight: 400;
                }
                .text{
                    margin-top: 10px;
                    p{
                        line-height: 22px;
                        font-size: 16px;
                    }
                }
            }
        }
    }
}

.login_box {
    a {
        display: inline-block;
        font-size: 12px;
        color: appColor;
    }
    .el-dialog {
        width: 340px;
        .el-dialog__header{
            padding-bottom: 0;
        }
        .el-input input {
            height: 42px;
        }
        .el-checkbox__label {
            font-size: 12px !important;
            color: #333;
        }
        .el-form-item {
            margin-bottom: 18px;
        }
        .agree_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
        }
        .login_btn {
            width: 100%;
            font-size: 18px;
            &:hover {
                opacity: 0.8;
            }
            input {
                color: #fff;
                background: appColor;
                border: none;
                outline: none;
                cursor: pointer;
            }
        }
    }
    .otherLogin {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0;
        padding: 0;
        width: 100%;
        padding-bottom: 20px;
        li {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 40px;
            margin: 0 12px;
            cursor: pointer;
            span {
                position: absolute;
                left: 8px;
                bottom: -20px;
                font-size: 12px;
                width: 24px;
                line-height: 1;
                color: #505050;
            }
        }
    }
}
</style>
<style>
.login-page1::after {
    content: "";
    display: block;
    height: 100%;
    background: url(~@/assets/img/login_bg.png) repeat;
}

.login-page2 .page2-wrap {
    background: url(~@/assets/img/login_bg2.png) no-repeat;
}

.login-page2 .page2-picture {
    background: url(~@/assets/img/macbook.png) no-repeat;
}

.login-page2 .iphone {
    background: url(~@/assets/img/iphone.png) no-repeat;
}

.login-page2 .message {
    background: url(~@/assets/img/message.png) no-repeat;
}

.login-page3 .circle-1 {
    background: url(~@/assets/img/circle1.png) no-repeat;
}

.login-page3 .circle-2 {
    background: url(~@/assets/img/circle2.png) no-repeat;
}

.login-page3 .circle-3 {
    background: url(~@/assets/img/circle3.png) no-repeat;
}

.login-page3 .circle-4 {
    background: url(~@/assets/img/circle4.png) no-repeat;
}

.login-page3 .circle-5 {
    background: url(~@/assets/img/circle5.png) no-repeat;
}

.login-page3 .circle-6 {
    background: url(~@/assets/img/circle6.png) no-repeat;
}
.login-page3 .circle-7 {
    background: url(~@/assets/img/circle7.png) no-repeat;
}
.login-page3 .digup{
    background: url(~@/assets/img/circle-digup.png) no-repeat;
}
.login-page3 .like{
    background: url(~@/assets/img/circle-like.png) no-repeat;
}
.login-page3 .search{
    background: url(~@/assets/img/circle-search.png) no-repeat;
}
.login-page3 .favorite{
    background: url(~@/assets/img/circle-favorite.png) no-repeat;
}
#login .otherLogin .wx {
    background: url(~@/assets/icon/icon_wx_pc.svg)no-repeat center center;
}

#login .otherLogin .qq {
    background: url(~@/assets/icon/icon_qq_pc.svg)no-repeat center center;
}
</style>
