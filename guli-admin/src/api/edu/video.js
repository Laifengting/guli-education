import request from '@/utils/request'

// 定义API默认访问路径前缀
const video_api_name = '/eduservice/video'

export default {
	// ======================================= 小节的增删改查 ======================================= //
	addVideoApi(videoDto) {
		return request({
			url: `${video_api_name}/addVideo`,
			method: 'post',
			data: videoDto,
		})
	},
	findVideoByIdApi(videoId) {
		return request({
			url: `${video_api_name}/findVideoById/${videoId}`,
			method: 'get',
		})
	},
	updateVideoApi(videoDto) {
		return request({
			url: `${video_api_name}/updateVideo`,
			method: 'post',
			data: videoDto,
		})
	},
	deleteVideoByIdApi(videoId) {
		return request({
			url: `${video_api_name}/deleteVideoById/${videoId}`,
			method: 'delete',
		})
	},
}
