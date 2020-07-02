<template>
	<view class="content" style="margin-bottom: 50px;">
		<view class="input-row" style="color:#3F536E;line-height: 20px;font-size: 15px;background-color:#B2B2B2;">
			<text style="width: 50%;">课程名称</text>
			<text style="width: 15%;">学分</text>
			<text style="width: 15%;">正考</text>
			<text style="width: 15%;">补考</text>
		</view>
		<view class="input-row border" style="color: grey;line-height: 20px;margin-top: 10px;font-size: small;" v-for="(n, i) in examResult" v-bind:key="i">
			<text style="width: 50%;">{{examResult[i].courseName}}</text>
			<text style="width: 15%;">{{examResult[i].creditHour}}</text>
			<text style="width: 15%;">{{examResult[i].normalScore}}</text>
			<text style="width: 15%;">{{examResult[i].makeupScore}}</text>
		</view>
	</view>
</template> 


<script>
	import lineText from '../../../components/line-text.vue'
	export default {
		components:{
			lineText
		},
		data() {
			return {
				examResult:uni.getStorageSync("examResult")
			}
		},
		onPullDownRefresh() {
			this.loadJs.reloadExamResult(this.$store.baseInfoId);
			this.examResult = uni.getStorageSync("examResult");
			uni.stopPullDownRefresh();
		},
		async onReady() {
			if(!uni.getStorageSync("examResult")){
				await this.loadJs.reloadExamResult(this.$store.baseInfoId);
			}
			this.examResult = uni.getStorageSync("examResult");
		}
		
	}
</script>

<style lang="scss">
</style>
