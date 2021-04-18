import request from '@/utils/request'

// 定义API默认访问路径前缀
const api_name = '/eduservice/subject'

export default {
	// 1. 课程分类列表（树形）
	getAllSubjectApi() {
		return request({
			url: `${api_name}/getAllSubject`,
			method: 'get',
		})
	},

	// 2. 手动添加
	diyAddSubjectApi(subject) {
		return request({
			url: `${api_name}/diyAddSubject`,
			method: 'post',
			data: subject,
		})
	},
}
