<template>
	<view class="content" style="margin-bottom: 50px;">
		<view class="input-row" style="color:#3F536E;line-height: 20px;font-size: 16px;background-color:#B2B2B2;">
			<text style="width: 50%;">课程名称</text>
			<text style="width: 15%;">学分</text>
			<text style="width: 15%;">正考</text>
			<text style="width: 15%;">补考</text>
		</view>
		<view v-for="(pc, i) in planCourse" :key="i">
			<view v-if="!(i>0 && pc.term==planCourse[i-1].term)" style="margin-top: 5px;padding-top: 5px;background-color:#CCCCCC;font-size: 15px;padding-left: 10px;color:#366092;">
				{{pc.term | getDictName('CodeTermType')}}
			</view>
			<view class="input-row" style="color: grey;line-height: 20px;margin-top: 10px;font-size: small;">
				<text style="width: 50%;">{{pc.courseName}}</text>
				<text style="width: 15%;">{{pc.creditHour}}</text>
				<template v-for="(er,j) in examResult" v-if="er.courseid==pc.courseid" >
					<text style="width: 15%;">{{er.normalScore}}</text>
					<text style="width: 15%;">{{er.makeupScore}}</text>
				</template>
			</view>
		</view>
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
				examResult:uni.getStorageSync("examResult"),
				planCourse:uni.getStorageSync("planCourse")
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadExamResult(this.$store.baseInfoId);
			this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			this.examResult = uni.getStorageSync("examResult");
			this.planCourse = uni.getStorageSync("planCourse");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("examResult")){
				await this.loadJs.reloadExamResult(this.$store.baseInfoId);
			}
			if(!uni.getStorageSync("planCourse")){
				await this.loadJs.reloadTeachPlan(this.$store.baseInfoId);
			}
			this.planCourse = uni.getStorageSync("planCourse");
			this.examResult = uni.getStorageSync("examResult");
		}
	}
</script>

