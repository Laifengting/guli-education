import request from '@/utils/request'
const api_name = '/staservice/statistics'

export default {
    // 生成统计数据
    registerCountApi(day) {
        return request({
            url: `${api_name}/registerCount/${day}`,
            method: 'post'
        })
    }
}