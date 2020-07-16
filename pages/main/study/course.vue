<template>
    <view class="content" style="text-align: center;width: 95%;">
		<view style="padding-left: 10px;padding-right: 10px;">
			<view :style="{backgroundImage: 'url(../../../static/img/course_back1.png)',width:'100%',height:'95px'}">
				<view style="color:#E5E5E5;font-size: large;letter-spacing: 5px;">
					<br>{{courseName}}
				</view>
				<view style="margin-top: 10px;color:#E5E5E5;font-size: 14px;">
					<text>{{courseNature | getDictName(this.CODE_COURSENATURE) }}</text>
					<text style="margin-left: 10px;">学分: {{creditHour}}</text>
					<text style="margin-left: 10px;">学时: {{stydyHour}}</text>
				</view>
			</view>
		</view>
		<uni-segmented-control  style="width: 100%;" :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#007AFF"></uni-segmented-control>
		<view v-if="current === 0">
			<uni-collapse :accordion="true">
				<uni-collapse-item v-for="(cd1,i) in courseD_1" :key="cd1" :title="cd1.type | getDictName('CodeCourseOverviewType')" 
					style="text-align: left;" :show-animation="true">
					<view class="input-row" style="color: #000000;background-color: #b8deef;font-size: 15px;">
						<jyf-parser :html="cd1.content"></jyf-parser>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view v-if="current === 1">
			<uni-collapse :accordion="true" >
				<uni-collapse-item v-for="(cd2,i) in courseD_2" :key="i" v-if="i>0" :title="i +' '+ cd2.syllabusName" 
					:show-animation="true" style="text-align: left;">
					<view style="background-color:#F8F8F8; font-size: medium;">
						<navigator :url="'./exam?syllabusId='+cd2.resourceid+'&courseId='+cd2.course+'&syllabusName='+cd2.syllabusName" open-type="navigate"
							style="background-color: #E5E5E5;">
							<icon-button src1="../../../static/img/exam.png" name="随堂练习"></icon-button>
						</navigator>
						<icon-button src1="../../../static/img/video.png" :showRight="false" name="视频课件"></icon-button>
						<view class="border" v-for="(cd21,j) in courseD_21" :key="j" v-if="cd2.resourceid == cd21.syllabus && cd21.mateType=='2'"
							style="line-height: 15px;font-size: 15px;padding-left: 20px;color:#0A98D5;padding-top: 7px;padding-bottom: 7px;">
							<navigator open-type="navigate" :url="'../videoView?webUrl='+cd21.mateUrl+'&totalTime='+cd21.totalTime+'&courseId='+cd2.course+'&mateId='+cd21.resourceid">
								{{cd21.mateName}}
							</navigator>
						</view>
						<icon-button src1="../../../static/img/document.png" :showRight="false" name="参考资料"></icon-button>
						<view class="border" v-for="(cd21,j) in courseD_21" :key="j" v-if="cd2.resourceid == cd21.syllabus && cd21.mateType!='2'"
							style="line-height: 15px;font-size: 15px;padding-left: 20px;color:#0A98D5;padding-top: 7px;padding-bottom: 7px;">
							<navigator open-type="navigate" :url="'../fileView?webUrl='+cd21.mateUrl">
								{{cd21.mateName}}
							</navigator>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view v-if="current === 2">
			<navigator :url="'./exercise?courseId='+courseId" open-type="navigate">
				<icon-button :src1="'../../../static/img/teach/homework.png'" name="课后作业"></icon-button>
			</navigator>
			<view v-for="(item,index) in courseD_3" :key="index" style="background-color:#F8F8F8; font-size: medium;">
				<navigator :url="'./topic?sectionId='+item.resourceid+'&sectionCode='+item.sectionCode+'&courseId='+courseId+'&sectionName='+item.sectionName" open-type="navigate">
					<icon-button :src1="'../../../static/img/teach/'+item.sectionCode+'.png'" :name="item.sectionName"></icon-button>
				</navigator>
			</view>
		</view>
    </view>
</template>

<script>
	import iconButton from '../../../components/icon-button.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {uniSegmentedControl,iconButton},
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
				courseD_21:uni.getStorageSync("courseD_21"+this.courseId),
				courseD_3:uni.getStorageSync("bbsSection")
			}
		},
		onPullDownRefresh() {
			if(this.current===2){
				this.loadJs.reloadBbsSection();
			}else{
				this.loadJs.reloadCourseDetail(this.courseId);
				this.loadJs.reloadStudyProgress(this.$store.baseInfoId);
			}
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
			if(!uni.getStorageSync("bbsSection")){
				await this.loadJs.reloadBbsSection();
			}
			this.courseD_1 = uni.getStorageSync("courseD_1"+this.courseId);
			this.courseD_2 = uni.getStorageSync("courseD_2"+this.courseId);
			this.courseD_21 = uni.getStorageSync("courseD_21"+this.courseId);
			this.courseD_3 = uni.getStorageSync("bbsSection");
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
