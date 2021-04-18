import request from '@/utils/request'

const user_api_name = '/ucenter/member'
const msm_api_name = '/edumsm/aliyun'

export default {
	//根据手机号码发送短信
	sendMsmApi(phoneNum) {
		return request({
			url: `${msm_api_name}/sendMsm/${phoneNum}`,
			method: 'get',
		})
	},

	// 用户注册
	registerApi(registerDto) {
		return request({
			url: `${user_api_name}/register`,
			method: 'post',
			data: registerDto,
		})
	},


	//用户登录
	loginApi(loginDto) {
		return request({
			url: `${user_api_name}/login`,
			method: 'post',
			data: loginDto
		})
	},

	// 根据 token 获取用户信息
	getLoginInfoApi() {
		return request({
			url: `${user_api_name}/getUserInfo`,
			method: 'get',
			// headers: {'token': cookie.get('guli_token')}
		})
		//headers: {'token': cookie.get('guli_token')}
	},
}
