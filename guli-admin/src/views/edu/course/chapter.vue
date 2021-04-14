<template>
    <div class="app-container">
        <h2 style="text-align: center">发布新课程</h2>
        <el-steps :active="2" process-status="wait" style="margin-bottom: 40px" align-center finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="最终发布"></el-step>
        </el-steps>
        <!-- 添加章节按钮 -->
        <el-button type="text" @click="addChapterButton()">添加章节</el-button>
        <!-- 章节 -->
        <ul class="chanpterList">
            <li v-for="chapter in chapterVideoList" :key="chapter.id">
                <p>
                    {{chapter.title}}
                    <span class="acts">
                        <el-button style="" type="text" @click="addVideoButton(chapter.id)">添加小节</el-button>
                        <el-button style="" type="text" @click="updateChapterButton(chapter.id)">编辑</el-button>
                        <el-button type="text" @click="deleeteChapterButton(chapter.id)">删除</el-button>
                    </span>
                </p>
                <!-- 小节 -->
                <ul class=" chanpterList videoList">
                    <li v-for="video in chapter.children" :key="video.id">
                        <p>
                            {{video.title}}
                            <span class="acts">
                                <el-button style="" type="text" @click="updateVideoButton(video.id)">编辑</el-button>
                                <el-button type="text" @click="deleteVideoButton(video.id)">删除</el-button>
                            </span>
                        </p>
                    </li>
                </ul>
            </li>
        </ul>

        <!-- 添加和修改 章节的弹框表单 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="chapter" label-width="120px">
                <el-form-item label="章节标题">
                    <el-input v-model="chapter.title"></el-input>
                </el-form-item>
                <el-form-item label="章节排序">
                    <el-input-number v-model="chapter.sort" :min="0" controls-position="right"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加和修改 小节的弹框表单 -->
        <!-- 添加和修改课时表单 -->
        <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
            <el-form :model="video" label-width="120px">
                <el-form-item label="课时标题">
                    <el-input v-model="video.title" />
                </el-form-item>
                <el-form-item label="课时排序">
                    <el-input-number v-model="video.sort" :min="0" controls-position="right" />
                </el-form-item>
                <el-form-item label="是否免费">
                    <el-radio-group v-model="video.free">
                        <el-radio :label="true">免费</el-radio>
                        <el-radio :label="false">默认</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传视频">
                    <el-upload ref="upload" :on-success="handleUploadSuccess" :on-error="handleUploadError"
                        :on-exceed="handleUploadExceed" :before-remove="handleBeforeRemove" :on-remove="handleOnRemove"
                        :file-list="fileList" :limit="1" :action="BASE_API+'/eduvod/video/upload'">
                        <el-button slot="trigger" size="small" type="primary">上传视频</el-button>
                        <el-tooltip placement="right-end">
                            <div slot="content">最大支持1G，<br>
                                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                            <i class="el-icon-question" />
                        </el-tooltip>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo()">确 定</el-button>
            </div>
        </el-dialog>

        <div>
            <el-button @click="previous()">上一步</el-button>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="next()">下一步</el-button>
        </div>
    </div>
</template>

<script>
// 引入调用 API 文件
import chapterApi from '@/api/edu/chapter';
import videoApi from '@/api/edu/video';
import vodApi from '@/api/edu/vod';

export default {
    // 定义页面中显示的模型数据
    data() {
        return {
            // 保存按钮是否禁用
            saveBtnDisabled: false,
            chapterVideoList: [],
            courseId: '', // 用于保存路径中的课程id
            // 弹框
            chapter: {
                id: '',
                courseId: '', // 课程id
                title: '',
                sort: 0,
                children: [],
            },
            // 章节的对话表单是否可见
            dialogFormVisible: false,

            // 课时按钮是否禁用
            saveVideoBtnDisabled: false,

            // 课时对象
            video: {
                // 课时所在章节id
                chapterId: '',
                title: '',
                sort: 0,
                free: 0,
                videoSourceId: '',
            },
            // 小节的对话表单是否可见
            dialogVideoFormVisible: false,
            // 上传视频文件列表
            fileList: [],
            // 接口 API 地址
            BASE_API: process.env.BASE_API,
            VOD_API: process.env.VOD_API,
        };
    },

    // 创建实例之后，在页面渲染之前执行
    created() {
        // 获取路由中的课程分类 id 值
        if (this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id;
            // 调用方法加载当前课程的所有章节
            this.findAllChapterVidio();
        }
    },

    // 监听，路由的变化。有变化就调用方法。
    watch: {
        route() {
            this.init();
        },
    },
    // 自定义方法
    methods: {
        previous() {
            this.$router.push({
                path: `/course/info/` + this.courseId,
            });
        },
        next() {
            this.$router.push({
                path: `/course/publish/` + this.courseId,
            });
        },

        // ======================================= 章节的增删改查 ======================================= //
        // 根据课程 id 查询章节和小节内容
        findAllChapterVidio() {
            chapterApi.findAllChapterApi(this.courseId).then((response) => {
                this.chapterVideoList = response.data.allChapterVideo;
            });
        },
        // 添加章节按钮
        addChapterButton() {
            this.chapter.title = '';
            this.chapter.sort = 0;
            this.dialogFormVisible = true;
        },
        // 添加或修改章节方法
        saveOrUpdate() {
            if (this.chapter.id) {
                // chapter id 不为空，就是修改。
                this.updateChapter();
            } else {
                // chapter id 为空，就是添加。
                this.addChapter();
            }
        },
        // 添加章节方法
        addChapter() {
            this.chapter.courseId = this.courseId;
            chapterApi.addChapterApi(this.chapter).then((response) => {
                // 添加成功之后
                // 1. 关闭弹框
                this.dialogFormVisible = false;
                // 2. 提示信息
                this.$message({
                    type: 'success',
                    message: '添加章节成功',
                });
                // 3. 刷新页面
                this.findAllChapterVidio();
            });
        },
        // 修改按钮
        updateChapterButton(chapterId) {
            // 弹框
            this.dialogFormVisible = true;
            // 按章节 id 查询出章节内容 回显
            chapterApi.findChapterByIdApi(chapterId).then((response) => {
                this.chapter = response.data.chapter;
            });
        },
        // 编辑章节方法
        updateChapter() {
            chapterApi.updateChapterApi(this.chapter).then(() => {
                // 1.关闭弹框
                this.dialogFormVisible = false;
                // 2. 提示信息
                this.$message({
                    type: 'success',
                    message: '修改章节成功',
                });
                // 3. 刷新页面
                this.findAllChapterVidio();
            });
        },
        // 删除章节
        deleeteChapterButton(chapterId) {
            // 弹框提醒
            this.$confirm('此操作将永久删除章节记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                // 点击确定
                .then(() => {
                    // 调用删除方法
                    chapterApi
                        .deleteChapterApi(chapterId)
                        // 请求成功
                        .then(() => {
                            // 提示删除成功
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                            // 回到当前页面刷新删除后的数据
                            this.findAllChapterVidio();
                        })
                        .catch(() => {
                            // 提示删除失败
                            this.$message({
                                type: 'error',
                                message: '删除失败！请确认是否有未删除的小节！',
                            });
                        });
                });
        },
        // ======================================= 小节的增删改查 ======================================= //
        saveOrUpdateVideo() {
            if (this.video.id) {
                this.updateVideo();
            } else {
                this.addVideo();
            }
        },
        addVideoButton(chapterId) {
            this.video.chapterId = chapterId;
            // 弹框
            this.dialogVideoFormVisible = true;
            // 清空回显
            this.video.title = '';
            this.video.sort = 0;
            this.video.free = 0;
            this.video.videoSourceId = '';
        },
        updateVideoButton(videoId) {
            // 弹框
            this.dialogVideoFormVisible = true;
            // 按章节 id 查询出小节内容 回显
            videoApi.findVideoByIdApi(videoId).then((response) => {
                this.video = response.data.video;
                // 视频列表回显
                if (this.video.videoOriginalName === '') {
                    this.fileList = [];
                } else {
                    this.fileList = [
                        { name: this.video.videoOriginalName, url: '' },
                    ];
                }
            });
            // 回到当前页面刷新添加后的数据
            this.findAllChapterVidio();
        },

        // 取消按钮
        cancel() {
            // 首先关闭弹框
            this.dialogVideoFormVisible = false;
            // 如果视频变化过。就要删除阿里云中的视频
            videoApi.findVideoByIdApi(this.video.id).then((response) => {
                if (this.video.videoSourceId) {
                    // 当前页面中的视频id跟数据库的视频id不一样
                    if (
                        this.video.videoSourceId !=
                        response.data.video.videoSourceId
                    ) {
                        // 删除阿里云中的视频
                        vodApi.deleteAliVideoByIdApi(this.video.videoSourceId);
                    }
                }
            });
        },

        // 添加小节
        addVideo() {
            this.video.courseId = this.courseId;
            videoApi.addVideoApi(this.video).then(() => {
                // 1.关闭弹框
                this.dialogVideoFormVisible = false;
                // 提示添加成功
                this.$message({
                    type: 'success',
                    message: '添加成功!',
                });
                // 回到当前页面刷新添加后的数据
                this.findAllChapterVidio();
            });
            // 添加完之后要清空表单。
            this.fileList = [];
        },
        // 编辑小节
        updateVideo() {
            videoApi.updateVideoApi(this.video).then(() => {
                // 1.关闭弹框
                this.dialogVideoFormVisible = false;
                // 2. 提示信息
                this.$message({
                    type: 'success',
                    message: '修改成功',
                });
                // 3. 刷新页面
                this.findAllChapterVidio();
            });
        },
        // 删除小节
        deleteVideoButton(videoId) {
            // 弹框提醒
            this.$confirm('此操作将永久删除小节记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                // 点击确定
                .then(() => {
                    // 调用删除方法
                    videoApi
                        .deleteVideoByIdApi(videoId)
                        // 请求成功
                        .then(() => {
                            // 提示删除成功
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                            // 回到当前页面刷新删除后的数据
                            this.findAllChapterVidio();
                        })
                        .catch(() => {
                            // 提示删除失败
                            this.$message({
                                type: 'error',
                                message: '删除失败！',
                            });
                        });
                });
        },

        // ======================================= 视频的增删改查 ======================================= //
        // 处理上传成功
        handleUploadSuccess(response, file, fileList) {
            this.uploadBtnDisabled = false;
            if (response.success) {
                // 上传视频 id 赋值
                this.video.videoSourceId = response.data.videoId;
                // 上传视频 名称 赋值
                this.video.videoOriginalName = file.name;
                // debugger
            } else {
                this.$message.error('上传失败（非20000）');
            }
        },

        // 上传之前处理上传多于一个的视频
        handleUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频');
        },
        handleUploadError() {
            this.uploadBtnDisabled = false;
            this.$message.error('上传失败（http）');
        },
        // 删除之前先删除阿里云中的视频
        handleBeforeRemove(file, FileList) {
            // 弹框提醒
            return this.$confirm(
                `此操作将永久删除 ${file.name} 视频记录, 是否继续?`
            );
        },
        // 处理完删除之后
        handleOnRemove() {
            // 调用删除方法
            vodApi
                .deleteAliVideoByIdApi(this.video.videoSourceId)
                // 请求成功
                .then(() => {
                    // 提示删除成功
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });

                    FileList = [];
                    // 删除视频之后把 video 中的视频 id 和 原始视频名字删除。
                    this.video.videoSourceId = '';
                    this.video.videoOriginalName = '';

                    // 调用 vodeo 修改方法先把原先的视频 id 和名称删除
                    videoApi.updateVideoApi(this.video).then(() => {
                        this.findAllChapterVidio();
                    });
                })
                .catch(() => {
                    // 提示删除失败
                    this.$message({
                        type: 'error',
                        message: '删除失败！',
                    });
                });
        },
    },
};
</script>
<style scoped>
.chanpterList {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li {
    position: relative;
}
.chanpterList p {
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #ddd;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}
.videoList {
    padding-left: 70px;
}
.videoList p {
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #ddd;
}
</style>