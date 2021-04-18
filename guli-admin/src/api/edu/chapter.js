import request from '@/utils/request'

// 定义API默认访问路径前缀
const chapter_api_name = '/eduservice/chapter'

export default {
	// ======================================= 章节的增删改查 ======================================= //
	// 1. 查询当前 courseId 号课程的所有章节
	findAllChapterApi(courseId) {
		return request({
			url: `${chapter_api_name}/findAll/${courseId}`,
			method: 'get',
		})
	},
	addChapterApi(chapterDto) {
		return request({
			url: `${chapter_api_name}/addChapter`,
			method: 'post',
			data: chapterDto,
		})
	},
	findChapterByIdApi(chapterId) {
		return request({
			url: `${chapter_api_name}/findChapterById/${chapterId}`,
			method: 'get',
		})
	},
	updateChapterApi(chapterDto) {
		return request({
			url: `${chapter_api_name}/updateChapter`,
			method: 'post',
			data: chapterDto,
		})
	},
	deleteChapterApi(chapterId) {
		return request({
			url: `${chapter_api_name}/deleteChapter/${chapterId}`,
			method: 'delete',
		})
	},
}
