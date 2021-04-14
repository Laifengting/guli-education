<template>
    <div class="app-container">
        <h2 style="text-align: center">发布新课程</h2>
        <el-steps :active="1" process-status="wait" style="margin-bottom: 40px" align-center finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="最终发布"></el-step>
        </el-steps>

        <el-form label-width="auto">
            <!-- 标题 -->
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
            </el-form-item>
            <!-- 分类 -->
            <el-form-item label="课程分类">
                <el-select v-model="courseInfo.subjectParentId" placeholder="请选择一级分类" @change="subjectOneChanged">
                    <el-option v-for="subjectOne in subjectOneList" :key="subjectOne.id" :label="subjectOne.title"
                        :value="subjectOne.id"></el-option>
                </el-select>
                <el-select v-model="courseInfo.subjectId" placeholder="请选择二级分类">
                    <el-option v-for="subjectTwo in subjectTwoList" :key="subjectTwo.id" :label="subjectTwo.title"
                        :value="subjectTwo.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 讲师 -->
            <el-form-item label="课程讲师">
                <el-select v-model="courseInfo.teacherId" placeholder="请选择">
                    <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name"
                        :value="teacher.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 课时 -->
            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"
                    placeholder="请填写课程的总课时数" />
            </el-form-item>
            <!-- 课程简介 -->
            <el-form-item label="课程简介">
                <tinymce :height="300" v-model="courseInfo.description" />
            </el-form-item>
            <!-- 课程封面-->
            <el-form-item label="课程封面">
                <el-upload :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess"
                    :action="BASE_API + '/eduoss/fileoss/upload'" class="avatar-uploader">
                    <img :src="courseInfo.cover" width="180px" height="100px" />
                </el-upload>
            </el-form-item>
            <!-- 课程价格 -->
            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right"
                    placeholder="免费课程请设置为0元" />
                元
            </el-form-item>
            <!-- 下一步按钮 -->
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()" style="margin-top: 12px">
                    保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入调用 API 文件
import courseApi from '@/api/edu/course';
// 讲师接口
import teacherApi from '@/api/edu/teacher';
// 课程接口
import subjectApi from '@/api/edu/subject';
// 富文本编辑器
import tinymce from '@/components/Tinymce';

export default {
    // 声明富文本编辑器
    components: { tinymce },
    // 定义页面中显示的模型数据
    data() {
        return {
            saveBtnDisabled: false,
            active: 0,
            courseInfo: {
                title: '',
                subjectParentId: '', // 一级分类
                subjectId: '', // 二级分类
                teacherId: '',
                lessonNum: 0,
                description: '',
                // 课程封面（带默认封面）
                cover: process.env.OSS_PATH + '/cover/01.png',
                price: 0,
            },
            // 封装所有的讲师
            teacherList: [],
            subjectOneList: [],
            subjectTwoList: [],
            BASE_API: process.env.BASE_API, // 接口API地址
            // 路径中的courseId
            courseId: '',
        };
    },
    // 创建实例之后，在页面渲染之前执行
    created() {
        // // 不管是添加还是修改，都调用一下。回显的时候都需要用到。
        // 查找全部讲师
        this.findAllTeacher();
        // 查找全部一级课程分类
        this.findAllOneSubject();
        // 要调用，不调用，修改的时候不回显。
        this.init();
    },
    // 监听，路由的变化。有变化就调用方法。
    watch: {
        $route() {
            this.init();
        },
    },
    // 自定义方法
    methods: {
        // 添加或者修改
        saveOrUpdate() {
            if (this.$route.params && this.$route.params.id) {
                this.updateCourseInfo();
            } else {
                this.addCourseInfo();
            }
        },
        // 添加课程信息
        addCourseInfo() {
            courseApi.saveCourseInfoApi(this.courseInfo).then((response) => {
                // 1. 添加成功的提示信息
                this.$message({
                    type: 'success',
                    message: '添加课程基本信息成功',
                });
                // 2. 跳转到下一步
                // if (this.active++ > 2) this.active = 0;
                this.$router.push({
                    path: '/course/chapter/' + response.data.courseId,
                });
            });
        },
        // 查找全部讲师
        findAllTeacher() {
            teacherApi.getAllTeacherListApi().then((response) => {
                this.teacherList = response.data.items;
            });
        },
        // 查找全部一级课程分类
        findAllOneSubject() {
            subjectApi.getAllSubjectApi().then((response) => {
                this.subjectOneList = response.data.list;
            });
        },
        // 点击一级分类之后，触发 change
        // 找到当前选中一级分类课程中的二级分类
        subjectOneChanged(subjectOneId) {
            // alert(subjectOneId);
            for (let i = 0; i < this.subjectOneList.length; i++) {
                let subjectOne = this.subjectOneList[i];
                if (subjectOne.id === subjectOneId) {
                    this.subjectTwoList = subjectOne.children;
                    // 把二级分类 id 值清空。
                    this.courseInfo.subjectId = '';
                }
            }
        },
        // 上传之前调用的方法，校验文件的类型格式大小。
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 上传成功调用的方法
        handleAvatarSuccess(res, file) {
            this.$message({
                type: 'success',
                message: '上传成功!',
            });
            // console.log(res); // 上传响应
            // console.log(URL.createObjectURL(file.raw)); // base64编码
            this.courseInfo.cover = res.data.url;
        },
        // 按 id 查询出所有课程的信息用来回显
        findCourseInfoById() {
            courseApi.findCourseInfoByIdApi(this.courseId).then((response) => {
                // 在 courseInfo 课程基本信息中，包含有一级分类 id 和 二级分类 id
                this.courseInfo = response.data.courseInfo;
                for (let i = 0; i < this.subjectOneList.length; i++) {
                    var oneSubject = this.subjectOneList[i];
                    if (this.courseInfo.subjectParentId === oneSubject.id) {
                        this.subjectTwoList = oneSubject.children;
                    }
                }
            });
        },
        // 修改课程信息
        updateCourseInfo() {
            courseApi.updateCourseInfoApi(this.courseInfo).then((response) => {
                this.$message({
                    type: 'success',
                    message: '修改成功!',
                });
                // 2. 跳转到下一步
                // if (this.active++ > 2) this.active = 0;
                this.$router.push({
                    path: '/course/chapter/' + this.courseId,
                });
            });
        },
        // 路由变化调用。
        init() {
            // 判断路由中的参数不为空，并且参数 id 不为空，修改就需要回显
            if (this.$route.params && this.$route.params.id) {
                this.courseId = this.$route.params.id;
                this.findCourseInfoById();
            } else {
                this.saveBtnDisabled = false;
                this.active = 0;
                // 没有 id 值 就是添加操作，清空原表单的回显。
                this.courseInfo = {
                    title: '',
                    subjectParentId: '', // 一级分类
                    subjectId: '', // 二级分类
                    teacherId: '',
                    lessonNum: 0,
                    description: '',
                    // 课程封面（带默认封面）
                    cover: process.env.OSS_PATH + '/cover/01.png',
                    price: 0,
                };
                this.teacherList = [];
                this.subjectOneList = [];
                this.subjectTwoList = [];
                this.BASE_API = process.env.BASE_API; // 接口API地址
                // 路径中的courseId
                this.courseId = '';
            }
        },
    },
};
</script>

<style scoped>
.tinymce-container {
    line-height: 29px;
}
</style>