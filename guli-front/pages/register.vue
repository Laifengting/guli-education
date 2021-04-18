<template>
	<div class="main">
		<div class="title">
			<a href="/login">登录</a>
			<span>·</span>
			<a class="active" href="/register">注册</a>
		</div>
		<div class="sign-up-container">
			<el-form :model="params" ref="userForm">
				<!-- 校验规则：required:true 必须有，如果没有提示信息，trigger：触发机制，blur 失去焦点就触发  -->
				<el-form-item :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]" class="input-prepend restyle"
							  prop="nickname">
					<div>
						<el-input placeholder="你的昵称" type="text" v-model="params.nickname"/>
						<i class="iconfont icon-user"/>
					</div>
				</el-form-item>
				<!-- 手机号码自定义校验 -->
				<el-form-item :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]" class="input-prepend restyle no-radius"
							  prop="mobile">
					<div>
						<el-input placeholder="手机号" type="text" v-model="params.mobile"/>
						<i class="iconfont icon-phone"/>
					</div>
				</el-form-item>
				<el-form-item :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]" class="input-prepend restyle no-radius"
							  prop="code">
					<div style="width: 100%;display: block;float: left;position: relative">
						<el-input placeholder="验证码" type="text" v-model="params.code"/>
						<i class="iconfont icon-phone"/>
					</div>
					<div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
						<a :value="codeTest" @click="getCodeFun()" href="javascript:" style="border: none;background-color: none"
						   type="button">{{codeTest}}</a>
					</div>
				</el-form-item>
				<el-form-item :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },{validator: checkPassword, trigger: 'blur'}]" class="input-prepend"
							  prop="password">
					<div>
						<el-input placeholder="设置密码" type="password" v-model="params.password"/>
						<i class="iconfont icon-password"/>
					</div>
				</el-form-item>
				<div class="btn">
					<input @click="submitRegister()" class="sign-up-button" type="button" value="注册">
				</div>
				<p class="sign-up-msg">
					点击 “注册” 即表示您同意并愿意遵守简书
					<br>
					<a href="http://www.jianshu.com/p/c44d171298ce" target="_blank">用户协议</a>
					和
					<a href="http://www.jianshu.com/p/2ov8x3" target="_blank">隐私政策</a> 。
				</p>
			</el-form>
			<!-- 更多注册方式 -->
			<div class="more-sign">
				<h6>社交帐号直接注册</h6>
				<ul>
					<li><a class="weixin" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login" id="weixin"
						   target="_blank"><i
							class="iconfont icon-weixin"/></a></li>
					<li><a class="qq" href="#" id="qq" target="_blank"><i class="iconfont icon-qq"/></a></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import '~/assets/css/sign.css';
	import '~/assets/css/iconfont.css';
	import loginRegisterApi from '@/api/loginRegister';

	export default {
		layout: 'sign',
		data() {
			return {
				params: {
					mobile: '', // 手机号码
					code: '', // 验证码
					nickname: '', // 昵称
					password: '', // 密码
				},
				sending: true, //是否发送验证码
				second: 60, //倒计时间
				codeTest: '获取验证码',
			};
		},
		methods: {
			// 获取验证码
			getCodeFun() {
				//sending = false
				//his.sending原为true,请求成功，!this.sending == true，主要是防止有人把disabled属性去掉，多次点击；
				if (!this.sending) return;
				//debugger
				// prop 换成你想监听的prop字段
				this.$refs.userForm.validateField('mobile', (errMsg) => {
					if (errMsg == '') {
						loginRegisterApi
								.sendMsmApi(this.params.mobile)
								.then((res) => {
									this.sending = false;
									this.timeDown();
								});
					}
				});
			},

			// 倒计时
			timeDown() {
				let result = setInterval(() => {
					--this.second;
					this.codeTest = this.second + ' 秒后重新发送';
					if (this.second < 1) {
						clearInterval(result);
						this.sending = true;
						//this.disabled = false;
						this.second = 60;
						this.codeTest = '获取验证码';
					}
				}, 1000);
			},

			// 注册方法
			submitRegister() {
				this.$refs['userForm'].validate((valid) => {
					if (valid) {
						loginRegisterApi
								.registerApi(this.params)
								.then((response) => {
									//提示注册成功
									this.$message({
										type: 'success',
										message: '注册成功',
									});
									// 跳转到登录页面
									this.$router.push({path: '/login'});
								});
					}
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
