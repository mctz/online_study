<template>
    <view class="content" style="text-align: center;width: 90%;">
		<view :style="{backgroundImage: 'url(../../../static/img/course_back1.png)',width:'100%',height:'100px'}">
			<view style="margin-top: 25px;color:#E5E5E5;font-size: large;letter-spacing: 5px;">
				{{courseName}}
			</view>
			<view style="margin-top: 10px;color:#E5E5E5;font-size: 14px;">
				<text>{{courseNature | getDictName(this.CODE_COURSENATURE) }}</text>
				<text style="margin-left: 10px;">学分: {{creditHour}}</text>
				<text style="margin-left: 10px;">学时: {{stydyHour}}</text>
			</view>
		</view>
		<uni-segmented-control  style="width: 100%;" :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#007AFF"></uni-segmented-control>
		<view v-if="current === 0">
			<uni-collapse :accordion="true">
				<uni-collapse-item v-for="(n,i) in courseD_1" :key="i" :title="courseD_1[i].type | getDictName('CodeCourseOverviewType')" 
					style="text-align: left;" :show-animation="true">
					<view class="input-row" style="color: #000000;background-color: #b8deef;font-size: 15px;padding-right: 20px;">
						<jyf-parser :html="courseD_1[i].content"></jyf-parser>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view v-if="current === 1">
			<uni-collapse :accordion="true" >
				<uni-collapse-item v-for="(n,i) in courseD_2" :key="i" v-if="i>0" :title="i +' '+ courseD_2[i].syllabusName" 
					:show-animation="true" style="text-align: left;">
					<view style="background-color:#F8F8F8; font-size: medium;">
						<!-- <navigator :url="'./courseExam?syllabusId='+courseD_2[i].resourceid+'&courseId='+courseD_2[i].course+'&syllabusName='+courseD_2[i].syllabusName" open-type="navigate"
							style="background-color: #E5E5E5;">
							<icon-button src1="../../../static/img/exam.png" name="随堂练习"></icon-button>
						</navigator> -->
						<icon-button src1="../../../static/img/video.png" :showRight="false" name="视频课件"></icon-button>
						<view class="border" v-for="(m,j) in courseD_21" :key="j" v-if="courseD_2[i].resourceid == courseD_21[j].syllabus && courseD_21[j].mateType=='2'"
							style="line-height: 15px;font-size: 15px;padding-left: 20px;color:#0A98D5;padding-top: 10px;">
							<navigator open-type="navigate" :url="'../videoView?webUrl='+courseD_21[j].mateUrl+'&totalTime='+courseD_21[j].totalTime+'&courseId='+courseD_2[i].course+'&mateId='+courseD_21[j].resourceid">
								{{courseD_21[j].mateName}}
							</navigator>
						</view>
						<icon-button src1="../../../static/img/document.png" :showRight="false" name="参考资料"></icon-button>
						<view class="border" v-for="(m,j) in courseD_21" :key="j" v-if="courseD_2[i].resourceid == courseD_21[j].syllabus && courseD_21[j].mateType!='2'"
							style="line-height: 15px;font-size: 15px;padding-left: 20px;color:#0A98D5;padding-top: 10px;">
							<navigator open-type="navigate" :url="'../fileView?webUrl='+courseD_21[j].mateUrl">
								{{courseD_21[j].mateName}}
							</navigator>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view v-if="current === 2">
			<view style="background-color:#F8F8F8; font-size: medium;">
				<!-- <navigator url="" open-type="navigate">
					<icon-button src1="../../../static/img/exercise.png" name="课程问答"></icon-button>
				</navigator> -->
			</view>
		</view>
    </view>
</template>

<script>
	import iconButton from '../../../components/icon-button.vue'
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	
	export default {
		components: {uniSegmentedControl,jyfParser,iconButton},
		data() {
			return {
				items: ['简介','章节','更多'],
				current: 1,
				courseId:"",
				courseName:"",
				courseNature:"",
				creditHour:"",
				stydyHour:"",
				courseD_1:uni.getStorageSync("courseD_1"+this.courseId),
				courseD_2:uni.getStorageSync("courseD_2"+this.courseId),
				courseD_21:uni.getStorageSync("courseD_21"+this.courseId)
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadCourseDetail(this.courseId);
			this.loadJs.reloadStudyProgress(this.$store.baseInfoId);
			uni.stopPullDownRefresh();
		},
		onLoad(option) {
			this.courseId = option.course;
			this.courseName = option.courseName;
			this.courseNature = option.courseNature;
			this.creditHour = option.creditHour;
			this.stydyHour = option.stydyHour;
		},
		async onReady() {
			if(!uni.getStorageSync("courseD_1"+this.courseId)){
				await this.loadJs.reloadCourseDetail(this.courseId);
			}
			this.courseD_1 = uni.getStorageSync("courseD_1"+this.courseId);
			this.courseD_2 = uni.getStorageSync("courseD_2"+this.courseId);
			this.courseD_21 = uni.getStorageSync("courseD_21"+this.courseId);
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style>
	
</style>
