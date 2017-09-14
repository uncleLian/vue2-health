<template>
    <div id="login">
        <div class="login_wrap">
            <img class="login_logo" src="~@/assets/img/login_logo.png">
            <div class="login_content">
                <span class="register_btn">注册</span>
                <span class="login_btn" @click.stop="dialogFormVisible = true">登录</span>
            </div>
        </div>
        <!-- dialog -->
        <el-dialog class='login_box' title="登录" :visible.sync="dialogFormVisible">
            <!-- form -->
            <el-form :model="form" @submit.native.prevent="verify">
                <el-form-item>
                    <el-input v-model="form.id" placeholder="邮箱/手机号" auto-complete='off' />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="密码" auto-complete='off' type="password" />
                </el-form-item>
                <div class="agree_item">
                    <el-checkbox v-model="form.agree">
                        我已阅读并同意<a href="###">用户协议和隐私条款</a>
                    </el-checkbox>
                    <a href="###" class="forget">忘记密码</a>
                </div>
                <el-input class="login_btn" type="submit" value="登录" />
            </el-form>
            <!-- otherLogin -->
            <div slot="footer" class="footer">
                <ul class="otherLogin">
                    <li class="wx">
                        <span>微信</span>
                    </li>
                    <li class="qq">
                        <span>QQ</span>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            dialogFormVisible: false,
            loading: false,
            form: {
                id: '',
                password: '',
                agree: true
            }
        }
    },
    methods: {
        ...mapMutations('login', [
            'set_login',
            'set_user'
        ]),
        ...mapActions('login', [
            'get_login_data'
        ]),
        errorMsg(text) {
            this.$message({
                showClose: true,
                message: text,
                type: 'error'
            })
        },
        login() {
            this.loading = true
            let params = {
                id: this.form.id,
                password: this.form.password
            }
            this.get_login_data(params)
                .then(res => {
                    if (res) {
                        this.set_login('wx')
                        this.set_user(res)
                    } else {
                        this.errorMsg('您输入的账号或密码不匹配')
                    }
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                    console.log(err)
                })
        },
        verify() {
            if (this.form.id && this.form.password && this.form.agree) {
                // this.login()
                if (this.form.id === 'lian' && this.form.password === '123') {
                    let res = {
                        userid: 'oqKkTv6XI_iDnYha-1VYKbtsvbYw',
                        nickname: '小郑',
                        headimgurl: 'http://wx.qlogo.cn/mmopen/2IWjic7SiaU1Zctuxl3SG5PHv38RExvPYWC7OkicOrfMZzB2Y84icaOfFVJsjBEPJqbtha2PpJJ38cCpXqff3PRn4n3ZlZzOs2Bic/0'
                    }
                    this.set_login('wx')
                    this.set_user(res)
                    this.$router.push('/index/home')
                } else {
                    this.loading = false
                    this.errorMsg('您输入的账号或密码不匹配')
                }
            } else if (!this.form.id && !this.form.password) {
                this.errorMsg('您输入的信息不完整')
            } else if (!this.form.agree) {
                this.errorMsg('需要阅读并同意用户协议和隐私条款')
            }
        }
    }
}
</script>
<style lang='stylus'>
#login {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: -webkit-linear-gradient(#ff6e7c, #ff776d);
    background: -moz-linear-gradient(#ff6e7c, #ff776d);
    background: linear-gradient(#ff6e7c, #ff776d);
    color: #333;
    a:hover {
        color: #f85959 !important;
    }
    li:hover {
        opacity: 0.8 !important;
    }
    .login_wrap {
        width: 440px;
        height: 280px;
        position: absolute;
        top: 45%;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 4px;
        .login_logo {
            width: 386px;
            height: 215px;
            position: absolute;
            top: -250px;
            right: 0;
            left: 0;
            margin: auto;
        }
        .login_content {
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
                color: #ff635c;
                background-color: #fff;
                border: 1px solid #ff635c;
            }
        }
    }
    .login_box {
        a {
            display: inline-block;
            font-size: 12px;
            color: #20a0ff;
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
                    background: #f85959;
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
#login {
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#fe5d6c', endColorStr='#fd6155', gradientType='0');
}

#login:after {
    content: "";
    display: block;
    height: 100%;
    background: url(~@/assets/img/login_bg.png) repeat;
}

.otherLogin .wx {
    background: url(~@/assets/icon/icon_wx_pc.svg)no-repeat center center;
}

.otherLogin .qq {
    background: url(~@/assets/icon/icon_qq_pc.svg)no-repeat center center;
}
</style>