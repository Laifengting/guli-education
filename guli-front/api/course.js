import request from '@/utils/request'

const api_name = '/eduservice/frontCourse'

export default {
    // 根据课程 id 查询出课程讲师章节小节视频的详情
    getCourseTeacherChapterVideoInfoById(courseId) {
        return request({
            url: `${api_name}/getCourseInfoById/${courseId}`,
            method: 'get'
        })
    },

    // 前台课程列表页面的条件分页查询
    getCoursePageApi(curPage, limit, courseDetailsDto) {
        return request({
            url: `${api_name}/getCoursePage/${curPage}/${limit}`,
            method: 'post',
            data: courseDetailsDto
        })
    },
}