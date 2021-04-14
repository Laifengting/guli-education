<template>
    <div class="app-container">
        讲师列表
        <!--顶部查询表单-->
        <el-form :inline="true" class="demo-form-inline" style="text-align: center">
            <el-form-item>
                <el-input v-model="teacherQuery.name" placeholder="讲师名" />
            </el-form-item>
            <el-form-item>
                <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
                    <el-option :value="1" label="高级讲师" />
                    <el-option :value="2" label="首席讲师" />
                </el-select>
            </el-form-item>
            <el-form-item label="添加时间">
                <el-date-picker v-model="teacherQuery.begin" type="datetime" placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="teacherQuery.end" type="datetime" placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>
        <!-- 表格显示 -->
        <el-table :data="list" :v-loading="listLoading" border fit highlight-current-row>
            <!-- 列 -->
            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column label="头像" width="100" align="center">
                <!--插入图片链接的代码-->
                <template slot-scope="scope">
                    <!-- 鼠标经过 -->
                    <!-- placement: 
                    top/top-start/top-end/
                    bottom/bottom-start/bottom-end/
                    left/left-start/left-end/
                    right/right-start/right-end -->
                    <el-popover placement="right" title="" trigger="hover">
                        <!-- 页面显示 -->
                        <img slot="reference" :src="scope.row.avatar" style="width: 80px; height: 80px" />
                        <!-- 鼠标经过 -->
                        <img :src="scope.row.avatar" style="width: 200px; height: 200px" />
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="名称" width="80">
            </el-table-column>

            <el-table-column label="头衔" width="80">
                <template slot-scope="scope">
                    {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
                </template>
            </el-table-column>
            <el-table-column prop="intro" label="资历" />
            <el-table-column prop="gmtCreate" label="添加时间" width="160" />
            <el-table-column prop="sort" label="排序" width="60" />
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <!-- 路由跳转 -->
                    <router-link :to="'/teacher/edit/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
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
import teacher from '@/api/edu/teacher';

export default {
    // 写核心代码
    // data:{},

    // 定义变量和初始值
    data() {
        return {
            // 加载页面
            listLoading: true,
            // 查询之后接口返回的集合
            list: null,
            // 当前页
            page: 1,
            // 每页记录数
            limit: 4,
            // 总记录数
            total: 0,
            // 条件封装对象
            teacherQuery: {},
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
            teacher
                .getTeacherListPage(this.page, this.limit, this.teacherQuery)
                // 请求成功
                .then((response) => {
                    // response 接口返回的数据
                    // console.log(response);
                    this.list = response.data.rows;
                    this.total = response.data.total;
                    // console.log(this.total);
                    // console.log(this.list);
                });
            // 请求失败
            // .catch((error) => {
            //     console.log(error);
            // });
        },
        // 清空查询条件
        resetData() {
            this.teacherQuery = {};
            this.getList();
        },

        // 删除讲师方法
        removeDataById(id) {
            // 弹框提醒
            this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                // 点击确定
                .then(() => {
                    // 调用删除方法
                    teacher
                        .deleteTeacherId(id)
                        // 请求成功
                        .then((response) => {
                            console.log(response);
                            if (response.success) {
                                // 提示删除成功
                                // 删除成功消息提醒
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                });
                                // 回到当前页面刷新删除后的数据
                                this.getList();
                            } else {
                                // 提示删除成功
                                // 删除成功消息提醒
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