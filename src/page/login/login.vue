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
                        <div class="ani page2-content" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.8s" swiper-animate-delay="0.2s">
                            <a href="">观看视频，进一步了解头条号</a>
                            <h2>高速成长的新兴创作平台</h2>
                            <p>当其他公众平台已是红海，</p>
                            <p>我们才刚进入红利期，</p>
                            <p>而且，我们还在高速成长。</p>
                        </div>
                        <div class="page2-picture">
                         <div class="iphone">
                                <div class="count">
                                    +723,245
                                </div>
                            </div>
                            <div class="animate-cuve">
                                 <svg height="362" version="1.1" width="625" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative; left: -0.5px;">
                                    <desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.2</desc>
                                    <defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs>
                                    <path fill="none" stroke="#ffffff" d="M145,285C235,270,325,210,345,180" stroke-width="0px" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>
                                    <circle cx="0" cy="0" r="10" fill="#38c6ff" stroke="#ddf1ff" stroke-width="5px" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" transform="matrix(1,0,0,1,0, 0)">
                                        <animateMotion path="M145,285C235,270,325,210,345,180" dur="1.5s" repeatCount="indefinite" />
                                    </circle>
                                    <image x="-90" y="-90" width="177" height="62" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="~@/assets/img/message.png" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" transform="matrix(1,0,0,1,0, 0)">
                                        <animateMotion path="M145,285C235,270,325,210,345,180" dur="1.5s" repeatCount="indefinite" />
                                    </image>
                                    <text x="10" y="-60" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="18px" stroke="none" fill="#539fe0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 18px;" transform="matrix(1,0,0,1,0, 0)">
                                        <animateMotion path="M145,285C235,270,325,210,345,180" dur="1.5s" repeatCount="indefinite" />
                                        <tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="6">623,545</tspan>
                                    </text>
                                </svg>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
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
            <div slot="footer" class="footer">
                <ul class="otherLogin">
                    <li class="wx"><span>微信</span></li>
                    <li class="qq"><span>QQ</span></li>
                </ul>
            </div>
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
                spaceBetween: 30,
                mousewheel: true,
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
                        // if (this.swiper.activeIndex === 1) {
                        //     console.log('运行曲线')
                        // }
                        swiperAnimate(this.swiper)
                    }
                }
            },
            run: false,
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
    },
    mounted() {
        // console.log(this.swiper)
    }
}
</script>
<style lang='stylus'>
bgColor=#00939c
bgColor2=#00838d
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
                background: #000;
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
                border: 4px solid #000;
                background: transparent;
                width: 16px;
                height: 16px;
            }
        }
    }
    .page {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow: hidden;
    }
    .login-page1 {
        background: linear-gradient(bgColor, bgColor2);
        color: #333;
        a:hover {
            color: #f85959 !important;
        }
        li:hover {
            opacity: 0.8 !important;
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
                a {
                    font-size: 16px;
                }
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
                    right: 0
                    z-index: 3;
                    svg{
                        position: relative;
                        path {
                             transition: all 2s ease-in;
                        }
                        cricle{
                            transition: all 2s ease-in;
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
            color: bgColor;
        }
        .el-dialog {
            width: 340px;
            .el-input input {
                height: 42px;
            }
            .el-checkbox__label {
                font-size: 12px !important;
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
                    background: bgColor;
                    border: none;
                    outline: none;
                    cursor: pointer;
                }
            }
        }
        .footer {
            .otherLogin {
                padding-bottom: 20px;
                font-size: 0;
                text-align: center;
                li {
                    position: relative;
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    margin-right: 24px;
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
    }
}
</style>
<style>
.login-page1:after {
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

#login .otherLogin .wx {
    background: url(~@/assets/icon/icon_wx_pc.svg)no-repeat center center;
}

#login .otherLogin .qq {
    background: url(~@/assets/icon/icon_qq_pc.svg)no-repeat center center;
}
</style>
