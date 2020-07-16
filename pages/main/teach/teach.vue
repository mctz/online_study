<template>
	
	<view class="content" style="margin-bottom: 50px;">
		<line-text ltext="教学计划" :rtext="teachPlan.planName"></line-text>
		<line-text ltext="办学模式" :rtext="teachPlan.schoolType | getDictName(this.CODE_LEARNINGSTYLE)"></line-text>
		<line-text ltext="专业" :rtext="teachPlan.majorName"></line-text>
		<line-text ltext="层次" :rtext="teachPlan.classicName"></line-text>
		<line-text ltext="学制" :rtext="teachPlan.eduYear"></line-text>
		<line-text ltext="学位授予" :rtext="teachPlan.degreeName"></line-text>
		<line-text ltext="毕业论文申请最低学分" :rtext="teachPlan.applyPaperMinResult"></line-text>
		<line-text ltext="结业申请最低学分" :rtext="teachPlan.theGraduationScore"></line-text>
		<line-text ltext="毕业最低学分" :rtext="teachPlan.minResult"></line-text>
		<line-text ltext="选修课修读门数" :rtext="teachPlan.optionalCourseNum"></line-text>
		<line-text ltext="修读说明" :rtext="teachPlan.learningDescript"></line-text>
		<line-text ltext="修改日期" :rtext="teachPlan.fillinDate"></line-text>
		<line-text ltext="备注" :rtext="teachPlan.memo"></line-text>
		<uni-collapse accordion="true">
			<uni-collapse-item title="教学计划课程信息" style="font-weight: bold;text-align: center;">
				<view class="input-row" style="color:#3F536E;line-height: 20px;font-size: 15px;background-color:#B2B2B2;">
					<text style="width: 5%;">学期</text>
					<text style="width: 48%;">课程名称</text>
					<text style="width: 8%;">学分</text>
					<text style="width: 8%;">学时</text>
					<text style="width: 10%;">面授学时</text>
					<text style="width: 20%;">课程<br>类别</text>
				</view>
				<view class="input-row border" style="color: grey;line-height: 20px;margin-top: 10px;font-size: small;" v-for="(n, i) in planCourse" v-bind:key="i">
					<text style="width: 5%;">{{planCourse[i].term}}</text>
					<text style="width: 48%;">{{planCourse[i].courseName}}</text>
					<text style="width: 8%;">{{planCourse[i].creditHour}}</text>
					<text style="width: 8%;">{{planCourse[i].stydyHour}}</text>
					<text style="width: 10%;">{{planCourse[i].faceStudyHour}}</text>
					<text style="width: 20%;">{{planCourse[i].courseNature | getDictName('courseNature')}}</text>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template> 


<script>
	import lineText from '@/components/line-text.vue'
	export default {
		components:{
			lineText
		},
		data() {
			return {
				teachPlan:uni.getStorageSync("teachPlan"),
				planCourse:uni.getStorageSync("planCourse")
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			this.teachPlan = uni.getStorageSync("teachPlan");
			this.planCourse = uni.getStorageSync("planCourse");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("teachPlan")){
				await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			}
			this.teachPlan = uni.getStorageSync("teachPlan");
			this.planCourse = uni.getStorageSync("planCourse");
		}
		
	}
</script>

<style lang="scss">
</style>
