<template>
    <div class="app-container">
        <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom: 30px" />

        <el-tree ref="tree2" :data="subjectList" :props="defaultProps" :filter-node-method="filterNode"
            class="filter-tree" default-expand-all>
        </el-tree>
    </div>
</template>


<script>
// 引入调用 API teacher.js 文件
import subjectAPI from '@/api/edu/subject';

export default {
    data() {
        return {
            filterText: '',
            // 返回所有课程分类的集合
            subjectList: [],
            defaultProps: {
                children: 'children',
                label: 'title',
            },
        };
    },

    // 页面渲染之前执行，一般调用 methods 里面定义的方法
    created() {
        // 调用方法
        this.getAllSubject();
    },

    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        },
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            // 将数据小写再比较
            return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        },

        getAllSubject() {
            subjectAPI.getAllSubjectApi().then((response) => {
                console.log(response);
                this.subjectList = response.data.list;
            });
        },
    },
};
</script>