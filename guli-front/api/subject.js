import request from '@/utils/request'

const api_name = '/eduservice/subject'

export default {
    // 课程分类查询
    getAllSubjectApi() {
        return request({
            url: `${api_name}/getAllSubject`,
            method: 'get'
        })
    },
}