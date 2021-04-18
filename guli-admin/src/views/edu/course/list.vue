<template>
	<div class="app-container">
		课程列表
		<!--顶部查询表单-->
		<el-form :inline="true" class="demo-form-inline" style="text-align: center">
			<el-form-item>
				<el-input placeholder="课程名称" v-model="courseQuery.title"/>
			</el-form-item>

			<el-form-item>
				<el-select clearable placeholder="发布状态" v-model="courseQuery.status">
					<el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="添加时间">
				<el-date-picker default-time="00:00:00" placeholder="选择开始时间" type="datetime"
								v-model="courseQuery.begin" value-format="yyyy-MM-dd HH:mm:ss"/>
			</el-form-item>
			<el-form-item>
				<el-date-picker default-time="00:00:00" placeholder="选择截止时间" type="datetime"
								v-model="courseQuery.end" value-format="yyyy-MM-dd HH:mm:ss"/>
			</el-form-item>
			<el-button @click="getList()" icon="el-icon-search" type="primary">查询</el-button>
			<el-button @click="resetData()" type="default">清空</el-button>
		</el-form>
		<!-- 表格显示 -->
		<el-table :data="list" :v-loading="listLoading" align="center" fit highlight-current-row>
			<!-- 列 -->
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					{{ (page - 1) * limit + scope.$index + 1 }}
				</template>
			</el-table-column>

			<el-table-column align="center" label="课程封面" width="120">
				<!--插入图片链接的代码-->
				<template slot-scope="sope">
					<!-- 鼠标经过 -->
					<!-- placement:
					top/top-start/top-end/
					bottom/bottom-start/bottom-end/
					left/left-start/left-end/
					right/right-start/right-end -->
					<el-popover placement="right" title="" trigger="hover">
						<!-- 页面显示 -->
						<img :src="sope.row.cover" slot="reference" style="width: 80px; height: 80px"/>
						<!-- 鼠标经过 -->
						<img :src="sope.row.cover" style="width: 200px; height: 200px"/>
					</el-popover>
				</template>
			</el-table-column>

			<el-table-column align="left" label="课程名称" prop="title" width="140"></el-table-column>
			<el-table-column align="left" label="讲师" prop="teacherName" width="140"></el-table-column>
			<el-table-column label="发布状态" prop="status" width="140"></el-table-column>
			<el-table-column align="center" label="操作" width="320">
				<template slot-scope="scope">
					<!-- 路由跳转 -->
					<router-link :to="'/course/info/' + scope.row.id">
						<el-button icon="el-icon-edit" size="mini" type="primary">修改课程</el-button>
					</router-link>
					<router-link :to="'/course/chapter/' + scope.row.id">
						<el-button icon="el-icon-edit" size="mini" type="success">修改大纲</el-button>
					</router-link>
					<el-button @click="removeDataById(scope.row.id)" icon="el-icon-delete" size="mini" type="danger">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination :current-page="page" :page-size="limit" :total="total" @current-change="getList"
					   background layout="total, prev, pager, next, jumper"
					   style="padding: 30px 0; text-align: center"/>
	</div>
</template>

<script>
	// 引入调用 API teacher.js 文件
	import courseApi from '@/api/edu/course';

	export default {
		// 写核心代码
		// data:{},

		// 定义变量和初始值
		data() {
			return {
				// 加载页面
				listLoading: true,
				// 查询之后接口返回的集合
				list: [],
				// 当前页
				page: 1,
				// 每页记录数
				limit: 4,
				// 总记录数
				total: 0,
				// 条件封装对象
				courseQuery: {},
				// 选择框
				options: [
					{value: 'Draft', label: '未发布'},
					{value: 'Normal', label: '已发布'},
				],
			};
		},

		// 页面渲染之前执行，一般调用 methods 里面定义的方法
		created() {
			// 调用方法
			this.getList();
		},

		// 创建具体的方法，调用 teacher.js 定义的方法
		methods: {
			getList(page = 1) {
				this.page = page;
				courseApi
						.findCourseListApi(this.page, this.limit, this.courseQuery)
						// 请求成功
						.then((response) => {
							// response 接口返回的数据
							// console.log(response);
							this.list = response.data.rows;
							this.total = response.data.total;
							// console.log(this.total);
							// console.log(this.list);
						});
			},
			// 清空查询条件
			resetData() {
				this.courseQuery = {};
				this.getList();
			},

			// 删除讲师方法
			removeDataById(id) {
				// 弹框提醒
				this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
						// 点击确定
						.then(() => {
							// 调用删除方法
							courseApi
									.deleteCourseApi(id)
									// 请求成功
									.then((response) => {
										if (response.success) {
											this.$message({
												type: 'success',
												message: '删除成功!',
											});
											this.getList();
										} else {
											this.$message({
												type: 'success',
												message: '删除失败!',
											});
										}
									});
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: '取消删除!',
							});
						});
			},
		},
	};
</script>
