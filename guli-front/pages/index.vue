<template>

	<div>
		<!-- 幻灯片 开始 -->
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div :key="banner.id" class="swiper-slide" style="background: #040B1B;" v-for="banner in bannerList">
					<a href="banner.linkUrl" target="_blank">
						<img :src="banner.imageUrl" alt="banner.title">
					</a>
				</div>
			</div>
			<div class="swiper-pagination swiper-pagination-white"></div>
			<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
			<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
		</div>
		<!-- 幻灯片 结束 -->

		<div id="aCoursesList">
			<!-- 网校课程 开始 -->
			<div>
				<section class="container">
					<header class="comm-title">
						<h2 class="tac">
							<span class="c-333">热门课程</span>
						</h2>
					</header>
					<div>
						<article class="comm-course-list">
							<ul class="of" id="bna">
								<li :key="course.id" v-for="course in courseList">
									<div class="cc-l-wrap">
										<section class="course-img">
											<img :alt="course.title" :src="course.cover" class="img-responsive">
											<div class="cc-mask">
												<a class="comm-btn c-btn-1" href="#" title="开始学习">开始学习</a>
											</div>
										</section>
										<h3 class="hLh30 txtOf mt10">
											<a :title="course.title" class="course-title fsize18 c-333"
											   href="#">{{course.title}}</a>
										</h3>
										<section class="mt10 hLh20 of">
                                            <span class="fr jgTag bg-green">
                                                <i
														class="c-fff fsize12 f-fA">{{Number(course.price)===0 ? '免费' : '会员专享'}}</i>
                                            </span>
											<span class="fl jgAttr c-ccc f-fA">
                                                <i class="c-999 f-fA">{{course.buyCount}}</i>
                                                |
                                                <i class="c-999 f-fA">{{course.buyCount/2+8}}</i>
                                            </span>
										</section>
									</div>
								</li>
							</ul>
							<div class="clear"></div>
						</article>
						<section class="tac pt20">
							<a class="comm-btn c-btn-2" href="/course" title="全部课程">全部课程</a>
						</section>
					</div>
				</section>
			</div>
			<!-- /网校课程 结束 -->
			<!-- 网校名师 开始 -->
			<div>
				<section class="container">
					<header class="comm-title">
						<h2 class="tac">
							<span class="c-333">名师大咖</span>
						</h2>
					</header>
					<div>
						<article class="i-teacher-list">
							<ul class="of">
								<li :key="teacher.id" v-for="teacher in teacherList">
									<section class="i-teach-wrap">
										<div class="i-teach-pic">
											<a :title="teacher.name" href="/teacher/1">
												<img :alt="teacher.name" :src="teacher.avatar">
											</a>
										</div>
										<div class="mt10 hLh30 txtOf tac">
											<a :title="teacher.name" class="fsize18 c-666"
											   href="/teacher/1">{{teacher.name}}</a>
										</div>
										<div class="hLh30 txtOf tac">
											<span class="fsize14 c-999">{{teacher.career}}</span>
										</div>
										<div class="mt15 i-q-txt">
											<p class="c-999 f-fA">{{teacher.intro}}</p>
										</div>
									</section>
								</li>
							</ul>
							<div class="clear"></div>
						</article>
						<section class="tac pt20">
							<a class="comm-btn c-btn-2" href="/teacher" title="全部讲师">全部讲师</a>
						</section>
					</div>
				</section>
			</div>
			<!-- /网校名师 结束 -->
		</div>
	</div>
</template>
<script>
	import bannerApi from '@/api/banner';
	import indexApi from '@/api/index';

	export default {
		data() {
			return {
				swiperOption: {
					//配置分页
					pagination: {
						el: '.swiper-pagination', //分页的dom节点
					},
					//配置导航
					navigation: {
						nextEl: '.swiper-button-next', //下一页dom节点
						prevEl: '.swiper-button-prev', //前一页dom节点
					},
				},
				bannerList: [],
				courseList: [],
				teacherList: [],
			};
		},
		created() {
			this.initDataBanner();
		},
		methods: {
			initDataBanner() {
				bannerApi.getList().then((response) => {
					this.bannerList = response.data.list;
				});
				indexApi.getIndexData().then((response) => {
					this.courseList = response.data.courseList;
					this.teacherList = response.data.teacherList;
				});
			},
		},
	};
</script>
