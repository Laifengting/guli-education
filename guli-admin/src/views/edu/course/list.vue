<template>
    <div class="app-container">
        课程列表
        <!--顶部查询表单-->
        <el-form :inline="true" class="demo-form-inline" style="text-align: center">
            <el-form-item>
                <el-input v-model="courseQuery.title" placeholder="课程名称" />
            </el-form-item>

            <el-form-item>
                <el-select v-model="courseQuery.status" clearable placeholder="发布状态">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加时间">
                <el-date-picker v-model="courseQuery.begin" type="datetime" placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="courseQuery.end" type="datetime" placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>
        <!-- 表格显示 -->
        <el-table :data="list" :v-loading="listLoading" fit highlight-current-row align="center">
            <!-- 列 -->
            <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column label="课程封面" width="120" align="center">
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
                        <img slot="reference" :src="sope.row.cover" style="width: 80px; height: 80px" />
                        <!-- 鼠标经过 -->
                        <img :src="sope.row.cover" style="width: 200px; height: 200px" />
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column prop="title" label="课程名称" width="140" align="left"> </el-table-column>
            <el-table-column prop="teacherName" label="讲师" width="140" align="left"> </el-table-column>
            <el-table-column prop="status" label="发布状态" width="140"></el-table-column>
            <el-table-column label="操作" width="320" align="center">
                <template slot-scope="scope">
                    <!-- 路由跳转 -->
                    <router-link :to="'/course/info/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改课程</el-button>
                    </router-link>
                    <router-link :to="'/course/chapter/' + scope.row.id">
                        <el-button type="success" size="mini" icon="el-icon-edit">修改大纲</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total" background
            style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper"
            @current-change="getList" />
    </div>
</template>

<script>
// 引入调用 API teacher.js 文件
import courseApi from '@/api/edu/course';
import teacherApi from '@/api/edu/teacher';

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
                { value: 'Draft', label: '未发布' },
                { value: 'Normal', label: '已发布' },
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