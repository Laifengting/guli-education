<template>
	<div class="bg-fa of" id="aCoursesList">
		<!-- /课程详情 开始 -->
		<section class="container">
			<section class="path-wrap txtOf hLh30">
				<a class="c-999 fsize14" href="#" title>首页</a>
				\
				<a class="c-999 fsize14" href="#" title>课程列表</a>
				\
				<span class="c-333 fsize14">{{data.title}}</span>
			</section>
			<div>
				<article class="c-v-pic-wrap" style="height: 357px;">
					<section class="p-h-video-box" id="videoPlay">
						<img :alt="data.title" :src="data.cover" class="dis c-v-pic">
					</section>
				</article>
				<aside class="c-attr-wrap">
					<section class="ml20 mr15">
						<h2 class="hLh30 txtOf mt15">
							<span class="c-fff fsize24">{{data.title}}</span>
						</h2>
						<section class="c-attr-jg">
							<span class="c-fff">价格：</span>
							<b class="c-yellow" style="font-size:24px;">￥{{data.price}}</b>
						</section>
						<section class="c-attr-mt c-attr-undis">
							<span class="c-fff fsize14">主讲：{{data.teacher.name}}&nbsp;&nbsp;&nbsp;</span>
						</section>
						<section class="c-attr-mt of">
                            <span class="ml10 vam">
                                <em class="icon18 scIcon"></em>
                                <a class="c-fff vam" href="#" title="收藏">收藏</a>
                            </span>
						</section>
						<section class="c-attr-mt">
							<a class="comm-btn c-btn-3" href="#" title="立即观看">立即观看</a>
						</section>
					</section>
				</aside>
				<aside class="thr-attr-box">
					<ol class="thr-attr-ol clearfix">
						<li>
							<p>&nbsp;</p>
							<aside>
								<span class="c-fff f-fM">购买数</span>
								<br>
								<h6 class="c-fff f-fM mt10">{{data.buyCount}}</h6>
							</aside>
						</li>
						<li>
							<p>&nbsp;</p>
							<aside>
								<span class="c-fff f-fM">课时数</span>
								<br>
								<h6 class="c-fff f-fM mt10">{{data.lessonNum}}</h6>
							</aside>
						</li>
						<li>
							<p>&nbsp;</p>
							<aside>
								<span class="c-fff f-fM">浏览数</span>
								<br>
								<h6 class="c-fff f-fM mt10">{{data.viewCount}}</h6>
							</aside>
						</li>
					</ol>
				</aside>
				<div class="clear"></div>
			</div>
			<!-- /课程封面介绍 -->
			<div class="mt20 c-infor-box">
				<article class="fl col-7">
					<section class="mr30">
						<div class="i-box">
							<div>
								<section class="c-infor-tabTitle c-tab-title" id="c-i-tabTitle">
									<a class="current" name="c-i" title="课程详情">课程详情</a>
								</section>
							</div>
							<article class="ml10 mr10 pt20">
								<div>
									<h6 class="c-i-content c-infor-title">
										<span>课程介绍</span>
									</h6>
									<div class="course-txt-body-wrap">
										<section class="course-txt-body">
											<p>{{data.description}}</p>
										</section>
									</div>
								</div>
								<!-- /课程介绍 -->
								<div class="mt50">
									<h6 class="c-g-content c-infor-title">
										<span>课程大纲</span>
									</h6>
									<section class="mt20">
										<div class="lh-menu-wrap">
											<menu class="lh-menu mt10 mr10" id="lh-menu">
												<ul>
													<!-- 文件目录 -->
													<li :key="chapter.id" class="lh-menu-stair"
														v-for="chapter in data.chapterList">
														<a :title="chapter.title" class="current-1"
														   href="javascript: void(0)">
															<em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
														</a>
														<ol class="lh-menu-ol" style="display: block;">
															<li :key="video.id"
																class="lh-menu-second ml30" v-for="video in chapter.children">
																<a href="#" title>
                                                                    <span class="fr">
                                                                        <i class="free-icon vam mr10">免费试听</i>
                                                                    </span>
																	<em
																			class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
																</a>
															</li>
														</ol>
													</li>
												</ul>
											</menu>
										</div>
									</section>
								</div>
								<!-- /课程大纲 -->
							</article>
						</div>
					</section>
				</article>
				<aside class="fl col-3">
					<div class="i-box">
						<div>
							<section class="c-infor-tabTitle c-tab-title">
								<a href="javascript:void(0)" title>主讲讲师</a>
							</section>
							<section class="stud-act-list">
								<ul style="height: auto;">
									<li>
										<div class="u-face">
											<a href="#">
												<img :src="data.teacher.avatar" alt height="50" width="50">
											</a>
										</div>
										<section class="hLh30 txtOf">
											<a class="c-333 fsize16 fl" href="#">{{data.teacher.name}}</a>
										</section>
										<section class="hLh20 txtOf">
											<span class="c-999">{{data.teacher.career}}</span>
										</section>
									</li>
								</ul>
							</section>
						</div>
					</div>
				</aside>
				<div class="clear"></div>
			</div>
		</section>
		<!-- /课程详情 结束 -->
	</div>
</template>
<script>
	import courseApi from '@/api/course';

	export default {
		// 执行异步调用方法 asyncData，只会调用一次
		// params：相当于 this.$route.params.id 就等于现在的 params.id
		asyncData({params, error}) {
			return courseApi
					.getCourseTeacherChapterVideoInfoById(params.id)
					.then((response) => {
						console.log(response);
						return {data: response.data.courseTeacherInfoVo};
					});
		},
	};
</script>
