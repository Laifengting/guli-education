import request from '@/utils/request'
export default {
    getIndexData() {
        return request({
            url: `/eduservice/indexfront/getIndex`,
            method: 'get'
        })
    }
}