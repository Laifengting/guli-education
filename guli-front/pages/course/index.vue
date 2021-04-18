<template>
    <div class="bg-fa of" id="aCoursesList">
        <!-- /课程列表 开始 -->
        <section class="container">
            <header class="comm-title">
                <h2 class="fl tac">
                    <span class="c-333">全部课程</span>
                </h2>
            </header>
            <section class="c-sort-box">
                <section class="c-s-dl">
                    <dl>
                        <dt>
                            <span class="c-999 fsize14">课程类别</span>
                        </dt>
                        <dd class="c-s-dl-li">
                            <ul class="clearfix">
                                <li>
                                    <a href="javascript:void(0);" title="全部" @click="searchAll()">全部</a>
                                </li>
                                <li v-for="(onesubject,index) in subjectList" :key="index"
                                    :class="{active:oneIndex==index}">
                                    <a href="javascript:void(0);" :title="onesubject.title"
                                        @click="searchOne(onesubject.id,index)">{{onesubject.title}}</a>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span class="c-999 fsize14"></span>
                        </dt>
                        <dd class="c-s-dl-li">
                            <ul class="clearfix">
                                <!-- TODO -->
                                <li v-for="(subjectTwo,index) in twoSubjectList" :key="index"
                                    :class="{active:twoIndex==index}">
                                    <a href="javascript:void(0);" :title="subjectTwo.title"
                                        @click="searchTwo(subjectTwo.id,index)">{{subjectTwo.title}}</a>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div class="clear"></div>
                </section>
                <div class="js-wrap">
                    <section class="fr">
                        <span class="c-ccc">
                            <i class="c-master f-fM">1</i>/
                            <i class="c-666 f-fM">1</i>
                        </span>
                    </section>
                    <section class="fl">
                        <ol class="js-tap clearfix">
                            <li :class="{'current bg-orange':courseQuery.viewCount!=''}">
                                <a href="javascript:void(0);" title="关注度" @click="focusOn">关注度
                                    <span :class="{hide:courseQuery.viewCount==''}">↓</span>
                                </a>
                            </li>
                            <li :class="{'current bg-orange':courseQuery.gmtCreate!=''}">
                                <a href="javascript:void(0);" title="最新" @click="createNew">最新
                                    <span :class="{hide:courseQuery.gmtCreate==''}">↓</span>
                                </a>
                            </li>
                            <li :class="{'current bg-orange':courseQuery.price!=''}">
                                <a href="javascript:void(0);" @click="priceButtomFuc" title="价格">价格
                                    <span :class="{hide:courseQuery.price==''}">↓</span>
                                </a>

                            </li>
                        </ol>
                    </section>
                </div>
                <div class="mt40">
                    <!-- /无数据提示 开始-->
                    <section class="no-data-wrap" v-if="map.items.length==0">
                        <em class="icon30 no-data-ico">&nbsp;</em>
                        <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
                    </section>
                    <!-- /无数据提示 结束-->
                    <article class="comm-course-list" v-if="map.items.length>0">
                        <ul class="of" id="bna">
                            <li v-for="course in map.items" :key="course.id">
                                <div class="cc-l-wrap">
                                    <section class="course-img">
                                        <img :alt="course.title" class="img-responsive" :src="course.cover">
                                        <div class="cc-mask">
                                            <a class="comm-btn c-btn-1" :href="'/course/'+course.id"
                                                title="开始学习">开始学习</a>
                                        </div>
                                    </section>
                                    <h3 class="hLh30 txtOf mt10">
                                        <a class="course-title fsize18 c-333" :href="'/course/'+course.id"
                                            :title="course.title">{{course.title}}</a>
                                    </h3>
                                    <section class="mt10 hLh20 of">
                                        <span class="fr jgTag bg-green">
                                            <i
                                                class="c-fff fsize12 f-fA">{{course.price==0?'免费':'￥ '+course.price+' 元'}}</i>
                                        </span>
                                        <span class="fl jgAttr c-ccc f-fA">
                                            <i class="c-999 f-fA">{{course.buyCount}}人学习</i>
                                            |
                                            <i class="c-999 f-fA">{{course.viewCount}}评论</i>
                                        </span>
                                    </section>
                                </div>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </article>
                </div>

                <!-- 公共分页 开始 -->
                <div>
                    <div class="paging">
                        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
                        <a :class="{undisable: !map.hasPrevious}" @click.prevent="gotoPage(1)"
                            href="javascript:void(0);" title="首页">首</a>

                        <a :class="{undisable: !map.hasPrevious}" href="javascript:void(0);"
                            @click.prevent="gotoPage(map.current-1)" title="前一页">&lt;</a>

                        <a :class="{current: map.current === page, undisable: map.current === page}" :key="page"
                            href="javascript:void(0);" :title="'第'+page+'页'" @click.prevent="gotoPage(page)"
                            v-for="page in map.pages">{{ page }}</a>

                        <a :class="{undisable: !map.hasNext}" @click.prevent="gotoPage(map.current+1)"
                            href="javascript:void(0);" title="后一页">&gt;</a>

                        <a :class="{undisable: !map.hasNext}" @click.prevent="gotoPage(map.pages)" title="末页"
                            href="javascript:void(0);">末</a>
                        <div class="clear" />
                    </div>
                </div>
                <!-- 公共分页 结束 -->
            </section>
        </section>
        <!-- /课程列表 结束 -->
    </div>
</template>
<script>
import courseApi from '@/api/course';
import subjectApi from '@/api/subject';

export default {
    data() {
        return {
            // 封装查询条件
            courseQuery: {
                subjectParentId: '',
                subjectId: '',
                price: '',
                viewCount: '',
                gmtCreate: '',
            },
            // 查询到的课程分页列表
            map: {
                items: [],
                current: 1,
                limit: 8,
                pages: 0,
                total: 0,
                hasPrevious: false,
                hasNext: false,
            },
            // 获得的课程一级分类
            subjectList: [],
            // 课程的二级分类
            twoSubjectList: [],
            oneIndex: -1,
            twoIndex: -1,
        };
    },

    created() {
        this.getSubject();
        this.gotoPage(1);
    },

    methods: {
        // 页面跳转
        gotoPage(page) {
            courseApi
                .getCoursePageApi(page, 8, this.courseQuery)
                .then((response) => {
                    // console.log(response);
                    this.data = response.data;
                    this.map = response.data;
                });
        },

        // 获取所有一级分类
        getSubject() {
            subjectApi.getAllSubjectApi().then((response) => {
                // console.log(response);
                this.subjectList = response.data.list;
            });
        },
        // 点击全部
        searchAll() {
            this.courseQuery = {
                subjectParentId: '',
                subjectId: '',
                price: '',
                viewCount: '',
                gmtCreate: '',
            };
            this.twoSubjectList = [];
            this.gotoPage(this.map.current);
        },

        // 点击一级分类查询出二级分类
        searchOne(oneId, index) {
            this.oneIndex = index;
            this.twoIndex = -1;
            // 遍历所有一级分类
            for (let i = 0; i < this.subjectList.length; i++) {
                // 获取每一个一级分类
                var oneSubject = this.subjectList[i];
                // 比较一级分类 id 跟 点击的是否相同
                if (oneSubject.id == oneId) {
                    this.courseQuery.subjectParentId = oneId;
                    this.twoSubjectList = oneSubject.children;
                }
            }
            this.gotoPage(this.map.current);
        },

        searchTwo(twoId, index) {
            this.twoIndex = index;
            this.courseQuery.subjectId = twoId;
            this.gotoPage(this.map.current);
        },

        // 按最新排序
        createNew() {
            this.courseQuery.gmtCreate = 'createNew';
            this.courseQuery.price = '';
            this.courseQuery.viewCount = '';
            this.gotoPage(this.map.current);
        },
        // 按关注排序
        focusOn() {
            this.courseQuery.gmtCreate = '';
            this.courseQuery.price = '';
            this.courseQuery.viewCount = 'viewCount';
            this.gotoPage(this.map.current);
        },
        // 按价格排序
        priceButtomFuc() {
            this.courseQuery.gmtCreate = '';
            this.courseQuery.viewCount = '';
            this.courseQuery.price = 'price';
            this.gotoPage(this.map.current);
        },
    },
};
</script>
<style scoped>
.active {
    background: #bebebe;
}
.hide {
    display: none;
}
.show {
    display: block;
}
</style>