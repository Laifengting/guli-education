<template>
    <div class="app-container">
        讲师添加
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name" />
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number
                    v-model="teacher.sort"
                    controls-position="right"
                    :min="0"
                />
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select
                    v-model="teacher.level"
                    clearable
                    placeholder="请选择"
                >
                    <!--数据类型一定要和取出的json中的一致，否则没法回填。因此，这里value使用动态绑定的值，保证其数据类型是number-->
                    <el-option :value="1" label="高级讲师" />
                    <el-option :value="2" label="首席讲师" />
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career" />
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro" :rows="10" type="textarea" />
            </el-form-item>

            <!-- 讲师头像 -->
            <el-form-item label="讲师头像">
                <!-- 头衔缩略图 -->
                <!-- 默认头像没有搞定 TODO -->
                <pan-thumb :image="teacher.avatar + ''" />

                <!-- 文件上传按钮 -->
                <el-button
                    type="primary"
                    icon="el-icon-upload"
                    @click="imagecropperShow = true"
                    >更换头像
                </el-button>
                <!--
                    v-show：是否显示上传组件
                    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                    :url：后台上传的url地址
                    @close：关闭上传组件
                    @crop-upload-success：上传成功后的回调 -->
                <image-cropper
                    v-show="imagecropperShow"
                    :width="300"
                    :height="300"
                    :key="imagecropperKey"
                    :url="BASE_API + '/eduoss/fileoss/upload'"
                    field="file"
                    @close="close"
                    @crop-upload-success="cropSuccess"
                />
            </el-form-item>

            <el-form-item>
                <el-button
                    :disabled="saveBtnDisabled"
                    type="primary"
                    @click="saveOrUpdate()"
                    >保存</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入调用 API teacher.js 文件
import teacherApi from '@/api/edu/teacher';

// 引入头像缩略图上传组件
import ImageCropper from '@/components/ImageCropper';
import PanThumb from '@/components/PanThumb';

export default {
    // 声明组件
    components: { ImageCropper, PanThumb },
    data() {
        return {
            teacher: {
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: '',
            },
            saveBtnDisabled: false, // 保存按钮是否禁用,

            // 默认弹窗组件是否显示
            imagecropperShow: false,
            // 上传组件的唯一标识
            imagecropperKey: 0,
            // 获取 config/dev.env.js 中的 BASE_API: '"http://localhost:9001"',
            BASE_API: process.env.BASE_API,
        };
    },
    created() {
        // 要调用，不调用，修改的时候不回显。
        this.init();
    },
    // 监听，路由的变化。有变化就调用方法。
    watch: {
        $route(to, from) {
            this.init();
        },
    },
    // 自定义方法
    methods: {
        saveOrUpdate() {
            this.saveBtnDisabled = true;
            // 判断是修改还是添加
            // 根据 teacher 是否有 id 值。有 id 值就是修改，没有 id 值就是添加
            if (this.teacher.id) {
                this.updateTeacher();
            } else {
                this.saveData();
            }
        },
        // 添加讲师的方法
        saveData() {
            teacherApi
                .saveTeacher(this.teacher)
                // 添加成功
                .then(() => {
                    // 提示添加成功
                    this.$message({
                        type: 'success',
                        message: '添加成功!',
                    });
                    // 回到当前页面刷新添加后的数据 —— 路由跳转(重定向)
                    this.$router.push({ path: '/teacher/table' });
                });
        },
        // 根据讲师 id 查询讲师详细信息
        getInfoById(id) {
            teacherApi.findTeacherById(id).then((response) => {
                this.teacher = response.data.teacher;
            });
        },
        // 修改讲师
        updateTeacher() {
            teacherApi
                .updateTeacherInfo(this.teacher)
                // 修改成功
                .then(() => {
                    // 提示添加成功
                    this.$message({
                        type: 'success',
                        message: '修改成功!',
                    });
                    // 回到当前页面刷新添加后的数据 —— 路由跳转(重定向)
                    this.$router.push({ path: '/teacher/table' });
                });
        },
        init() {
            // 判断路由中的参数不为空，并且参数 id 不为空，修改就需要回显
            if (this.$route.params && this.$route.params.id) {
                this.getInfoById(this.$route.params.id);
            } else {
                // 没有 id 值 就是添加操作，清空原表单的回显。
                this.teacher = {
                    name: '',
                    sort: 0,
                    level: 1,
                    career: '',
                    intro: '',
                    // 默认头像设置
                    avatar: process.env.OSS_PATH + '/avatar/00.jpg',
                };
            }
        },
        // 关闭上传弹框
        close() {
            this.imagecropperShow = false;
            this.imagecropperKey = this.imagecropperKey + 1;
        },
        // 上传成功
        cropSuccess(response) {
            // 先关弹框
            this.imagecropperShow = false;
            // 上传之后接口返回一个图片地址
            this.teacher.avatar = response.url;
            this.imagecropperKey = this.imagecropperKey + 1;
        },
    },
};
</script>