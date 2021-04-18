<template>
	<div class="app-container">
		<h2 style="text-align: center">发布新课程</h2>
		<el-steps :active="3" align-center finish-status="success" process-status="wait" style="margin-bottom: 40px">
			<el-step title="填写课程基本信息"></el-step>
			<el-step title="创建课程大纲"></el-step>
			<el-step title="最终发布"></el-step>
		</el-steps>
		<!-- 课程发布信息模板 -->
		<div class="ccInfo">
			<img :src="coursePublish.cover">
			<div class="main">
				<h2>{{ coursePublish.title }}</h2>
				<p class="gray"><span>课时总数：{{ coursePublish.lessonNum }} 课时</span></p>
				<p><span>所属分类：{{ coursePublish.subjectLevelOne }} —— {{ coursePublish.subjectLevelTwo }}</span></p>
				<p>课程讲师：{{ coursePublish.teacherName }}</p>
				<h3 class="red">￥{{ coursePublish.price }}</h3>
			</div>
		</div>
		<!-- 按钮 -->
		<div>
			<el-button @click="previous">返回修改</el-button>
			<el-button :disabled="saveBtnDisabled" @click="publish()" type="primary">发布课程</el-button>
		</div>
	</div>
</template>

<script>
	// 引入调用 API 文件
	import courseApi from '@/api/edu/course';

	export default {
		// 定义页面中显示的模型数据
		data() {
			return {
				saveBtnDisabled: false,
				active: 0,
				courseId: '',
				coursePublish: {},
			};
		},
		// 创建实例之后，在页面渲染之前执行
		created() {
			// 获取路由中的课程 id
			if (this.$route.params && this.$route.params.id) {
				this.courseId = this.$route.params.id;
				// 根据课程 id 调用接口方法查询出课程发布信息
				this.findCoursePublishInfo();
			}
		},
		// 监听，路由的变化。有变化就调用方法。
		watch: {
			route(to, from) {
				this.init();
			},
		},
		// 自定义方法
		methods: {
			previous() {
				this.$router.push({path: `/course/chapter/${this.courseId}`});
			},
			publish() {
				courseApi
						.updateCoursePublishStatusByIdApi(this.courseId)
						.then(() => {
							// 提示发布成功
							this.$message({
								type: 'success',
								message: '课程发布成功!',
							});
							// 跳转到课程列表页面
							this.$router.push({path: `/course/list`});
						});
			},

			// 根据课程 id 查询出课程发布信息。
			findCoursePublishInfo() {
				courseApi
						.findCoursePublishInfoByIdApi(this.courseId)
						.then((response) => {
							this.coursePublish = response.data.coursePublicVo;
						});
			},
		},
	};
</script>
<style scoped>
	.ccInfo {
		background: #f5f5f5;
		padding: 20px;
		overflow: hidden;
		border: 1px dashed #ddd;
		margin-bottom: 40px;
		position: relative;
	}

	.ccInfo img {
		background: #d6d6d6;
		width: 500px;
		height: 278px;
		display: block;
		float: left;
		border: none;
	}

	.ccInfo .main {
		margin-left: 520px;
	}

	.ccInfo .main h2 {
		font-size: 28px;
		margin-bottom: 30px;
		line-height: 1;
		font-weight: normal;
	}

	.ccInfo .main p {
		margin-bottom: 10px;
		word-wrap: break-word;
		line-height: 24px;
		max-height: 48px;
		overflow: hidden;
	}

	.ccInfo .main p {
		margin-bottom: 10px;
		word-wrap: break-word;
		line-height: 24px;
		max-height: 48px;
		overflow: hidden;
	}

	.ccInfo .main h3 {
		left: 540px;
		bottom: 20px;
		line-height: 1;
		font-size: 28px;
		color: #d32f24;
		font-weight: normal;
		position: absolute;
	}
</style>
