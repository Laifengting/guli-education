<template>
    <div class="in-wrap">
        <!-- 公共头引入 -->
        <header id="header">
            <section class="container">
                <h1 id="logo">
                    <a href="#" title="谷粒学院">
                        <img alt="谷粒学院" src="~/assets/img/logo.png" width="100%">
                    </a>
                </h1>
                <div class="h-r-nsl">
                    <ul class="nav">
                        <router-link active-class="current" exact tag="li" to="/">
                            <a>首页</a>
                        </router-link>
                        <router-link active-class="current" tag="li" to="/course">
                            <a>课程</a>
                        </router-link>
                        <router-link active-class="current" tag="li" to="/teacher">
                            <a>名师</a>
                        </router-link>
                        <router-link active-class="current" tag="li" to="/article">
                            <a>文章</a>
                        </router-link>
                        <router-link active-class="current" tag="li" to="/qa">
                            <a>问答</a>
                        </router-link>
                    </ul>
                    <!-- / nav -->

                    <ul class="h-r-login">
                        <!-- v-if="!loginInfo.id" 没有 id 值，表示没有登录，就显示登录 注册按钮 -->
                        <li id="no-login" v-if="!loginInfo.id">
                            <a href="/login" title="登录">
                                <em class="icon18 login-icon">&nbsp;</em>
                                <span class="vam ml5">登录</span>
                            </a>
                            |
                            <a href="/register" title="注册">
                                <span class="vam ml5">注册</span>
                            </a>
                        </li>
                        <!-- v-if="loginInfo.id" 有 id 值，表示已经登录了，就显示消息，头像，用户名，退出 -->
                        <li class="mr10" id="is-login-one" v-if="loginInfo.id">
                            <a href="#" id="headerMsgCountId" title="消息">
                                <em class="icon18 news-icon">&nbsp;</em>
                            </a>
                            <q class="red-point" style="display: none">&nbsp;</q>
                        </li>
                        <li class="h-r-user" id="is-login-two" v-if="loginInfo.id">
                            <a href="/ucenter" title>
                                <img :src="loginInfo.avatar" alt class="vam picImg" height="30" width="30">
                                <span class="vam disIb" id="userName">{{ loginInfo.nickname }}</span>
                            </a>
                            <a @click="logout()" class="ml5" href="javascript:void(0);" title="退出">退出</a>
                        </li>
                        <!-- /未登录显示第1 li；登录后显示第2，3 li -->
                    </ul>
                    <aside class="h-r-search">
                        <form action="#" method="post">
                            <label class="h-r-s-box">
                                <input name="queryCourse.courseName" placeholder="输入你想学的课程" type="text" value>
                                <button class="s-btn" type="submit">
                                    <em class="icon18">&nbsp;</em>
                                </button>
                            </label>
                        </form>
                    </aside>
                </div>
                <aside class="mw-nav-btn">
                    <div class="mw-nav-icon"></div>
                </aside>
                <div class="clear"></div>
            </section>
        </header>
        <!-- /公共头引入 -->

        <nuxt />

        <!-- 公共底引入 -->
        <footer id="footer">
            <section class="container">
                <div class>
                    <h4 class="hLh30">
                        <span class="fsize18 f-fM c-999">友情链接</span>
                    </h4>
                    <ul class="of flink-list">
                        <li>
                            <a href="http://www.atguigu.com/" target="_blank" title="尚硅谷">尚硅谷</a>
                        </li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="b-foot">
                    <section class="fl col-7">
                        <section class="mr20">
                            <section class="b-f-link">
                                <a href="#" target="_blank" title="关于我们">关于我们</a>|
                                <a href="#" target="_blank" title="联系我们">联系我们</a>|
                                <a href="#" target="_blank" title="帮助中心">帮助中心</a>|
                                <a href="#" target="_blank" title="资源下载">资源下载</a>|
                                <span>服务热线：010-56253825(北京) 0755-85293825(深圳)</span>
                                <span>Email：info@atguigu.com</span>
                            </section>
                            <section class="b-f-link mt10">
                                <span>©2018课程版权均归谷粒学院所有 京ICP备17055252号</span>
                            </section>
                        </section>
                    </section>
                    <aside class="fl col-3 tac mt15">
                        <section class="gf-tx">
                            <span>
                                <img alt src="~/assets/img/wx-icon.png">
                            </span>
                        </section>
                        <section class="gf-tx">
                            <span>
                                <img alt src="~/assets/img/wb-icon.png">
                            </span>
                        </section>
                    </aside>
                    <div class="clear"></div>
                </div>
            </section>
        </footer>
        <!-- /公共底引入 -->
    </div>
</template>
<script>
import '~/assets/css/reset.css';
import '~/assets/css/theme.css';
import '~/assets/css/global.css';
import '~/assets/css/web.css';
import '~/assets/css/base.css';
import '~/assets/css/activity_tab.css';
import '~/assets/css/bottom_rec.css';
import '~/assets/css/order.css';
import '~/assets/css/swiper-3.3.1.min.css';
import '~/assets/css/pages-weixinpay.css';

// 引入 cookie
import cookie from 'js-cookie';
// 引入 登录注册api
import loginRegisterApi from '@/api/loginRegister';

export default {
    data() {
        return {
            token: '',
            loginInfo: {
                id: '',
                age: '',
                avatar: '',
                mobile: '',
                nickname: '',
                sex: '',
            },
        };
    },
    created() {
        // 实现首页页面取到路径中的 token
        this.token = this.$route.query.token;
        // 判断路径中是否有 token 值
        if (this.token) {
            // 如果 有 token 调用微信登录
            this.wxLogin();
        }
        this.showUserInfo();
    },
    methods: {
        // 创建方法，从 cookie 中获取 用户信息
        showUserInfo() {
            // 从 cookie 中获取 用户信息
            var userInfoStr = cookie.get('guli_userInfo');
            if (userInfoStr) {
                // 把字符串转换为 json 对象
                this.loginInfo = JSON.parse(userInfoStr);
            }
        },
        // 退出方法
        logout() {
            // 清空cookie 值
            cookie.set('guli_token', '', {
                domain: 'localhost',
            });
            cookie.set('guli_userInfo', '', {
                domain: 'localhost',
            });
            // 回到首页
            window.location.href = '/';
            // this.loginInfo = {};
            // this.token = '';
        },

        // 微信登录方法
        wxLogin() {
            cookie.set('guli_token', this.token, { domain: 'localhost' });

            loginRegisterApi.getLoginInfoApi().then((res) => {
                if (res.data && res.data.userInfo) {
                    this.loginInfo = res.data.userInfo;
                    cookie.set('guli_ucenter', this.loginInfo, {
                        domain: 'localhost',
                    });
                }
            });
        },
    },
};
</script>
