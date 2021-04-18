import request from '@/utils/request'

const api_name = '/educms/banneruser'

export default {
	getList() {
		return request({
			url: `${api_name}/findAllBanner`,
			method: 'get'
		})
	}
}
