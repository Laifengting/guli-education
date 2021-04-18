<template>
    <div class="bg-fa of" id="aCoursesList">
        <!-- 讲师列表 开始 -->
        <section class="container">
            <header class="comm-title all-teacher-title">
                <h2 class="fl tac">
                    <span class="c-333">全部讲师</span>
                </h2>
                <section class="c-tab-title">
                    <a href="#" id="subjectAll" title="全部">全部</a>
                    <!-- <c:forEach var="subject" items="${subjectList }">
							<a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
					</c:forEach>-->
                </section>
            </header>
            <section class="c-sort-box unBr">
                <div>
                    <!-- /无数据提示 开始-->
                    <section class="no-data-wrap" v-if="data.total==0">
                        <em class="icon30 no-data-ico">&nbsp;</em>
                        <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
                    </section>
                    <!-- /无数据提示 结束-->
                    <article class="i-teacher-list" v-if="data.total>0">
                        <ul class="of">
                            <li :key="teacher.id" v-for="teacher in data.items">
                                <section class="i-teach-wrap">
                                    <div class="i-teach-pic">
                                        <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank">
                                            <img :alt="teacher.name" :src="teacher.avatar">
                                        </a>
                                    </div>
                                    <div class="mt10 hLh30 txtOf tac">
                                        <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666"
                                            target="_blank">{{teacher.name}}</a>
                                    </div>
                                    <div class="hLh30 txtOf tac">
                                        <span class="fsize14 c-999">{{teacher.intro}}</span>
                                    </div>
                                    <div class="mt15 i-q-txt">
                                        <p class="c-999 f-fA">{{teacher.career}}</p>
                                    </div>
                                </section>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </article>
                </div>
                <!-- 公共分页 开始 -->
                <div>
                    <div class="paging">
                        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
                        <a :class="{undisable: !data.hasPrevious}" @click.prevent="gotoPage(1)" title="首页">首</a>

                        <a :class="{undisable: !data.hasPrevious}" @click.prevent="gotoPage(data.current-1)"
                            title="前一页">&lt;</a>

                        <a :class="{current: data.current === page, undisable: data.current === page}" :key="page"
                            :title="'第'+page+'页'" @click.prevent="gotoPage(page)"
                            v-for="page in data.pages">{{ page }}</a>

                        <a :class="{undisable: !data.hasNext}" @click.prevent="gotoPage(data.current+1)"
                            title="后一页">&gt;</a>

                        <a :class="{undisable: !data.hasNext}" @click.prevent="gotoPage(data.pages)" title="末页">末</a>
                        <div class="clear" />
                    </div>
                </div>
                <!-- 公共分页 结束 -->
            </section>
        </section>
        <!-- /讲师列表 结束 -->
    </div>
</template>
<script>
import teacherApi from '@/api/teacher';

export default {
    // 执行异步调用方法 asyncData，只会调用一次
    // params：相当于 this.$route.params.id 就等于现在的 params.id
    asyncData({ params, error }) {
        return teacherApi.getTeacherListApi(1, 8).then((response) => {
            // console.log(response);
            return { data: response.data };
        });
    },
    methods: {
        // 分页切换的方法
        // 参数是页码数
        gotoPage(page) {
            teacherApi.getTeacherListApi(page, 8).then((response) => {
                this.data = response.data;
            });
        },
    },
};
</script>
