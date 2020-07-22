<template>
	<view class="content" style="margin-bottom: 50px;">
		<view class="input-row" style="color:#3F536E;line-height: 28px;font-size: 16px;background-color:#B2B2B2;">
			<text style="width: 50%;">课程名称</text>
			<text style="width: 25%;">学习时长</text>
			<text style="width: 25%;">总时长</text>
		</view>
		<view class="input-row border" style="color: grey;line-height: 25px;margin-top: 10px;font-size: 15px;" v-for="(item, i) in studyProgress" :key="i">
			<text style="width: 50%;">{{item.courseName}}</text>
			<text style="width: 25%;">{{item.learnTotalTime | formatLong}}</text>
			<text style="width: 25%;">{{item.totalTime | formatLong}}</text>
		</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				list:[],
				studyProgress:uni.getStorageSync("courseTotalTime"),
			}
		},
		async onPullDownRefresh() {
			await this.loadJs.reloadCourseTotalTime(this.$store.baseInfoId);
			this.studyProgress = uni.getStorageSync("courseTotalTime");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("courseTotalTime")){
				await this.loadJs.reloadCourseTotalTime(this.$store.baseInfoId);
			}
			this.studyProgress = uni.getStorageSync("courseTotalTime");
		}
	}
</script>
