import request from '@/utils/request'

// 定义API默认访问路径前缀
const vod_api_name = '/eduvod/video'

export default {
    // ======================================= 视频的增删改查 ======================================= //
    deleteAliVideoByIdApi(videoId) {
        return request({
            url: `${vod_api_name}/deleteVideo/${videoId}`,
            method: 'delete',
        })
    },
}