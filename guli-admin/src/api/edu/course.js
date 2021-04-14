import request from '@/utils/request'

// 定义API默认访问路径前缀
const api_name = '/eduservice/course'

export default {
    // 1. 手动添加
    saveCourseInfoApi(courseInfo) {
        return request({
            url: `${api_name}/addCourseInfo`,
            method: 'post',
            data: courseInfo,
        })
    },

    // 2. 根据课程id 查询课程信息
    findCourseInfoByIdApi(courseId) {
        return request({
            url: `${api_name}/findCourseInfoById/${courseId}`,
            method: 'get',
        })
    },

    // 3. 修改课程信息
    updateCourseInfoApi(CourseInfoDto) {
        return request({
            url: `${api_name}/updateCourseInfo`,
            method: 'post',
            data: CourseInfoDto,
        })
    },
    // 4. 获取课程的发布信息
    findCoursePublishInfoByIdApi(courseId) {
        return request({
            url: `${api_name}/findCoursePublishInfoById/${courseId}`,
            method: 'get',
        })
    },
    // 5. 修改课程发布状态
    updateCoursePublishStatusByIdApi(courseId) {
        return request({
            url: `${api_name}/updatePublishCourseStatus/${courseId}`,
            method: 'post',
        })
    },
    // 6. 查询出课程列表的分页
    findCourseListApi(currentPage, limit, courseQuery) {
        return request({
            // url: '/service.edu/edu-teacher/find' + currentPage + '/' + limit,
            url: `${api_name}/findCourseList/${currentPage}/${limit}`,
            method: 'post',
            // teacherQuery 条件对象，后端使用 RequestBody 来获取
            data: courseQuery,
        })
    },
    // 7. 删除课程
    deleteCourseApi(courseId) {
        return request({
            url: `${api_name}/deleteCourseById/${courseId}`,
            method: 'delete',
        })
    },
}