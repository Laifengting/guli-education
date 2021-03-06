import axios from 'axios'
import {Message} from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
	baseURL: 'http://localhost:9001', // api的base_url
	timeout: 20000 // 请求超时时间
});

// 登录第 3 步：创建 http request 请求拦截器
service.interceptors.request.use(
		config => {
			// 判断是否有 guli_token
			if (cookie.get('guli_token')) {
				// 把获取到的 cookie 中的 token 值放到 header 中
				config.headers['token'] = cookie.get('guli_token');
			}
			return config
		},
		err => {
			return Promise.reject(err);
		});


// http response 响应拦截器
service.interceptors.response.use(
		response => {
			if (response.data.code == 28004) {
				console.log("response.data.resultCode是28004")
				// 返回 错误代码-1 清除ticket信息并跳转到登录页面
				window.location.href = "/login"
				return
			} else {
				if (response.data.code !== 20000) {
					//25000：订单支付中，不做任何提示
					if (response.data.code != 25000) {
						Message({
							message: response.data.message || 'error',
							type: 'error',
							duration: 5 * 1000
						})
					}
				} else {
					return response.data;
				}
			}
		},
		error => {
			return Promise.reject(error.response) // 返回接口返回的错误信息
		});

export default service
