import request from '@/utils/request'

const api_name = '/eduservice/frontComment'

export default {
    // 获取评论分页
    getCommentPageApi(courseId, curPage, limit) {
        return request({
            url: `${api_name}/getCommentPage/${courseId}/${curPage}/${limit}`,
            method: 'get',
        })
    },
    // 添加评论方法
    addCommentApi(comment) {
        return request({
            url: `${api_name}/addComment`,
            method: 'post',
            data: comment,
        })
    }

}