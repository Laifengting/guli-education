import request from '@/utils/request'

const api_name = '/eduservice/frontTeacher'

export default {
	// 讲师列表页分页查询
	getTeacherListApi(curPage, limit) {
		return request({
			url: `${api_name}/getTeacherFrontList/${curPage}/${limit}`,
			method: 'post'
		})
	},

	// 根据讲师 id 查询出讲师详情
	getTeachInfoById(id) {
		return request({
			url: `${api_name}/getTeacherFrontInfo/${id}`,
			method: 'get'
		})
	},

}
