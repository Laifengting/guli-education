<template>
	<div class="app-container">
		<el-form label-width="120px">
			<el-form-item label="表格描述">
				<el-alert
						:closable="false"
						description="仅支持 Excel 97-2003 版 .xls格式结尾的表格"
						effect="light"
						show-icon
						title="Excel 表格上传须知"
						type="info"
				/>
			</el-form-item>

			<el-form-item label="模板下载">
				<el-tag>
					<i class="el-icon-download"/>
					<a :href="OSS_PATH + '/excel/01.xls'">点击下载模版</a>
				</el-tag>
			</el-form-item>

			<el-form-item label="选择Excel">
				<el-upload
						:action="BASE_API + '/eduservice/subject/addSubject'"
						:auto-upload="false"
						:disabled="importBtnDisabled"
						:limit="1"
						:on-error="fileUploadError"
						:on-success="fileUploadSuccess"
						accept="application/vnd.ms-excel"
						name="file"
						ref="upload"
				>
					<el-button size="small" slot="trigger" type="primary"
					>选取文件
					</el-button
					>
					<el-button
							:loading="loading"
							@click="submitUpload"
							size="small"
							style="margin-left: 10px"
							type="success"
					>{{ fileUploadBtnText }}
					</el-button
					>
				</el-upload>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	// 引入调用 API 文件

	export default {
		// 声明组件
		// components: { xxx1, xxx2 },
		// 定义页面中显示的模型数据
		data() {
			return {
				BASE_API: process.env.BASE_API, // 接口API地址
				OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
				fileUploadBtnText: '上传文件', // 按钮文字
				importBtnDisabled: false, // 按钮是否禁用,
				loading: false,
			};
		},
		// 创建实例之后，在页面渲染之前执行
		created() {
		},
		// 监听，路由的变化。有变化就调用方法。
		watch: {
			route(to, from) {
				this.init();
			},
		},
		// 自定义方法
		methods: {
			// 点击按钮上传文件到接口里面
			submitUpload() {
				this.fileUploadBtnText = '正在上传';
				this.importBtnDisabled = true;
				this.loading = true;
				// js ：document.getElementById("upload").submit()
				this.$refs.upload.submit();
			},
			// 上传成功
			fileUploadSuccess(response) {
				if (response.success === true) {
					// 提示信息
					this.fileUploadBtnText = '导入成功';
					this.loading = false;
					this.$message({
						type: 'success',
						message: '添加课程分类成功',
					});
				}
				// 回到列表页刷新添加后的数据 —— 路由跳转(重定向)
				this.$router.push({path: '/subject/list'});
			},
			// 上传失败
			fileUploadError(response) {
				this.fileUploadBtnText = '导入失败';
				this.loading = false;
				this.$message({
					type: 'error',
					message: '添加课程分类失败',
				});
			},
		},
	};
</script>
