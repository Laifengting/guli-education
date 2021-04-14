import request from '@/utils/request'

// 定义API默认访问路径前缀
const api_name = '/eduservice/edu-teacher'

export default {
    // 1. 讲师列表（条件查询分页）
    // currentPage：当前页
    // limit：每页记录数
    // teacherQuery：条件对象
    getTeacherListPage(currentPage, limit, teacherQuery) {
        return request({
            // url: '/service.edu/edu-teacher/find' + currentPage + '/' + limit,
            url: `${api_name}/find/${currentPage}/${limit}`,
            method: 'post',
            // teacherQuery 条件对象，后端使用 RequestBody 来获取
            data: teacherQuery,
        })
    },

    // 2. 逻辑删除讲师
    deleteTeacherId(id) {
        return request({
            url: '${api_name}/delete/' + id,
            method: 'delete',
        })
    },

    // 3. 添加讲师方法
    saveTeacher(teacher) {
        return request({
            url: `${api_name}/add`,
            method: 'post',
            data: teacher,
        })
    },

    // 4. 根据 id 查询讲师
    findTeacherById(id) {
        return request({
            url: `${api_name}/find/by/${id}`,
            method: 'get',
        })
    },

    // 5. 修改讲师
    updateTeacherInfo(teacher) {
        return request({
            url: `${api_name}/update`,
            method: 'post',
            data: teacher,
        })
    },

    // 6. 查询所有讲师，不需要分页
    getAllTeacherListApi() {
        return request({
            url: `${api_name}/find/all`,
            method: 'get',
        })
    },
}