import request from '@/utils/request'



export default {
    getList() {
        return request({
            url: `/educms/banneruser/findAllBanner`,
            method: 'get'
        })
    }
}