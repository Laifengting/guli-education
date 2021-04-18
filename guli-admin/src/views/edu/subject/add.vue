<template>
	<div class="app-container">
		<el-form label-width="120px">
			<el-form-item label="一级分类">
				<el-input v-model="subject.one"/>
			</el-form-item>
			<el-form-item label="二级分类">
				<el-input v-model="subject.two"/>
			</el-form-item>

			<el-form-item>
				<el-button
						:disabled="saveBtnDisabled"
						@click="add()"
						type="primary"
				>添加
				</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	// 引入调用 API teacher.js 文件
	import subjectApi from '@/api/edu/subject';

	export default {
		data() {
			return {
				subject: {
					one: '',
					two: '',
				},
				saveBtnDisabled: false, // 保存按钮是否禁用,
			};
		},
		created() {
		},
		// 监听，路由的变化。有变化就调用方法。
		watch: {
			$route(to, from) {
				this.init();
			},
		},
		// 自定义方法
		methods: {
			add(subject) {
				this.saveBtnDisabled = true;
				subjectApi.diyAddSubjectApi(this.subject).then((response) => {
					// 弹出信息添加成功
					if (response.success === true) {
						// 提示信息
						this.$message({
							type: 'success',
							message: '添加课程分类成功',
						});
					}
					// 回到列表页刷新添加后的数据 —— 路由跳转(重定向)
					this.$router.push({path: '/subject/list'});
				});
			},
		},
	};
</script>
