import request from '@/utils/request'


export default {
    // 查询前两条banner
    getListBannerApi() {
        return request({
            url: `/cmsservice/banner/user/findAllBanner`,
            method: 'get'
        })
    },
}