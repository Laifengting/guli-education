<template>
    <div class="main">
        <div class="title">
            <a class="active" href="/login">登录</a>
            <span>·</span>
            <a href="/register">注册</a>
        </div>
        <div class="sign-up-container">
            <el-form :model="user" ref="userForm">
                <el-form-item
                    :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]"
                    class="input-prepend restyle" prop="mobile">
                    <div>
                        <el-input placeholder="手机号" type="text" v-model="user.mobile" />
                        <i class="iconfont icon-phone" />
                    </div>
                </el-form-item>
                <el-form-item
                    :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },{validator: checkPassword, trigger: 'blur'}]"
                    class="input-prepend" prop="password">
                    <div>
                        <el-input placeholder="密码" type="password" v-model="user.password" />
                        <i class="iconfont icon-password" />
                    </div>
                </el-form-item>
                <div class="btn">
                    <input @click="submitLogin()" class="sign-in-button" type="button" value="登录">
                </div>
            </el-form>
            <!-- 更多登录方式 -->
            <div class="more-sign">
                <h6>社交帐号登录</h6>
                <ul>
                    <li><a class="weixin" href="http://localhost:8150/api/ucenter/wx/login" id="weixin"
                            target="_self"><i class="iconfont icon-weixin" /></a></li>
                    <li><a class="qq" href="#" id="qq" target="_blank"><i class="iconfont icon-qq" /></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import '~/assets/css/sign.css';
import '~/assets/css/iconfont.css';
// 引入 cookie
import cookie from 'js-cookie';
// 引入 登录注册api
import loginRegisterApi from '@/api/loginRegister';

export default {
    layout: 'sign',
    data() {
        return {
            user: {
                mobile: '',
                password: '',
            },
            loginInfo: {},
        };
    },
    methods: {
        // 登录按钮
        submitLogin() {
            // 登录第 1 步：调用接口进行登录
            loginRegisterApi.loginApi(this.user).then((response) => {
                // 登录第 2 步：获取 token，把token存在cookie中、也可以放在localStorage中
                // 第一个参数：名称，第二个参数：token 值
                cookie.set('guli_token', response.data.token, {
                    // 第三个参数：作用范围（域：127.0.0.1）
                    domain: 'localhost',
                });

                // 登录第 3 步：见 utils/request.js

                // 登录第 4 步：登录成功根据token获取用户信息，为了首页显示
                loginRegisterApi.getLoginInfoApi().then((response) => {
                    // 获取到用户信息，放在 loginInfo 中
                    this.loginInfo = response.data.userInfo;
                    // 并将用户信息记录cookie
                    cookie.set('guli_userInfo', this.loginInfo, {
                        domain: 'localhost',
                    });
                    // 跳转页面
                    window.location.href = '/';
                });
            });
        },
        // 校验手机号码
        checkPhone(rule, value, callback) {
            //debugger
            if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
                return callback(new Error('手机号码格式不正确'));
            }
            return callback();
        },
        // 校验密码
        checkPassword(rule, value, callback) {
            if (
                !/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(
                    value
                )
            ) {
                return callback(
                    new Error(
                        '最少6位，至少1个大写字母、小写字母、数字、特殊字符'
                    )
                );
            }
            return callback();
        },
    },
};
</script>
<style>
.el-form-item__error {
    z-index: 9999999;
}
</style>
